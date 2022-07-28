import {GlobalChatAddType, GlobalChatVerifyPostType, GlobalChatVerifyType} from '../../Types/Api/GlobalChat.type'
import models from '../Index.database'
import GlobalChatAddHandler from './GlobalChatAdd.handler'

export default class GlobalChatVerifyHandler {

    public async insert(data: GlobalChatVerifyPostType): Promise<void> {

        const add = await new GlobalChatAddHandler().get(data.channelId)

        await models.get('globalchatsverifies')?.create({

            token: data.token,
            moderatorId: data.moderatorId,
            channelId: data.channelId,
            webhookUrl: add.webhookUrl,
            inviteUrl: add.inviteUrl,
            addedAt: add.addedAt,
            verifiedAt: new Date()

        })

    }

    public async get(channelId: string): Promise<GlobalChatAddType> {

        return await models.get('globalchatsverifies')?.findOne({channelId}) as GlobalChatAddType

    }

    public async delete(channelId: string): Promise<void> {

        await models.get('globalchatsverifies')?.deleteOne({channelId})

    }

    public async getAllWebhook(): Promise<string[]> {

        return (await models.get('globalchatsverifies')?.find() || []).map((x: GlobalChatVerifyType) => x.webhookUrl)

    }

}