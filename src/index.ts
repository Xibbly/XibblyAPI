import {config as dotenvConfig} from 'dotenv'
import {IndexDatabase} from './database/index.database'
import IndexWebsite from './website/index.website'

dotenvConfig()

new IndexDatabase()
new IndexWebsite()