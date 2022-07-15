import RouteType from '../../../types/website.type'
import {GlobalChatApiVerify} from '../../../types/api/globalchat.type'
import GlobalchatHandler from '../../../database/handlers/globalchat.handler'
import SendDiscordWebhookUtil from '../../../utils/sendDiscordWebhook.util'

export default {

    route: 'globalchat/add',
    mustDiscordConnected: true,


    async post({req, res}) {

        const data: GlobalChatApiVerify = req.body

        if (!data.token || !data.guildId)
            return res.status(400).send('Missing data')

        if (data.token !== process.env.GLOBALCHAT_TOKEN)
            return res.status(401).send('Unauthorized')

        if (data.guildId.length != 18)
            return res.status(400).send('Invalid data provided')

        if (await new GlobalchatHandler().hasAdd(data.guildId)) {
            return res.send({
                guildId: data.guildId,
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })
        } else
            return res.status(400).send('Error while verifying')

    }

} as RouteType