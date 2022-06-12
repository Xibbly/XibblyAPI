import {NextFunction, Request, Response} from "express";

export interface RouteArguments {
    req: Request
    res: Response,
    next: NextFunction
}

export default interface RouteType {
    route: string,
    method: 'USE' | 'POST',
    permissions?: string
    disabled?: boolean,
    run: (data: RouteArguments) => any
}