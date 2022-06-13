import RouteType from '../../../types/website.type'

export default {

    route: '',

    get({res}) {

        return res.send('test OK')

    }

} as RouteType