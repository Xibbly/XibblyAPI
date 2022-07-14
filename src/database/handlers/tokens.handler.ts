import models from '../index.database'
import TokenModelType from '../../types/models/token.modelType'
import DateUtil from '../../utils/date.util'

export default class TokensHandler {

    private generateToken(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    public async getAll(userId: number): Promise<TokenModelType[]> {
        const tokens = await models.get('tokens')?.find({
            userId
        })

        if (!tokens)
            return []

        return tokens
    }

    public async getToken(token: string): Promise<TokenModelType> {
        const tokenModel = await models.get('tokens')?.findOne({
            token
        })

        if (!tokenModel)
            return [][0]

        return tokenModel
    }

    public async createNew(userId: number): Promise<TokenModelType> {
        const token = await models.get('tokens')?.insertMany([{
            userId,
            token: this.generateToken(),
            permissions: [],
            createdAt: new DateUtil().formatDate(new Date()),
            modifiedAt: new DateUtil().formatDate(new Date())
        }])
        if (!token)
            return [][0]

        return token[0]
    }

    public async regenerate(token: string): Promise<TokenModelType> {
        const tokenModel = await models.get('tokens')?.findOne({
            token
        })

        if (!tokenModel)
            return [][0]

        const oldToken = tokenModel.token
        tokenModel.token = this.generateToken()
        tokenModel.modifiedAt = new DateUtil().formatDate(new Date())

        const updated = await models.get('tokens')?.updateOne({
            token: oldToken
        }, tokenModel)

        if (!updated)
            return [][0]

        return tokenModel
    }

    public async delete(token: string): Promise<boolean> {
        const deleted = await models.get('tokens')?.deleteOne({
            token
        })

        if (!deleted)
            return false
        return true
    }

}
