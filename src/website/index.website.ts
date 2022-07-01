import ex, {Application} from 'express'
import es from 'express-session'
import HandlerWebsite from './handler.website'

export default class IndexWebsite {

    app: Application = ex()

    constructor() {

        this.setup()
        new HandlerWebsite(this.app)

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
        }));

        this.app.listen(process.env.PORT, () => {
            console.log(`API work on port ${process.env.PORT}!`)
        })
    }

}