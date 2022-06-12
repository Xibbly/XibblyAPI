import RouteType from '../../types/website.type'

export default {

    route: '/',
    method: 'USE',

    run({req, res}) {

        return res.render('home')

    }

} as RouteType