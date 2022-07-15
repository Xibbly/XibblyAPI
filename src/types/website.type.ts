import {NextFunction, Request, Response} from 'express'
import UserType, {PermissionsType as UserPermissionsType} from './models/user.type'

export interface RouteArguments {
    req: Request
    res: Response
    next: NextFunction
}

export default interface RouteType {
    route: string
    permissions?: UserPermissionsType[]
    disabled?: boolean
    mustLogin?: boolean
    mustDiscordConnected?: boolean

    get: (data: RouteArguments) => any
    post: (data: RouteArguments) => any
}

declare module 'express-session' {
    interface SessionData {
        user: Omit<UserType, 'password' | 'ip'>
        [x: string]: any
    }
}
