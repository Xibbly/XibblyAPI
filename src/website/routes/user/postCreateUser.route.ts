import RouteType from '../../../types/website.type'

export default {

    route: 'register',
    method: 'POST',

    run({req, res}) {

        console.log('ok')
        console.log(req.body)
        return res.render('panel')

    }

} as RouteType