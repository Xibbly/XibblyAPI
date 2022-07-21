import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import TokenHandler from '../../../Database/Handlers/Token.handler'
import LogsUtil from '../../../Utils/Logs.util'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/token/generate'

        this.methods.push({

            method: 'get',
            mustLogged: true,

            async run(req): Promise<RouteOutput> {

                const maxTokensForUser = Number(process.env.MAX_TOKENS)
                const maxTokensForPremium = Number(process.env.MAX_TOKENS)
                const userTokens = await new TokenHandler().getByUserId(req.session.user?.userId as string)
                const userPermissions = req.session.user?.permissions as string[]

                if (userPermissions.includes('*') || userPermissions.includes('unlimited_tokens')) {
                } else if (userPermissions.includes('premium') && userTokens.length >= maxTokensForPremium) {
                    return {

                        redirect: '/panel/tokens'

                    }
                } else if (userTokens.length >= maxTokensForUser) {
                    return {

                        redirect: '/panel/tokens'

                    }
                }


                await new TokenHandler().insert(req.session.user?.userId as string)
                await new LogsUtil().sendDiscord('private', {
                    embeds: [{
                        title: '🗝️ | Nowy Token',
                        description: `<@${req.session.oauthUser?.id}>(\`${req.session.oauthUser?.id}\`) wygenerował token!`,
                        color: '#00ff00'
                    }]
                })

                return {

                    redirect: '/panel/tokens'

                }

            }

        })

    }

}