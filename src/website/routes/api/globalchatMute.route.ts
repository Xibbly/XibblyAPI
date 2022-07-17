import RouteType from '../../../types/website.type'
import GlobalchatUserUtil from '../../../utilities/globalchatUser.util'
import {GlobalchatUserMutePostType} from '../../../types/api/globalchatUser.type'
import GlobalchatUserHandler from '../../../database/handlers/globalchatUser.handler'
import DateUtil from '../../../utilities/date.util'
import {errors} from "jose";

export default {

    route: 'globalchat/mute',

    async post({req, res}) {

        const data: GlobalchatUserMutePostType = req.body

        if (!data.token || !data.userId || !data.moderatorId || !data.reason)
            return res.status(400).send({error: 'Missing data'})

        if (!Number(data.userId) || !Number(data.moderatorId) || data.userId.length != 18 || data.moderatorId.length != 18)
            return res.status(400).send({error: 'Invalid data provided'})

        if (data.token !== process.env.GLOBALCHAT_TOKEN)
            return res.status(401).send({error: 'Invalid token'})

        if (await new GlobalchatUserUtil().mute(data.userId, data.moderatorId, data.reason, (data.expiriedAt || false) as string)) {
            const userMuteData = await new GlobalchatUserHandler().getMute(data.userId)
            res.send({
                userId: data.userId,
                moderatorId: data.moderatorId,
                reason: data.reason,
                mutedAt: new DateUtil().formatDate(new DateUtil().unixToDate(userMuteData.mutedAt)),
                expiriedAt: userMuteData.permament ? 'Never' : new DateUtil().formatDate(new DateUtil().unixToDate(userMuteData.expiriedAt as number)),
                permament: userMuteData.permament,
                support: process.env.SUPPORT_INVITE,
                poweredBy: process.env.POWERED_BY
            })

        } else
            return res.status(404).send({error: 'User is not found, user is already muted or user is moderator/developer'})

    }

} as RouteType