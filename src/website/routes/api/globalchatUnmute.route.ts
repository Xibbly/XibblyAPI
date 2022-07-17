import RouteType from '../../../types/website.type'
import {GlobalchatUserUnmuteType} from '../../../types/api/globalchatUser.type'
import GlobalchatUserHandler from "../../../database/handlers/globalchatUser.handler";

export default {

    route: 'globalchat/unmute',

    async post({req, res}) {

        const data: GlobalchatUserUnmuteType = req.body

        if (!data.token || !data.userId || !data.moderatorId)
            return res.status(400).send({error: 'Missing data'})

        if (!Number(data.userId) || !Number(data.moderatorId) || data.userId.length != 18 || data.moderatorId.length != 18)
            return res.status(400).send({error: 'Invalid data provided'})

        if (data.token !== process.env.GLOBALCHAT_TOKEN)
            return res.status(401).send({error: 'Invalid token'})

        if (await new GlobalchatUserHandler().unmute(data.userId)) {
            // @todo discord logs

            // @ts-ignore
            delete data.token
            return res.status(200).send({
                ...data,
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })

        } else
            return res.status(404).send({error: 'User is not found or user is not muted'})

    }

} as RouteType