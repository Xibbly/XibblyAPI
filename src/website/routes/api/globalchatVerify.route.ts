import RouteType from '../../../types/website.type'
import {GlobalChatApiVerifyPost} from '../../../types/api/globalchat.type'
import GlobalchatHandler from '../../../database/handlers/globalchat.handler'

export default {

    route: 'globalchat/verify',

    async post({req, res}) {

        const data: GlobalChatApiVerifyPost = req.body

        if (!data.token || !data.guildId || !data.moderatorId)
            return res.status(400).send('Missing data')

        if (data.token !== process.env.GLOBALCHAT_TOKEN)
            return res.status(401).send('Unauthorized')

        if (data.guildId.length != 18 || data.moderatorId.length != 18)
            return res.status(400).send('Invalid data provided')

        if (await new GlobalchatHandler().verify(data.guildId, data.moderatorId)) {
            return res.send({
                guildId: data.guildId,
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })
        } else
            return res.status(404).send('Guild not found')

    }

} as RouteType