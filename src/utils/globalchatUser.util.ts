import GlobalchatUserHandler from '../database/handlers/globalchatUser.handler'
import DateUtil from './date.util'

export default class {

    public async generateUsername(tag: string, userId: string): Promise<string> {
        let username = tag
        if (!await new GlobalchatUserHandler().hasUser(userId)) {
            await new GlobalchatUserHandler().insertUser(userId, await new GlobalchatUserHandler().getNewGCid())
        }

        const user = await new GlobalchatUserHandler().getUser(userId)
        username += ` | #${user.gcid}`

        if ((process.env.DEV_IDS as string).split(',').includes(userId))
            username += ' | DEV'
        else if (user.moderator)
            username += ' | MOD'

        return username
    }

    public async mute(userId: string, moderatorId: string, reason: string, expiriedAt?: string): Promise<boolean> {
        if (!await new GlobalchatUserHandler().hasUser(userId))
            return false

        if (await this.checkPermissions(userId))
            return false

        if (expiriedAt) {
            const fixedDate = new DateUtil().addToDate(expiriedAt)
            if (fixedDate != -1) {
                return await new GlobalchatUserHandler().mute(userId, moderatorId, reason, fixedDate)
            }
        }

        return await new GlobalchatUserHandler().mute(userId, moderatorId, reason)
    }

    public async checkPermissions(userId: string): Promise<boolean> {
        return !!((await new GlobalchatUserHandler().getUser(userId)).moderator || (process.env.DEV_IDS as string).split(',').includes(userId))
    }

}