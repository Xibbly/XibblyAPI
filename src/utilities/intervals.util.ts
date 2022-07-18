import DateUtil from './date.util'
import GlobalchatUserHandler from '../database/handlers/globalchatUser.handler'

export default class IntervalsUtil {
    constructor() {
        this.run(60)
    }

    async run(secounds: number): Promise<void> {
        setInterval(async () => {
            const dateunix = new DateUtil().getDateUnix(new Date())
            const mutes = await new GlobalchatUserHandler().getAllMutes()

            for (const mute of mutes) {
                if (!mute.permament && mute.expiriedAt && mute.expiriedAt <= dateunix) {
                    await new GlobalchatUserHandler().unmute(mute.userId)
                    //@todo discord logs
                }
            }
        }, secounds * 1000)
    }
}