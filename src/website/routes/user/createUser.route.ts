import RouteType from '../../../types/website.type'

export default {

    route: '/register',
    method: 'USE',
    permission: 'null',

    run({res}) {

        return res.send('register')

    }

} as RouteType