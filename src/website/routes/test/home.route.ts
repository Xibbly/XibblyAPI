import RouteType from '../../../types/website.type'

export default {

    route: '',
    method: 'GET',

    run({res}) {

        return res.send('test OK')

    }

} as RouteType