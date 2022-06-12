import {readdirSync} from 'fs'
import {Application} from 'express'
import RouteType from '../types/website.type'

export default class HandlerWebsite {

    constructor(private app: Application) {

        this.handler()

    }

    // @todo - Function -> Class (routes)
    private async handler(): Promise<void> {

        readdirSync(`${__dirname}/routes`).forEach(route => {
            if (route.endsWith('.route.js')) {

                const data: RouteType = require(`${__dirname}/routes/${route}`).default
                this.loadRoute(`${data.route}`, data)

            } else {

                readdirSync(`${__dirname}/routes/${route}`).forEach((subroute: string) => {

                    const data: RouteType = require(`${__dirname}/routes/${route}/${subroute}`).default
                    this.loadRoute(`${route}${data.route}`, data)

                })

            }
        })

    }

    private loadRoute(route: string, data: RouteType) {

        console.log(route, data)

        switch (data.method) {
            case "USE":
                this.app.use(route, (req, res, next) => data.run({req, res, next}))
                break
            case "POST":
                this.app.post(route, (req, res, next) => data.run({req, res, next}))
                break
        }

    }

}