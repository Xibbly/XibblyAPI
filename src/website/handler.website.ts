import {readdirSync} from 'fs'
import {Application, Request} from 'express'
import RouteType from '../types/website.type'

export default class HandlerWebsite {

    constructor(private app: Application) {

        this.handler()

    }

    private handler(): void {

        readdirSync(`${__dirname}/routes`).filter((name: string) => !name.endsWith('.route.js')).forEach(route => {
            readdirSync(`${__dirname}/routes/${route}`).forEach((subroute: string) => {

                const data: RouteType = require(`${__dirname}/routes/${route}/${subroute}`).default
                this.loadRoute(`/${route}/${data.route}`, data)

            })
        })

        readdirSync(`${__dirname}/routes`).filter((name: string) => name.endsWith('.route.js')).forEach(route => {

            const data: RouteType = require(`${__dirname}/routes/${route}`).default
            this.loadRoute(`${data.route}`, data)

        })

    }

    private loadRoute(route: string, data: RouteType): void {

        if (data.disabled)
            return

        if (data.get) {
            console.log(`Route: ${route}; Methid: GET`)

            this.app.get(route, async (req, res, next) => {

                if (data.mustLogin) {
                    if (!this.isLogged(req))
                        return res.redirect('/user/login')

                    if (data.permissions && !(await this.hasPermissions(req.session.user?.permissions!, data.permissions)))
                        return res.redirect('/')
                }

                data.get({req, res, next})

            })
        }

        if (data.post) {
            console.log(`Route: ${route}; Methid: POST`)

            this.app.post(route, (req, res, next) => data.post({req, res, next}))
        }

    }

    private isLogged(req: Request): boolean {
        if (!req.session.user)
            return false
        return true
    }

    private async hasPermissions(userPermissions: string[], permissions: string[]): Promise<boolean> {
        let hasPermissions: string[] = []

        if (!userPermissions.includes('*'))
            permissions.forEach((permission: string) => {
                if (userPermissions.includes(permission))
                    hasPermissions.push(permission)
            })
        else
            hasPermissions = permissions

        return hasPermissions.length == permissions.length
    }

}