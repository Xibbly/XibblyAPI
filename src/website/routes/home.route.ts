import RouteType from '../../types/website.type'

export default {

    route: '/',

    get({req, res}) {

        return res.render('home', {
            user: req.session.user
        })

    }

} as RouteType