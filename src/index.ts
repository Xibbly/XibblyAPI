import {config as dotenvConfig} from 'dotenv'
import IndexExpress from './website/index.express'

dotenvConfig()

new IndexExpress()