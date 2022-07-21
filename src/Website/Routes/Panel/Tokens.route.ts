import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import TokenHandler from '../../../Database/Handlers/Token.handler'
import DateUtil from '../../../Utils/Date.util'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/panel/tokens'

        this.methods.push({

            method: 'get',
            mustLogged: true,

            async run(req): Promise<RouteOutput> {

                const tokens = await new TokenHandler().getByUserId(req.session.user?.userId as string)

                const fixDate = new DateUtil().format

                return {

                    render: {

                        file: 'panel/tokens',
                        data: {

                            tokens,
                            fixDate

                        }

                    }

                }

            }

        })

    }

}