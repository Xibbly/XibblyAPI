import RouteType from '../../../types/website.type'

export default {

    route: 'register',
    method: 'GET',

    run({res}) {

        return res.render('register')

    }

} as RouteType