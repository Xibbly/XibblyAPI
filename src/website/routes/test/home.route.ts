import RouteType from '../../../types/website.type'

export default {

    route: '',
    method: 'USE',

    run({res}) {

        return res.send('test OK')

    }

} as RouteType