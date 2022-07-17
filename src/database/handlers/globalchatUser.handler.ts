import models from '../index.database'
import GlobalchatUserType, {GlobalchatUserMuteType} from '../../types/api/globalchatUser.type'
import DateUtil from '../../utilities/date.util'

export default class GlobalchatUserHandler {

    public async getNewGCid(): Promise<string> {
        return `${(await models.get('globalchatUser')?.count() as number || 0) + 1}`
    }

    public async insertUser(userId: string, gcid: string): Promise<void> {
        await models.get('globalchatUser')?.insertMany([{
            userId,
            gcid
        }])
    }

    public async mute(userId: string, moderatorId: string, reason: string, expiriedAt?: number): Promise<boolean> {
        if (await this.hasMute(userId) || !await this.hasUser(userId))
            return false

        if (expiriedAt)
            await models.get('globalchatMute')?.insertMany([{
                userId,
                moderatorId,
                reason,
                mutedAt: new DateUtil().getDateUnix(new Date()),
                expiriedAt,
                permament: false
            }])
        else
            await models.get('globalchatMute')?.insertMany([{
                userId,
                moderatorId,
                mutedAt: new DateUtil().getDateUnix(new Date()),
                reason
            }])
        return true
    }

    public async hasUser(userId: string): Promise<boolean> {
        return !!(await models.get('globalchatUser')?.findOne({userId}))
    }

    public async hasMute(userId: string): Promise<boolean> {
        return !!(await models.get('globalchatMute')?.findOne({userId}))
    }

    public async getUser(userId: string): Promise<GlobalchatUserType> {
        return (await models.get('globalchatUser')?.findOne({userId}) as GlobalchatUserType)
    }

    public async getMute(userId: string): Promise<GlobalchatUserMuteType> {
        return (await models.get('globalchatMute')?.findOne({userId}) as GlobalchatUserMuteType)
    }

}