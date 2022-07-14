import RouteType from '../../../types/website.type'
import TokensHandler from '../../../database/handlers/tokens.handler'

export default {

    route: 'regenerate',
    mustLogin: true,

    async get({req, res}) {

        if (!req.query.token)
            return res.redirect('/panel/tokens')

        const getToken = await new TokensHandler().getToken(req.query.token as string)
        console.log(getToken)
        if (!getToken || !getToken || getToken.userId !== req.session.user?.id || req.session.user?.permissions.includes('manage_tokens'))
            return res.redirect('/panel/tokens')

        await new TokensHandler().regenerate(req.query.token as string)
        return res.redirect('/panel/tokens')

    }

} as RouteType