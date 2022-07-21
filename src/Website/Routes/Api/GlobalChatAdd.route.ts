import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatAddType} from '../../../Types/Api/GlobalChat.type'
import TokenHandler from '../../../Database/Handlers/Token.handler'
import GlobalChatAddHandler from '../../../Database/Handlers/GlobalChatAdd.handler'
import LogsUtil from '../../../Utils/Logs.util'
import GlobalChatVerifyHandler from '../../../Database/Handlers/GlobalChatVerify.handler'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/add'

        this.methods.push({

            method: 'post',
            async run(req): Promise<RouteOutput> {

                const data: Omit<GlobalChatAddType, 'addDate'> = req.body

                if (!data.token || !data.webhookUrl || !data.channelId || !data.inviteUrl)
                    return {

                        error: {

                            code: 400,
                            message: 'Missing parameters'

                        }

                    }

                if (!data.webhookUrl.startsWith('https://discord.com/api/webhooks/') || !Number(data.channelId) || data.channelId.length != 18 || !(data.inviteUrl.startsWith('https://discord.gg/') || data.inviteUrl.startsWith('discord.gg/')))
                    return {

                        error: {

                            code: 400,
                            message: 'Invalid data provided'

                        }

                    }

                if (!await new TokenHandler().getFromDbByToken(data.token))
                    return {

                        error: {

                            code: 401,
                            message: 'Invaild token'

                        }

                    }

                if (await new GlobalChatAddHandler().get(data.channelId))
                    return {

                        error: {

                            code: 400,
                            message: 'Guild is already waiting for verification'

                        }

                    }

                if (await new GlobalChatVerifyHandler().get(data.channelId))
                    return {

                        error: {

                            code: 400,
                            message: 'Guild is already verified'

                        }

                    }


                await new GlobalChatAddHandler().insert(data)

                await new LogsUtil().sendDiscord('verification', {
                    content: data.channelId,
                    embeds: [{
                        title: '🌐 | Czat globalny do weryfikacji',
                        description: `ID kanału: ${data.channelId}\nInvite: ${data.inviteUrl.startsWith('https://') ? data.inviteUrl : `https://${data.inviteUrl}`}`,
                        color: '#0000ff'
                    }]
                })

                return {

                    success: {

                        message: 'Guild is now waiting for verification'

                    }

                }

            }

        })

    }

}