import RouteType from '../../../types/website.type'
import UserHandler from "../../../database/handlers/user.handler";
import UserModelType from "../../../types/models/user.modelType";

export default {

    route: 'register',

    get({res}) {

        return res.render('register')

    },

    async post({req, res}) {

        if (!req.body.login || !req.body.password || !req.body.confirmPassword)
            return res.render('register', {
                error: 'Wprowadzono błędne dane!'
            })

        if (req.body.password != req.body.confirmPassword)
            return res.render('register', {
                error: 'Hasła nie są sobie równe!'
            })

        // @todo -> IP
        const response = await new UserHandler().createNew(req.body.login, req.body.password, "IP")

        if (!response)
            return res.render('register', {
                error: 'Użytkownik o takiej nazwie już istnieje!'
            })

        req.session.user = response
        return res.redirect('/panel')

    }

} as RouteType