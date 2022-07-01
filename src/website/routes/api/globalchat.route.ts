import RouteType from '../../../types/website.type'

export default {

    route: 'globalchat',


    post({req, res}) {

        return res.send('Global chat')

    }

} as RouteType