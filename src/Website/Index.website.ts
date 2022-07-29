import ex from 'express'
import es from 'express-session'
import LogsUtil from '../Utils/Logs.util'
import HandlerWebsite from './Handler.website'
import CacheUtil from "../Utils/Cache.util";

export default class IndexWebsite {

    app: ex.Express = ex()
    port: string = process.env.PORT as string

    constructor() {

        this.setup()
        new HandlerWebsite(this.app)
        this[404]()
        this.listen()

    }

    private setup(): void {

        this.app.set('view engine', 'pug')
        this.app.set('views', `${__dirname}/../../views`)
        this.app.use(ex.static(`${__dirname}/../../public`))

        this.app.use(ex.json())
        this.app.use(ex.urlencoded({extended: false}))
        this.app.use(es({
            secret: `${process.env.SESSION_SECRET}`,
            cookie: {
                maxAge: 30 * 60 * 1000 //30 min
            },
            resave: true,
            saveUninitialized: true
        }))

    }

    private 404(): void {

        this.app.use((req, res) => res.status(404).redirect('/'))

    }

    private listen(): void {

        this.app.listen(this.port, () => {
            new LogsUtil().sendLog('green', `Server started on port ${this.port}`)
        })

    }


}