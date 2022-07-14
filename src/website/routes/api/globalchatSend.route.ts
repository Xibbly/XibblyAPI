import RouteType from '../../../types/website.type'
import GlobalChatApiType from '../../../types/api/globalchat.apiType'
import axios from 'axios'
import TokensHandler from '../../../database/handlers/tokens.handler'

export default {

    route: 'globalchat/send',


    async post({req, res}) {

        const data: GlobalChatApiType = req.body

        if (!data.token || !data.userId || !data.tag || !data.avatarUrl || !data.guildId || !(data.content || (data.filesUrl && data.filesUrl[0])))
            return res.status(400).send('Missing parameters(token, userId, tag, avatarUrl, guildId)')

        if (!await new TokensHandler().getToken(data.token))
            return res.status(401).send('Unauthorized')

        // @todo webhook database
        const webhooks = ['https://discord.com/api/webhooks/992423581436874792/mUUzP8YJYSxaP8zXWJXSZZp3z2gR02FdWIxk3HY7_MsU_iX40NIp32cBCRCb0eMhpD_p']
        const numberOfChannels = webhooks.length

        let sendedTo = 0

        for (const webhook of webhooks) {
            const response = await axios.post(process.env.WEBHOOK_API_URL!, {
                token: process.env.WEBHOOK_API_TOKEN,
                webhookUrl: webhook,
                webhookData: {
                    username: `${data.tag} | ${data.userId}`,
                    avatarUrl: data.avatarUrl,
                    content: data.content,
                    filesUrl: data.filesUrl
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
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