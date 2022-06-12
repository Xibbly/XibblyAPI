import {config as dotenvConfig} from 'dotenv'
import IndexWebsite from './website/index.website'

dotenvConfig()

new IndexWebsite()