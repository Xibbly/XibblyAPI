import RouteType from '../../../types/website.type'
import TokensHandler from '../../../database/handlers/tokens.handler'
import TokenModelType from '../../../types/models/token.modelType'
import DateUtil from '../../../utils/date.util'

export default {

    route: 'tokens',
    mustLogin: true,

    async get({req, res}) {

        const tokens = await new TokensHandler().getAll(req.session.user?.id!)

        tokens.map((token: TokenModelType) => {
            console.log(new DateUtil().formatDate(token.createdAt as Date))
            console.log(new DateUtil().formatDate(token.modifiedAt as Date))
            token.createdAt = new DateUtil().formatDate(token.createdAt as Date)
            token.modifiedAt = new DateUtil().formatDate(token.modifiedAt as Date)
            return token
        })

        console.log(tokens)

        return res.render('panel/tokens', {
            user: req.session.user,
            tokens
        })

    }

} as RouteType