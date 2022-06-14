import RouteType from '../../../types/website.type'

export default {

    route: '',
    mustLogin: true,

    get({req, res}) {

        return res.render('adminpanel/home', {
            user: req.session.user
        })

    }

} as RouteType