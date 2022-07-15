import models from '../index.database'
import DateUtil from '../../utils/date.util'
import {GlobalChatApiAdd} from '../../types/api/globalchat.type'

export default class GlobalchatHandler {

    public async insertAdd(token: string, guildId: string, inviteUrl: string, webhookUrl: string): Promise<boolean> {
        console.log(await this.hasAdd(guildId))
        console.log(await this.hasVerify(guildId))

        if (await this.hasAdd(guildId) || await this.hasVerify(guildId))
            return false

        await models.get('globalchatAdd')?.insertMany([{
            token, guildId, inviteUrl, webhookUrl,
            addDate: new DateUtil().formatDate(new Date())
        }])
        return true
    }

    public async hasAdd(guildId: string): Promise<boolean> {
        return !!(await models.get('globalchatAdd')?.findOne({guildId}))

    }

    public async hasVerify(guildId: string): Promise<boolean> {
        return !!(await models.get('globalchatVerify')?.findOne({guildId}))

    }

    public async getAdd(guildId: string): Promise<GlobalChatApiAdd> {
        return await models.get('globalchatAdd')?.findOne({guildId}) as GlobalChatApiAdd
    }

    public async deleteAdd(guildId: string): Promise<boolean> {
        if (!await this.hasAdd(guildId))
            return false

        await models.get('globalchatAdd')?.deleteOne({guildId})
        return true
    }

    public async verify(guildId: string, moderatorId: string): Promise<boolean> {
        if (!await this.hasAdd(guildId))
            return false

        const getAdd = await this.getAdd(guildId)
        await models.get('globalchatVerify')?.insertMany([{
            token: getAdd.token,
            guildId,
            inviteUrl: getAdd.inviteUrl,
            webhookUrl: getAdd.webhookUrl,
            moderatorId,
            verifiedDate: new DateUtil().formatDate(new Date())
        }])
        await this.deleteAdd(guildId)

        return true
    }

}