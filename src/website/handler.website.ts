import {readdirSync} from 'fs'
import {Application} from 'express'
import RouteType from '../types/website.type'

export default class HandlerWebsite {

    constructor(private app: Application) {

        this.handler()

    }

    // @todo - Function -> Class (routes)
    private handler(): void {

        readdirSync(`${__dirname}/routes`).filter((name: string) => !name.endsWith('.route.js')).forEach(route => {
            readdirSync(`${__dirname}/routes/${route}`).forEach((subroute: string) => {

                const data: RouteType = require(`${__dirname}/routes/${route}/${subroute}`).default
                this.loadRoute(`/${route}${data.route}`, data)

            })
        })

        readdirSync(`${__dirname}/routes`).filter((name: string) => name.endsWith('.route.js')).forEach(route => {

                const data: RouteType = require(`${__dirname}/routes/${route}`).default
                this.loadRoute(`${data.route}`, data)

        })

    }

    private loadRoute(route: string, data: RouteType): void {

        // console.log(route, data)

        // @todo - Add permissions handler
        switch (data.method) {
            case "USE":
                this.app.use(route, (req, res, next) => data.run({req, res, next}))
                break
            case "POST":
                this.app.post(route, (req, res, next) => data.run({req, res, next}))
                break
        }

    }

    // private hasPermissions() {}

}