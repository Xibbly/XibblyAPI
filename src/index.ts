import {config as dotenvConfig} from 'dotenv'
import {IndexDatabase} from './database/index.database'
import IndexWebsite from './website/index.website'
import IntervalsUtil from './utilities/intervals.util'

dotenvConfig()

new IndexDatabase()
new IndexWebsite()
new IntervalsUtil()