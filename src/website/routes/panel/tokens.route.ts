import RouteType from '../../../types/website.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import TokenModelType from '../../../types/models/token.modelType'

export default {

    route: 'tokens',
    mustLogin: true,

    async get({req, res}) {

        const tokens = await new TokensHandler().getAll(req.session.user?.id!)

        tokens.map((token: TokenModelType) => {
            token.createdAt = token.createdAt.toLocaleString()
            token.modifiedAt = token.modifiedAt.toLocaleString()
        })

        return res.render('panel/tokens', {
            user: req.session.user,
            tokens
        })

    }

} as RouteType