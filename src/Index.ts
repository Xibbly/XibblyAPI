import {config as dotenvConfig} from 'dotenv'
import IndexWebsite from './Website/Index.website'
import {IndexDatabase} from './Database/Index.database'

dotenvConfig()

export class Index {

    constructor() {

        new IndexDatabase()
        new IndexWebsite()

    }

}

new Index()