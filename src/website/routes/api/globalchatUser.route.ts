import RouteType from '../../../types/website.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import GlobalchatUserUtil from '../../../utils/globalchatUser.util'

export default {

    route: 'globalchat/user',
    mustDiscordConnected: true,

    async post({req, res}) {

        const userId: string = req.body.userId
        const token: string = req.body.token

        if (!userId)
            return res.status(400).send({error: 'Missing parameters'})

        if (userId.length != 18)
            return res.status(400).send({error: 'Invalid data provided'})

        if (!await new TokensHandler().hasToken(token))
            return res.status(401).send({error: 'Invalid token'})

        const userData = await new GlobalchatUserUtil().getUser(userId)

        if (userData && userData.userId)
            return res.send({
                userId: userData.userId,
                gcid: userData.gcid,
                moderator: userData.moderator || (process.env.DEV_IDS as string).split(',').includes(userId),
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })
        else
            return res.status(400).send({error: 'Invalid data provided'})

    }

} as RouteType