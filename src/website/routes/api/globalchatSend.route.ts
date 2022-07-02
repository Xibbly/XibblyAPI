import RouteType from '../../../types/website.type'
import GlobalChatApiType from '../../../types/api/globalchat.apiType'
import axios from "axios";
import TokensHandler from "../../../database/handlers/tokens.handler";

export default {

    route: 'globalchat/send',


    async post({req, res}) {

        const data: GlobalChatApiType = req.body

        if (!data.token || !data.userId || !data.tag || !data.avatarUrl || !data.guildId || !(data.content || (data.filesUrl && data.filesUrl[0])))
            return res.status(400).send('Missing parameters(token, userId, tag, avatarUrl, guildId)')

        if (!await new TokensHandler().getToken(data.token))
            return res.status(401).send('Unauthorized')

        const webhooks = ['https://discord.com/api/webhooks/992423581436874792/mUUzP8YJYSxaP8zXWJXSZZp3z2gR02FdWIxk3HY7_MsU_iX40NIp32cBCRCb0eMhpD_p']
        const numberOfChannels = webhooks.length

        let sendedTo = 0
        const fixedFiles = []

        if (data.filesUrl && data.filesUrl[0])
            for (const file of data.filesUrl) {
                fixedFiles.push({
                    description: file.split('/').pop(),
                    filename: file
                })
            }

        for (const webhook of webhooks) {
            const response = await axios.post(process.env.WEBHOOK_API_URL!, {
                'token': process.env.WEBHOOK_API_TOKEN,
                'webhookUrl': webhook,
                'webhookData': {
                    username: `${data.tag} | ${data.userId}`,
                    avatar_url: data.avatarUrl,
                    content: data.content,
                    // attachments: [{
                    //     id: 0,
                    //     filename: 'w3duR07.png',
                    //     url: 'https://i.imgur.com/w3duR07.png'
                    // }],
                    files: [{
                        id: 0,
                        attachment: 'https://i.imgur.com/w3duR07.png',
                        name: 'w3duR07.png'
                    }]
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.data.status == 200)
                sendedTo++
            else
                console.log(webhook, response.data)
        }

        return res.send({
            numberOfChannels,
            sendedTo,
            support: process.env.SUPPORT_INVITE,
            poweredBy: process.env.POWERED_BY
        })

    }

} as RouteType