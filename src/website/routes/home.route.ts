import RouteType from '../../types/website.type'

export default {

    route: '/',

    get({req, res}) {

        return res.render('home')

    }

} as RouteType