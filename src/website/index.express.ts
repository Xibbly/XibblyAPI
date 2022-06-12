import ex, {Application} from 'express'
import es from 'express-session'

export default class IndexExpress {

    app: Application = ex()

    constructor() {

        this.setup()
        this.test()

    }

    private setup() {

        this.app.set('view engine', 'pug')
        this.app.set('views', `${__dirname}/../../views`)
        this.app.use(ex.static(`${__dirname}/../../public`))

        this.app.use(ex.json())
        this.app.use(ex.urlencoded({extended: false}))

        console.log(process.env)

        this.app.listen(process.env.PORT, () => {
            console.log('API work!')
        })
    }

    private test() {

        this.app.get('/', (req, res) => {
            res.render('home')
        })

    }

}