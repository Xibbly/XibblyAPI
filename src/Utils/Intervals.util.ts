import GlobalChatUserHandler from '../Database/Handlers/GlobalChatUser.handler'
import DateUtil from "./Date.util";
import LogsUtil from "./Logs.util";

export default class IntervalsUtil {

    constructor() {
        this.unmute()
    }

    private async unmute(): Promise<void> {

        setInterval(async () => {

            const mutes = await new GlobalChatUserHandler().getMutes()
            for (const mute of mutes) {
                if (!mute.expiriedAt)
                    continue

                if (new DateUtil().dateToUnix(new Date()) >= mute.expiriedAt) {
                    await new GlobalChatUserHandler().unmute(mute.userId)
                    const userData = await new GlobalChatUserHandler().get(mute.userId)

                    await new LogsUtil().sendDiscord('public', {
                        embeds: [{
                            title: '👮‍♂️ | Czat globalny | Usunięcie wyciszenia',
                            description: `ID użytkownika: \`${mute.userId}\`(\`${userData.customId}\`)\nModerator: \`AUTOMAT\``,
                            color: '#00ff00'
                        }]
                    })

                }
            }

        }, 60 * 1000)

    }

}