import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import TokenHandler from "../../../Database/Handlers/Token.handler";

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/token/delete'

        this.methods.push({

            method: 'get',
            mustLogged: true,

            async run(req): Promise<RouteOutput> {

                const token = req.query.token as string

                if ((await new TokenHandler().getByToken(token)).userId === req.session.user?.userId) {

                    await new TokenHandler().delete(token)

                }

                return {

                    redirect: '/panel/tokens'

                }

            }

        })

    }

}