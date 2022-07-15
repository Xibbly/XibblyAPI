import models from '../index.database'
import DateUtil from '../../utils/date.util'
import {GlobalChatApiAdd} from '../../types/api/globalchat.type'

export default class GlobalchatHandler {

    public async insertAdd(token: string, guildID: string, inviteUrl: string, webhookUrl: string): Promise<boolean> {
        if (await this.hasAdd(guildID))
            return false

        await models.get('globalchatAdd')?.insertMany([{
            token, guildID, inviteUrl, webhookUrl,
            addDate: new DateUtil().formatDate(new Date())
        }])
        return true
    }

    public async hasAdd(guildID: string): Promise<boolean> {
        return !!(await models.get('globalchatAdd')?.findOne({guildID}))

    }

    public async getAdd(guildID: string): Promise<GlobalChatApiAdd> {
        return await models.get('globalchatAdd')?.findOne({guildID}) as GlobalChatApiAdd
    }

    public async deleteAdd(guildID: string): Promise<boolean> {
        if (!await this.hasAdd(guildID))
            return false

        await models.get('globalchatAdd')?.deleteOne({guildID})
        return true
    }

    public async verify(guildID: string, moderatorId: string): Promise<boolean> {
        if (!await this.hasAdd(guildID))
            return false

        const getAdd = await this.getAdd(guildID)
        await models.get('globalchatVerify')?.insertMany([{
            token: getAdd.token,
            guildID,
            inviteUrl: getAdd.inviteUrl,
            webhookUrl: getAdd.webhookUrl,
            moderatorId,
            verifiedDate: new DateUtil().formatDate(new Date())
        }])
        await this.deleteAdd(guildID)

        return true
    }

}