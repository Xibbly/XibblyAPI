import models from '../Index.database'
import {GlobalChatMuteType, GlobalChatUserType} from '../../Types/Api/GlobalChat.type'

export default class GlobalChatUserHandler {

    private async generateCustomId(): Promise<string> {

        return `${(await models.get('globalchatusers')?.count() || 0) + 1}`

    }

    public async generateUsername(userTag: string, userId: string): Promise<string> {

        let username = `${userTag} | `
        if (!await this.get(userId))
            await this.insert(userId, await this.generateCustomId())

        const userData = await this.get(userId)
        username += userData.customId

        if ((process.env.DEV_IDS as string).split(',').includes(userId))
            username += ` | Dev`
        else if (userData.moderator)
            username += ` | Mod`

        return username

    }

    public async get(userId: string): Promise<GlobalChatUserType> {

        return await models.get('globalchatusers')?.findOne({userId}) as GlobalChatUserType

    }

    public async insert(userId: string, customId: string): Promise<void> {

        await models.get('globalchatusers')?.create({userId, customId})

    }

    public async getMute(userId: string): Promise<GlobalChatMuteType> {

        return await models.get('globalchatmutes')?.findOne({userId}) as GlobalChatMuteType

    }

    public async insertMute(data: GlobalChatMuteType): Promise<void> {

        await models.get('globalchatmutes')?.create(data)

    }

    public async unmute(userId: string): Promise<void> {

        await models.get('globalchatmutes')?.deleteOne({userId})

    }

    public async getMutes(): Promise<GlobalChatMuteType[]> {

        return await models.get('globalchatmutes')?.find() as GlobalChatMuteType[]

    }

}