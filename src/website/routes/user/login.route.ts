import RouteType from '../../../types/website.type'

export default {

    route: 'login',

    get({res}) {

        return res.render('user/login')

    },

    post({res}) {

        return res.redirect('/panel')

    }

} as RouteType