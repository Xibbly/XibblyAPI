import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/user/logout'

        this.methods.push({

            method: 'get',
            async run(req): Promise<RouteOutput> {

                req.session.destroy(() => {
                })

                return {

                    redirect: '/'

                }

            }

        })

    }

}