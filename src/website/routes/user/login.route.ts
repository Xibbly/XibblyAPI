import RouteType from '../../../types/website.type'
import UserHandler from "../../../database/handlers/user.handler";

export default {

    route: 'login',

    get({res}) {

        return res.render('user/login')

    },

    async post({req, res}) {


        const response = await new UserHandler().login(req.body.login || '', req.body.pass || '')
        if (!response)
            return res.render('user/login', {
                error: 'Błędne dane!'
            })

        req.session.user = response
        return res.redirect('/panel')

    }

} as RouteType