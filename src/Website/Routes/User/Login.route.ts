import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'

export default class extends RouteType {

    constructor() {
        super();

        this.route = '/user/login';

    }

    async run(): Promise<RouteOutput> {

        return {

            render: {

                file: 'home'

            }

        }

    }

}