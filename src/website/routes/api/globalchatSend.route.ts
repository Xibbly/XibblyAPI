import RouteType from '../../../types/website.type'
import GlobalChatApiType from '../../../types/api/globalchat.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import GlobalchatHandler from '../../../database/handlers/globalchat.handler'
import SendDiscordWebhookUtil from '../../../utils/sendDiscordWebhook.util'
import GlobalchatUser from '../../../utils/globalchatUser.util'
import GlobalchatUserHandler from '../../../database/handlers/globalchatUser.handler'

export default {

    route: 'globalchat/send',
    mustDiscordConnected: true,


    async post({req, res}) {

        const data: GlobalChatApiType = req.body
        if (!data.token || !data.userId || !data.tag || !data.avatar_url || !data.guildId || (!data.content && !(data.files && data.files[0])))
            return res.status(400).send({error: 'Missing parameters'})

        if (!Number(data.guildId) || !Number(data.userId) || data.userId.length != 18 || !data.tag.includes('#') || !data.avatar_url.startsWith('https://cdn.discordapp.com/') || data.guildId.length != 18 || data.content.length > 2000 || (data.files && data.files.length > 10))
            return res.status(400).send({error: 'Invalid data provided'})

        if (!await new TokensHandler().hasToken(data.token))
            return res.status(401).send({error: 'Invalid token'})

        if (await new GlobalchatUserHandler().hasMute(data.userId))
            return res.status(403).send({error: 'User is muted'})

        const webhooks: string[] = await new GlobalchatHandler().getAllWebhook()
        const numberOfChannels = webhooks.length

        let sendedTo = 0

        for (const webhook of webhooks) {
            const response = await new SendDiscordWebhookUtil().sendToGlobalChat(webhook, {
                username: await new GlobalchatUser().generateUsername(data.tag, data.userId),
                avatar_url: data.avatar_url,
                content: data.content,
                files: data.files
            })

            if (response.status == 200)
                sendedTo++
        }

        return res.send({
            numberOfChannels,
            sendedTo,
            support: process.env.SUPPORT_INVITE,
            poweredBy: process.env.POWERED_BY
        })

    }

} as RouteType