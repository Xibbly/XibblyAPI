import RouteType from '../../../types/website.type'
import GlobalChatApiType from '../../../types/api/globalchat.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import PostUtil from '../../../utils/post.util'

export default {

    route: 'globalchat/send',
    mustDiscordConnected: true,


    async post({req, res}) {

        const data: GlobalChatApiType = req.body

        if (!data.token || !data.userId || !data.tag || !data.avatarUrl || !data.guildId || !(data.content || (data.filesUrl && data.filesUrl[0])))
            return res.status(400).send('Missing data')

        // if (!await new TokensHandler().getToken(data.token))
        //     return res.status(401).send('Unauthorized')

        if (data.userId.length != 18 || !data.tag.includes('#') || data.avatarUrl.startsWith('https://cdn.discordapp.com/') || data.guildId.length != 18 || data.content.length > 2000 || (data.filesUrl && data.filesUrl.length > 10))
            return res.status(400).send('Invalid data provided')

        // @todo webhook database
        const webhooks = ['https://discord.com/api/webhooks/992423581436874792/mUUzP8YJYSxaP8zXWJXSZZp3z2gR02FdWIxk3HY7_MsU_iX40NIp32cBCRCb0eMhpD_p']
        const numberOfChannels = webhooks.length

        let sendedTo = 0

        for (const webhook of webhooks) {
            const response = await new PostUtil().toDiscordWebhook(webhook, {
                username: `${data.tag} | ${data.userId}`,
                avatarUrl: data.avatarUrl,
                content: data.content,
                filesUrl: data.filesUrl
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