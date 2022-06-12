import RouteType from '../../../types/website.type'

export default {

    route: 'register',
    method: 'USE',

    run({res}) {

        return res.render('register')

    }

} as RouteType