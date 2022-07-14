import RouteType from '../../../types/website.type'

export default {

    route: 'logout',
    mustLogin: true,

    get({req, res}) {

        req.session.user = undefined
        return res.redirect('/user/login')

    }

} as RouteType