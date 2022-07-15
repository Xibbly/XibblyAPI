import RouteType from '../../../types/website.type'
import {GlobalChatApiAdd} from '../../../types/api/globalchat.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import GlobalchatHandler from '../../../database/handlers/globalchat.handler'
import SendDiscordWebhookUtil from '../../../utils/sendDiscordWebhook.util'

export default {

    route: 'globalchat/add',
    mustDiscordConnected: true,


    async post({req, res}) {

        const data: Omit<GlobalChatApiAdd, 'addDate'> = req.body

        if (!data.token || !data.guildId || !data.inviteUrl || !data.webhookUrl)
            return res.status(400).send({error: 'Missing parameters'})

        if (!Number(data.guildId) || data.guildId.length != 18 || !(data.inviteUrl.startsWith('https://discord.gg/') || data.inviteUrl.startsWith('discord.gg/')) || !data.webhookUrl.startsWith('https://discord.com/api/webhooks/'))
            return res.status(400).send({error: 'Invalid data provided'})

        if (!await new TokensHandler().hasToken(data.token))
            return res.status(401).send({error: 'Invalid token'})

        if (await new GlobalchatHandler().insertAdd(data.token, data.guildId, data.inviteUrl, data.webhookUrl)) {

            await new SendDiscordWebhookUtil().sendToVerification(data.guildId, data.inviteUrl)

            return res.send({
                guildId: data.guildId,
                inviteUrl: data.inviteUrl,
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })
        } else
            return res.status(400).send({error: 'Guild is already waiting for verification'})

    }

} as RouteType