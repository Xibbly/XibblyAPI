import RouteType from '../../../types/website.type'

export default {

    route: 'login',
    method: 'POST',

    run({res}) {

        return res.render('panel')

    }

} as RouteType