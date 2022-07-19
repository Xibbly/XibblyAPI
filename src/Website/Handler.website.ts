import {readdirSync} from 'fs'
import {Application, NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../Types/Website/Route.type'
import LogsUtil from "../Utils/Logs.util";

export default class HandlerWebsite {

    constructor(private app: Application) {

        const table: (Omit<Route, 'run'> & { filePath: string })[] = []

        readdirSync(`${__dirname}/Routes`).filter(fileName => !fileName.startsWith('--')).forEach((category: string) => {

            if (category.endsWith('.js')) {

                const route: Route = new (require(`${__dirname}/Routes/${category}`).default)
                if (this.setupRoute(route))
                    table.push({
                        ...route,
                        filePath: `/${category}`
                    })

            } else {

                readdirSync(`${__dirname}/Routes/${category}`).filter(fileName => !fileName.startsWith('--')).forEach((file: string) => {

                    const route: Route = new (require(`${__dirname}/Routes/${category}/${file}`).default)
                    if (this.setupRoute(route))
                        table.push({
                            ...route,
                            filePath: `/${category}/${file}`
                        })

                })

            }

        })

        console.table(table)

    }

    private setupRoute(route: Route): boolean {

        try {

            this.app[route.type](route.route, async (req: Request, res: Response, next: NextFunction) => {

                const output: RouteOutput = await route.run({req, res, next})

                if (output.success) {

                    res.send(output.success)

                } else if (output.error) {

                    res.status(output.error.code).send(output.error)

                } else if (output.render) {

                    res.render(output.render.file, output.render.data)

                }

            })
            return true

        } catch (e) {

            new LogsUtil().sendLog('red', `Error while setting up route ${route.route}.\n${e}`)
            return false

        }

    }

}