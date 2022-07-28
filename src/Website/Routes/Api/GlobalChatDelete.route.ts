import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatDeltePostType} from '../../../Types/Api/GlobalChat.type'
import GlobalChatVerifyHandler from '../../../Database/Handlers/GlobalChatVerify.handler'
import LogsUtil from '../../../Utils/Logs.util'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/delete'

        this.methods.push({

            method: 'post',
            async run(req): Promise<RouteOutput> {

                const data: GlobalChatDeltePostType = req.body

                if (!data.token || !data.channelId || !data.moderatorId || !data.reason)
                    return {
                        error: {
                            code: 400,
                            message: 'Missing parameters'
                        }
                    }

                if (!Number(data.channelId) || data.channelId.length != 18 || !Number(data.moderatorId) || data.moderatorId.length != 18 || data.reason.length === 0)
                    return {}

                if (process.env.GLOBALCHAT_TOKEN != data.token)
                    return {
                        error: {
                            code: 401,
                            message: 'Invaild token'
                        }
                    }

                if (!await new GlobalChatVerifyHandler().get(data.channelId))
                    return {
                        error: {
                            code: 404,
                            message: 'Channel not found'
                        }
                    }

                await new GlobalChatVerifyHandler().delete(data.channelId)


                await new LogsUtil().sendDiscord('public', {
                    embeds: [{
                        title: '🌐 | Czat globalny został usunięty',
                        description: `ID kanału: ${data.channelId}\nModerator: <@${data.moderatorId}>(\`${data.moderatorId}\`)\nPowód: \`${data.reason}\``,
                        color: '#ff0000'
                    }]
                })


                return {
                    success: {
                        message: 'Guild is deleted'
                    }
                }

            }

        })

    }

}