import RouteType from '../../../types/website.type'
import UserHandler from "../../../database/handlers/user.handler";
import TokensHandler from "../../../database/handlers/tokens.handler";

export default {

    route: 'regenerate',
    mustLogin: true,

    async get({req, res}) {

        console.log(1)

        if (!req.query.token)
            return res.redirect('/panel/tokens')
        console.log(1)

        const getToken = await new TokensHandler().getToken(req.query.token as string)
        if (!getToken || !getToken || getToken.userId !== req.session.user?.id || req.session.user.permissions.includes('manage_tokens'))
            return res.redirect('/panel/tokens')

        console.log(1)

        await new TokensHandler().regenerate(req.query.token as string)
        return res.redirect('/panel/tokens')

    }

} as RouteType