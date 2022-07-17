import RouteType from '../../../types/website.type'
import {GlobalChatApiDelete} from '../../../types/api/globalchat.type'
import GlobalchatHandler from '../../../database/handlers/globalchat.handler'

export default {

    route: 'globalchat/delete',

    async post({req, res}) {

        const data: GlobalChatApiDelete = req.body

        if (!data.token || !data.guildId || !data.moderatorId || !data.reason)
            return res.status(400).send({error: 'Missing data'})

        if (!Number(data.guildId) || !Number(data.moderatorId) || data.guildId.length != 18 || data.moderatorId.length != 18)
            return res.status(400).send({error: 'Invalid data provided'})

        if (data.token !== process.env.GLOBALCHAT_TOKEN)
            return res.status(401).send({error: 'Invalid token'})

        if (await new GlobalchatHandler().detete(data.guildId)) {
            return res.send({
                ...data,
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })
        } else
            return res.status(404).send({error: 'Guild is not found'})

    }

} as RouteType