import RouteType from '../../../types/website.type'
import UserHandler from "../../../database/handlers/user.handler";
import UserModelType from "../../../types/models/user.modelType";

export default {

    route: 'register',

    get({res}) {

        return res.render('user/register')

    },

    async post({req, res}) {

        if (req.session.user)
            return res.redirect('/panel')

        if (!req.body.login || !req.body.password || !req.body.confirmPassword)
            return res.render('user/register', {
                error: 'Uzupełnij poprawnie formularz!'
            })

        if (req.body.login.length < 3)
            return res.render('user/register', {
                error: 'Login powinien mieć minimum 3 znaki!'
            })

        if (req.body.password.length < 8)
            return res.render('user/register', {
                error: 'Hasło powinno mieć minimum 8 znaków!'
            })

        if (req.body.password != req.body.confirmPassword)
            return res.render('user/register', {
                error: 'Hasła nie są sobie równe!'
            })

        // @todo -> max 3 acc for 1 IP
        const IP = req.header('x-forwarded-for') || 'localhost'

        const response = await new UserHandler().createNew(req.body.login, req.body.password, IP)

        if (!response)
            return res.render('register', {
                error: 'Użytkownik o takiej nazwie już istnieje!'
            })

        req.session.user = response
        return res.redirect('/panel')

    }

} as RouteType