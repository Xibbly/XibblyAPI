import {NextFunction, Request, Response} from 'express'
import {PermissionsType} from '../Database/User.type'

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

    }

}

interface Express {

    req: Request
    res: Response
    next: NextFunction

}

declare module 'express-session' {
    interface SessionData {
        user: {}

        [x: string]: any
    }
}

export default abstract class Route {

    route: string = '/'
    methods: {
        method: 'get' | 'post'
        permissions?: PermissionsType[]
        mustLogin?: boolean
        mustDiscordConnected?: boolean
        run(data?: Express): Promise<RouteOutput>
    }[] = []

}

