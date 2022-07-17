import models from '../index.database'
import DateUtil from '../../utilities/date.util'
import {GlobalChatApiAdd, GlobalChatApiVerify} from '../../types/api/globalchat.type'

export default class GlobalchatHandler {

    public async insertAdd(data: Omit<GlobalChatApiAdd, 'addDate'>): Promise<boolean> {
        if (await this.hasAdd(data.guildId) || await this.hasVerify(data.guildId))
            return false

        await models.get('globalchatAdd')?.insertMany([{
            ...data,
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

    public async getVerify(guildId: string): Promise<GlobalChatApiVerify> {
        return await models.get('globalchatVerify')?.findOne({guildId}) as GlobalChatApiVerify
    }


    public async deleteAdd(guildId: string): Promise<boolean> {
        if (!await this.hasAdd(guildId))
            return false

        await models.get('globalchatAdd')?.deleteOne({guildId})
        return true
    }

    public async deleteVerify(guildId: string): Promise<boolean> {
        if (!await this.getVerify(guildId))
            return false

        await models.get('globalchatVerify')?.deleteOne({guildId})
        return true
    }

    public async detete(guildId: string): Promise<boolean> {
        return await this.deleteAdd(guildId) || await this.deleteVerify(guildId) || false
    }

    public async verify(guildId: string, moderatorId: string): Promise<boolean> {
        if (!await this.hasAdd(guildId))
            return false

        const getAdd = await this.getAdd(guildId)

        await models.get('globalchatVerify')?.insertMany([{
            token: getAdd.token,
            guildId,
            channelId: getAdd.channelId,
            inviteUrl: getAdd.inviteUrl,
            webhookUrl: getAdd.webhookUrl,
            moderatorId,
            addDate: getAdd.addDate,
            verifiedDate: new DateUtil().formatDate(new Date())
        }])
        await this.deleteAdd(guildId)

        return true
    }

    public async getAllWebhook(): Promise<string[]> {
        const getAll = await models.get('globalchatVerify')?.find()
        return getAll?.map(({webhookUrl}) => webhookUrl) as string[]
    }

}