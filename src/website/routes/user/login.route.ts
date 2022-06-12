import RouteType from '../../../types/website.type'

export default {

    route: 'login',
    method: 'USE',
    permission: 'null',

    run({res}) {

        return res.render('login')

    }

} as RouteType