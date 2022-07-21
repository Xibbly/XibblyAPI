import {EncryptJWT, jwtDecrypt} from 'jose'
import TokenType, {TokenModelType} from '../../Types/Database/Token.type'
import models from '../Index.database'

export default class TokenHandler {

    private key: Uint8Array = new Uint8Array(Buffer.from(process.env.JWT_KEY as any)).slice(0, 32)

    private async generate(data: Omit<TokenType, 'token'>): Promise<string> {

        return await new EncryptJWT({
            data
        }).setProtectedHeader({alg: 'A256GCMKW', enc: 'A256CBC-HS512'})
            .setIssuedAt()
            .setIssuer('xibbly.tk')
            .setAudience(data.userId)
            .encrypt(this.key)

    }

    private async decrypt(token: string): Promise<Omit<TokenType, 'token'>> {

        return (await jwtDecrypt(token, this.key, {
            issuer: 'xibbly.tk'
        })).payload.data as Omit<TokenType, 'token'>

    }

    public async insert(userId: TokenType['userId']): Promise<string> {

        const token = await this.generate({
            userId,
            createdAt: new Date(),
            modifiedAt: new Date()
        })

        await models.get('tokens')?.create({

            userId: userId,
            token

        })

        return token

    }

    public async getByToken(token: string): Promise<TokenType> {

        const decrypted = await this.decrypt(token)
        return {

            ...decrypted, token

        }

    }

    public async getFromDbByToken(token: string): Promise<TokenModelType> {

        return await models.get('tokens')?.findOne({token}) as TokenModelType

    }

    public async getByUserId(userId: string): Promise<TokenModelType[]> {

        const tokens = await models.get('tokens')?.find({userId}) as TokenModelType[]

        if (!tokens)
            return []

        const decryptedTokens: TokenModelType[] = []

        for (const token of tokens) {
            decryptedTokens.push({
                token: token.token,
                ...(await this.decrypt(token.token))
            })
        }

        return decryptedTokens

    }

    public async delete(token: string): Promise<void> {

        await models.get('tokens')?.deleteOne({token})

    }

    public async regenerate(token: string): Promise<void> {

        const decrypted = await this.decrypt(token)

        await models.get('tokens')?.updateOne({token}, {
            token: await this.generate({
                userId: decrypted.userId,
                createdAt: decrypted.createdAt,
                modifiedAt: new Date()
            })
        })

    }

}