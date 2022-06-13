import RouteType from '../../../types/website.type'

export default {

    route: '',

    get({req, res}) {

        if (!req.session.user)
            res.redirect('/user/login')

        return res.render('panel/home', {
            user: req.session.user
        })

    }

} as RouteType