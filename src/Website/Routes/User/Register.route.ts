import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'

export default class extends RouteType {

    constructor() {
        super();

        this.route = '/user/register';

        this.methods.push({

            method: 'get',
            async run(): Promise<RouteOutput> {

                return {

                    render: {

                        file: 'register'

                    }

                }

            }

        })

    }

}