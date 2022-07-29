import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/user/loginredirect'

        this.methods.push({

            method: 'get',
            async run(): Promise<RouteOutput> {

                return {

                    redirect: `https://discord.com/api/oauth2/authorize?client_id=${process.env.BOT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify&grant_type=authorization_code`

                }

            }

        })

    }

}