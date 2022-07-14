import RouteType from '../../../types/website.type'
import TokensHandler from '../../../database/handlers/tokens.handler'

export default {

    route: 'generate',
    mustLogin: true,

    async get({req, res}) {

        if (req.session.user?.permissions.includes('*') || req.session.user?.permissions.includes('unlimited_tokens')) {
            await new TokensHandler().createNew(req.session.user?.id!)
            return res.redirect('/panel/tokens')
        } else if (req.session.user?.permissions.includes('premium') && (await new TokensHandler().getAllForUser(req.session.user?.id!)).length < Number(process.env.MAX_PREMIUM_TOKENS)) {
            await new TokensHandler().createNew(req.session.user?.id!)
            return res.redirect('/panel/tokens')
        } else if ((await new TokensHandler().getAllForUser(req.session.user?.id!)).length < Number(process.env.MAX_TOKENS)) {
            await new TokensHandler().createNew(req.session.user?.id!)
            return res.redirect('/panel/tokens')
        } else
            return res.redirect('/panel/tokens')

    }

} as RouteType