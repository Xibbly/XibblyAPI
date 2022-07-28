import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatSendType} from '../../../Types/Api/GlobalChat.type'
import TokenHandler from '../../../Database/Handlers/Token.handler'
import GlobalChatVerifyHandler from '../../../Database/Handlers/GlobalChatVerify.handler'
import GlobalChatUserHandler from '../../../Database/Handlers/GlobalChatUser.handler'
import WebhookUtil from "../../../Utils/Webhook.util";

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/send'

        this.methods.push({

            method: 'post',
            async run(req): Promise<RouteOutput> {

                const data: GlobalChatSendType = req.body

                if (!data.token || !data.userId || !data.channelId || !data.avatar_url || !data.userTag || (!data.content && !data.files))
                    return {
                        error: {
                            code: 400,
                            message: 'Missing parameters'
                        }
                    }

                if (!Number(data.userId) || data.userId.length != 18 || !Number(data.channelId) || data.channelId.length != 18 || !data.avatar_url.startsWith('https://cdn.discordapp.com/') || !data.userTag.includes('#') || (data.content && data.content != '' && data.content.length > 2000) || (data.files && data.files[11]))
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

                if (!await new GlobalChatVerifyHandler().get(data.channelId))
                    return {
                        error: {
                            code: 400,
                            message: 'Guild is not werified',
                        }
                    }

                const user: string = await new GlobalChatUserHandler().generateUsername(data.userTag, data.userId)
                const allWebhooks: string[] = await new GlobalChatVerifyHandler().getAllWebhook()
                let sendedTo = 0
                for (const webhook of allWebhooks) {
                    const check = await new WebhookUtil().check(webhook)
                    if (!check) {
                        console.log(`Webhook ${webhook} is not valid`)
                        continue
                    }

                    const res = await new WebhookUtil().send(webhook, {
                        username: user,
                        avatar_url: data.avatar_url,
                        content: data.content,
                        files: data.files
                    })

                    if (res)
                        sendedTo++
                    else
                        console.log(`Cannot send message to ${webhook}`)
                }

                return {
                    success: {
                        message: 'Message has been sent',
                        sendedTo
                    }
                }

            }

        })

    }

}