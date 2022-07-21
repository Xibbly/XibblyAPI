import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import TokenHandler from "../../../Database/Handlers/Token.handler";
import LogsUtil from "../../../Utils/Logs.util";

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/token/regenerate'

        this.methods.push({

            method: 'get',
            mustLogged: true,

            async run(req): Promise<RouteOutput> {

                const token = req.query.token as string

                if (token && (await new TokenHandler().getByToken(token)).userId === req.session.user?.userId) {

                    await new TokenHandler().regenerate(token)
                    await new LogsUtil().sendDiscord('private', {
                        embeds: [{
                            title: '🗝️ | Regenracja Tokena',
                            description: `<@${req.session.oauthUser?.id}>(\`${req.session.oauthUser?.id}\`) regenerował token!`,
                            color: '#ffff00'
                        }]
                    })

                }

                return {

                    redirect: '/panel/tokens'

                }

            }

        })

    }

}