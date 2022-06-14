import {NextFunction, Request, Response} from 'express'
import UserModelType from './models/user.modelType'

export interface RouteArguments {
    req: Request
    res: Response
    next: NextFunction
}

export default interface RouteType {
    route: string
    permissions?: Array<'*' | 'admin_panel' | 'view_users' | 'manage_users' | 'view_tokens' | 'manage_tokens'>
    tokenPermissions?: Array<'*'>
    disabled?: boolean
    mustLogin?: boolean

    get: (data: RouteArguments) => any
    post: (data: RouteArguments) => any
}

declare module 'express-session' {
    interface SessionData {
        user: Omit<UserModelType, 'password' | 'ip'>

        [x: string]: any
    }
}
