import RouteType from '../../../types/website.type'
import GlobalChatApiType from '../../../types/api/globalchat.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import GlobalchatHandler from '../../../database/handlers/globalchat.handler'
import SendDiscordWebhookUtil from '../../../utils/sendDiscordWebhook.util'
import GlobalchatUserHandler from '../../../database/handlers/globalchatUser.handler'
import StringUtil from '../../../utils/string.util'
import GlobalchatUserUtil from '../../../utils/globalchatUser.util'

export default {

    route: 'globalchat/send',
    mustDiscordConnected: true,

    async post({req, res}) {

        const data: GlobalChatApiType = req.body
        if (!data.token || !data.userId || !data.tag || !data.avatar_url || !data.guildId || !data.channelId || (!data.content && !(data.files && data.files[0])))
            return res.status(400).send({error: 'Missing parameters'})

        if (!Number(data.guildId) || !Number(data.userId) || data.userId.length != 18 || !data.tag.includes('#') || !data.avatar_url.startsWith('https://cdn.discordapp.com/') || !Number(data.guildId) || data.guildId.length != 18 || !Number(data.channelId) || data.channelId.length != 18 || (data.content && data.content != '' && data.content.length > 2000) || (data.files && data.files[11]))
            return res.status(400).send({error: 'Invalid data provided'})

        if (!await new TokensHandler().hasToken(data.token))
            return res.status(401).send({error: 'Invalid token'})

        if (await new GlobalchatUserHandler().hasMute(data.userId))
            return res.status(403).send({error: 'User is muted'})

        if (!await new GlobalchatHandler().hasVerify(data.guildId))
            return res.status(403).send({error: 'Guild is not verified'})

        if (data.content == '')
            delete data.content
        else if (data.content)
            data.content = new StringUtil().replaceMessageGC(data.content)

        const webhooks: string[] = await new GlobalchatHandler().getAllWebhook()
        const numberOfChannels = webhooks.length

        let sendedTo = 0

        for (const webhook of webhooks) {

            const webhookData = (await new SendDiscordWebhookUtil().check(webhook)).data

            if (webhookData && webhookData.id && webhookData.guild_id != data.guildId) {

                const response = await new SendDiscordWebhookUtil().sendToGlobalChat(webhook, {
                    username: await new GlobalchatUserUtil().generateUsername(data.tag, data.userId),
                    avatar_url: data.avatar_url,
                    content: data.content,
                    files: data.files
                })

                if (response.status == 200)
                    sendedTo++

            }

        }

        return res.send({
            numberOfChannels,
            sendedTo,
            support: process.env.SUPPORT_INVITE,
            poweredBy: process.env.POWERED_BY
        })

    }

} as RouteType