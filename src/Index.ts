import {config as dotenvConfig} from 'dotenv'
import IndexWebsite from './Website/Index.website'
import {IndexDatabase} from './Database/Index.database'
import IntervalsUtil from './Utils/Intervals.util'
import {CacheUtil} from './Utils/Cache.util'

dotenvConfig()

let settings = {
    globalchat: true
}
export default settings

export class Index {

    constructor() {

        this.setup()

    }

    private async setup(): Promise<void> {

        new IndexDatabase()
        new IndexWebsite()
        await new CacheUtil().setup()
        await new IntervalsUtil()

    }

}

new Index()