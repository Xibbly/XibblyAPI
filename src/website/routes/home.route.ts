import RouteType from '../../types/website.type'

export default {

    route: '/',
    method: 'USE',
    permission: 'null',

    run({res}) {

        return res.render('home');

    }

} as RouteType;