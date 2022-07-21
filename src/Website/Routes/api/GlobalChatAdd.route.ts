import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatAddType} from '../../../Types/Api/GlobalChat.type'
import TokenHandler from '../../../Database/Handlers/Token.handler'

export default class extends RouteType {

    constructor() {
        super()

        this.route = 'api/globalchat/add'

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

                if (!await new TokenHandler().getByToken(data.token))
                    return {

                        error: {

                            code: 401,
                            message: 'Invalid token'

                        }

                    }


                return {

                    success: {

                        message: 'Guild is now waiting for verification'

                    }

                }

            }

        })

    }

}