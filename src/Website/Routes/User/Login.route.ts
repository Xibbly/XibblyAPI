import axios from 'axios'
import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {NextFunction, Request, Response} from 'express'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/user/login'

        this.methods.push({

            method: 'get',
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                try {

                    const version = 'v10'

                    req.session.oauthToken = (await axios.post(`https://discord.com/api/${version}/oauth2/token`, new URLSearchParams({
                        client_id: `${process.env.BOT_ID}`,
                        client_secret: `${process.env.BOT_SECRET}`,
                        code: `${req.query.code}`,
                        grant_type: 'authorization_code',
                        redirect_uri: `${process.env.REDIRECT_URL}`
                    }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    })).data

                    req.session.oauthUser = (await axios.get(`https://discord.com/api/${version}/users/@me`, {
                        headers: {
                            Authorization: `${req.session.oauthToken?.token_type} ${req.session.oauthToken?.access_token}`
                        }
                    })).data

                    // TODO: save to database, if is not exist, send discord embed logs

                    return {

                        redirect: '/panel'

                    }

                } catch (e) {

                    return {

                        redirect: `/user/loginredirect`

                    }

                }

            }

        })

    }

}