import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/panel'

        this.methods.push({

            method: 'get',
            mustLogged: true,

            async run(): Promise<RouteOutput> {

                return {

                    render: {

                        file: 'panel/home'

                    }

                }

            }

        })

    }

}