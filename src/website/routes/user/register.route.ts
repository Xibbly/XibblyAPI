import RouteType from '../../../types/website.type'

export default {

    route: 'register',

    get({res}) {

        return res.render('register')

    },

    post({req, res}) {

        console.log('ok')
        console.log(req.body)
        return res.render('panel')

    }

} as RouteType