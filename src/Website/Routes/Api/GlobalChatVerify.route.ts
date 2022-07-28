import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatVerifyPostType} from '../../../Types/Api/GlobalChat.type'
import GlobalChatAddHandler from '../../../Database/Handlers/GlobalChatAdd.handler'
import GlobalChatVerifyHandler from '../../../Database/Handlers/GlobalChatVerify.handler'
import LogsUtil from '../../../Utils/Logs.util'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/verify'

        this.methods.push({

            method: 'post',
            async run(req): Promise<RouteOutput> {

                const data: GlobalChatVerifyPostType = req.body

                if (!data.token || !data.channelId || !data.moderatorId)
                    return {
                        error: {
                            code: 400,
                            message: 'Missing parameters'
                        }
                    }

                if (!Number(data.channelId) || data.channelId.length != 18 || !Number(data.moderatorId) || data.moderatorId.length != 18)
                    return {
                        error: {
                            code: 400,
                            message: 'Invalid data provided'
                        }
                    }

                if (process.env.GLOBALCHAT_TOKEN != data.token)
                    return {
                        error: {
                            code: 401,
                            message: 'Invaild token'
                        }
                    }

                if (!await new GlobalChatAddHandler().get(data.channelId))
                    return {
                        error: {
                            code: 404,
                            message: 'Guild is not waiting for verification'
                        }
                    }

                await new GlobalChatVerifyHandler().insert({
                    token: data.token,
                    moderatorId: data.moderatorId,
                    channelId: data.channelId
                })

                await new GlobalChatAddHandler().delete(data.channelId)

                await new LogsUtil().sendDiscord('verification', {
                    embeds: [{
                        title: '🌐 | Czat globalny został zweryfikowany',
                        description: `ID kanału: \`${data.channelId}\`\nModerator: <@${data.moderatorId}>(\`${data.moderatorId}\`)`,
                        color: '#00ff00'
                    }]
                })

                await new LogsUtil().sendDiscord('public', {
                    embeds: [{
                        title: '🌐 | Czat globalny został zweryfikowany',
                        description: `ID kanału: \`${data.channelId}\`\nModerator: <@${data.moderatorId}>(\`${data.moderatorId}\`)`,
                        color: '#00ff00'
                    }]
                })

                return {
                    success: {
                        message: 'Guild is now verified'
                    }

                }

            }

        })

    }

}