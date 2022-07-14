import RouteType from '../../../types/website.type'
import TokensHandler from '../../../database/handlers/tokens.handler'

export default {

    route: 'tokens',
    mustLogin: true,

    async get({req, res}) {

        const tokens = await new TokensHandler().getAll(req.session.user?.id!)

        console.log(tokens)

        return res.render('panel/tokens', {
            user: req.session.user,
            tokens
        })

    }

} as RouteType