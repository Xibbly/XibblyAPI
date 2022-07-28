import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatUnmuteType} from '../../../Types/Api/GlobalChat.type'
import LogsUtil from '../../../Utils/Logs.util'
import GlobalChatUserHandler from '../../../Database/Handlers/GlobalChatUser.handler'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/unmute'

        this.methods.push({

                method: 'post',
                async run(req): Promise<RouteOutput> {

                    const data: GlobalChatUnmuteType = req.body

                    if (!data.token || !data.userId || !data.moderatorId)
                        return {
                            error: {
                                code: 400,
                                message: 'Missing parameters'
                            }
                        }

                    if (!Number(data.userId) || data.userId.length != 18 || !Number(data.moderatorId) || data.moderatorId.length != 18)
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

                    if (!await new GlobalChatUserHandler().getMute(data.userId))
                        return {
                            error: {
                                code: 400,
                                message: 'User is not muted'
                            }
                        }

                    await new GlobalChatUserHandler().unmute(data.userId)
                    const userData = await new GlobalChatUserHandler().get(data.userId)

                    await new LogsUtil().sendDiscord('public', {
                        embeds: [{
                            title: '👮‍♂️ | Czat globalny | Usunięcie wyciszenia',
                            description: `ID użytkownika: \`${data.userId}\`(\`${userData.customId}\`)\nModerator: <@${data.moderatorId}>(\`${data.moderatorId}\`)`,
                            color: '#00ff00'
                        }]
                    })

                    return {
                        success: {
                            message: 'User is successfully unmuted'
                        }

                    }

                }

            }
        )

    }

}