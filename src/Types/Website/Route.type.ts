import {NextFunction, Request, Response} from 'express'
import {Permissions} from '../Database/User.type'

export interface RouteOutput {

    success?: {

        [x: string]: any

    }

    error?: {

        code: number
        message: string

    }

    render?: {

        file: string
        data?: {

            [x: string]: any

        }

    },

    redirect?: string

}

declare module 'express-session' {

    interface SessionData {

        oauthToken: {

            access_token: string
            expires_in: number
            refresh_token: string
            scope: string
            token_type: string

        }

        oauthUser: {

            id: string
            username: string
            discriminator: string
            avatar?: string
            bot?: boolean
            system?: boolean
            mfa_enabled?: boolean
            banner?: string
            accent_color?: number
            locale?: string
            flags?: number
            premium_type?: number
            public_flags?: number

        }

        [x: string]: any

    }

}

export default abstract class Route {

    route: string = '/'
    methods: {

        method: 'get' | 'post'
        permissions?: Permissions[]
        mustLogged?: boolean
        run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput>

    }[] = []

}

