import RouteType from '../../../types/website.type'

export default {

    route: 'login',

    get({res}) {

        return res.render('login')

    },

    post({res}) {

        return res.render('panel')

    }

} as RouteType