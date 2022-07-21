import {GlobalChatAddType} from '../../Types/Api/GlobalChat.type'
import models from '../Index.database'

export default class GlobalChatAddHandler {

    public async insert(data: Omit<GlobalChatAddType, 'addedAt'>): Promise<void> {

        await models.get('globalchatadds')?.create({

            token: data.token,
            webhookUrl: data.webhookUrl,
            channelId: data.channelId,
            inviteUrl: data.inviteUrl,
            addedAt: new Date()

        })

    }

    public async get(channelId: string): Promise<GlobalChatAddType> {

        return await models.get('globalchatadds')?.findOne({channelId}) as GlobalChatAddType

    }

}