import {NextFunction, Request, Response} from "express";
import UserModelType from './models/user.modelType'

export interface RouteArguments {
    req: Request
    res: Response
    next: NextFunction
}

export default interface RouteType {
    route: string
    method: 'USE' | 'POST'
    permissions?: string
    disabled?: boolean
    run: (data: RouteArguments) => any
}

declare module 'express-session' {
    interface SessionData {
        user: Omit<UserModelType, 'password'>
        [x: string]: any
    }
}