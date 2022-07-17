import {EncryptJWT, jwtDecrypt} from 'jose'
import TokenModelType from '../../types/models/token.type'
import models from '../index.database'
import DateUtil from '../../utilities/date.util'

export default class TokensHandler {

    private key: Uint8Array = new Uint8Array(Buffer.from(process.env.JWT_KEY as any)).slice(0, 32)

    private async createToken(userId: number, data: Omit<TokenModelType, 'token'>): Promise<string> {
        return await new EncryptJWT({
            data
        }).setProtectedHeader({alg: 'A256GCMKW', enc: 'A256CBC-HS512'})
            .setIssuedAt()
            .setIssuer('xibbly.tk')
            .setAudience(`${userId}`)
            .encrypt(this.key)
    }

    private async decryptToken(token: string): Promise<Omit<TokenModelType, 'token'>> {
        return (await jwtDecrypt(token, this.key, {
            issuer: 'xibbly.tk'
        })).payload.data as Omit<TokenModelType, 'token'>
    }

    public async insert(userId: number, token: string): Promise<string> {
        const x = await models.get('tokens')?.insertMany([{
            userId,
            token
        }])
        return token
    }

    public async createNew(userId: number): Promise<TokenModelType> {
        let data: Omit<TokenModelType, 'token'> = {
            userId,
            createdAt: new DateUtil().formatDate(new Date()),
            modifiedAt: new DateUtil().formatDate(new Date())
        }

        const token = await this.createToken(userId, data)
        await this.insert(userId, token)

        return await this.getToken(token)
    }

    public async regenerate(token: string): Promise<string> {
        const decryptedToken = await this.decryptToken(token)
        const newToken = await this.createToken(decryptedToken.userId as number, {
            userId: decryptedToken.userId as number,
            createdAt: decryptedToken.createdAt as string,
            modifiedAt: new DateUtil().formatDate(new Date())
        })
        await models.get('tokens')?.updateOne({token}, {token: newToken})
        return newToken
    }

    public async hasToken(token: string): Promise<boolean> {
        return !!(await models.get('tokens')?.findOne({token}))
    }

    public async delete(token: string): Promise<void> {
        await models.get('tokens')?.deleteOne({token})
    }

    public async getAllForUser(userId: number): Promise<TokenModelType[]> {
        const tokens = await models.get('tokens')?.find({userId})

        if (!tokens)
            return []

        const decryptedTokens: TokenModelType[] = []

        for (const token of tokens) {
            decryptedTokens.push(await this.getToken(token.token))
        }

        return decryptedTokens
    }

    public async getToken(token: string): Promise<TokenModelType> {
        if (!await this.hasToken(token))
            return false as any as TokenModelType

        const decryptedToken = await this.decryptToken(token)

        return {
            userId: decryptedToken.userId as number,
            token,
            createdAt: decryptedToken.createdAt as string,
            modifiedAt: decryptedToken.modifiedAt as string
        }
    }

}