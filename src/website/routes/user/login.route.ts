import RouteType from '../../../types/website.type'

export default {

    route: '/login',
    method: 'USE',
    permission: 'null',

    run({res}) {

        return res.send('login')

    }

} as RouteType