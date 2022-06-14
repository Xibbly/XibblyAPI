import {NextFunction, Request, Response} from "express";
import UserModelType from './models/user.modelType'

export interface RouteArguments {
    req: Request
    res: Response
    next: NextFunction
}

export default interface RouteType {
    route: string
    permissions?: string[]
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
