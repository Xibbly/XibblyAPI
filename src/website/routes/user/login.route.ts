import RouteType from '../../../types/website.type'

export default {

    route: 'login',
    method: 'USE',

    run({res}) {

        return res.render('login')

    }

} as RouteType