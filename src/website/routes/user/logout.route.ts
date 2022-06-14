import RouteType from '../../../types/website.type'
import UserHandler from "../../../database/handlers/user.handler";

export default {

    route: 'logout',
    mustLogin: true,

    get({req, res}) {

        req.session.user = undefined
        return res.redirect('/user/login')

    }

} as RouteType