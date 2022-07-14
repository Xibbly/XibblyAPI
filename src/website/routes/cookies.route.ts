import RouteType from '../../types/website.type'

export default {

    route: '/cookies',

    get({req, res}) {

        return res.render('cookies', {
            user: req.session.user
        })

    }

} as RouteType