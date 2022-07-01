import RouteType from '../../../types/website.type'
import GlobalChatApiType from '../../../types/api/globalchat.apiType'
import axios from "axios";

export default {

    route: 'globalchat',


    post({req, res}) {

        if (!req.body.token || !req.body.userId || !req.body.tag || !req.body.avatarUrl || !req.body.guildId || !req.body.content)
            return res.status(400).send('Missing parameters(token, userId, tag, avatarUrl, guildId)')

        const webhooks = ['https://discord.com/api/webhooks/992423581436874792/mUUzP8YJYSxaP8zXWJXSZZp3z2gR02FdWIxk3HY7_MsU_iX40NIp32cBCRCb0eMhpD_p']

        let numberOfChannels = 0
        webhooks.forEach(async (webhook: string) => {
            const response = await axios.post(process.env.WEBHOOK_API_URL!, {
                'token': process.env.WEBHOOK_API_TOKEN,
                'webhookUrl': webhook,
                'webhookData': {
                    'username': `${req.body.tag} | ${req.body.userId}`,
                    'avatar_url': req.body.avatarUrl,
                    'content': req.body.content,
                    'tts': false
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            console.log(response.data)
            if (response.data.status === 200)
                numberOfChannels++
        })

        return res.send({
            numberOfChannels,
            support: process.env.SUPPORT_INVITE,
            poweredBy: process.env.POWERED_BY
        })

    }

} as RouteType