import RouteType from '../../../types/website.type'

export default {

    route: '',
    method: 'USE',
    permission: 'null',

    run({res}) {

        return res.send('test OK')

    }

} as RouteType