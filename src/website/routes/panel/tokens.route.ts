import RouteType from '../../../types/website.type'
import TokenModelType from '../../../types/models/token.modelType'

export default {

    route: 'tokens',
    mustLogin: true,

    get({req, res}) {

        const tokens: TokenModelType[] = [{
            userId: 1,
            permissions: [],
            token: 'gnIYGIyuniuYNGG',
            createdAt: new Date(),
            modifiedAt: new Date()
        }, {
            userId: 1,
            permissions: [],
            token: 'gnIYGIyuniuYNGG',
            createdAt: new Date(),
            modifiedAt: new Date()
        }, {
            userId: 1,
            permissions: [],
            token: 'gnIYGIyuniuYNGG',
            createdAt: new Date(),
            modifiedAt: new Date()
        }, {
            userId: 1,
            permissions: [],
            token: 'gnIYGIyuniuYNGG',
            createdAt: new Date(),
            modifiedAt: new Date()
        }]

        return res.render('panel/tokens', {
            user: req.session.user,
            tokens
        })

    }

} as RouteType