import {config as dotenvConfig} from 'dotenv'
import IndexWebsite from './Website/Index.website'

dotenvConfig()

export class Index {

  constructor() {

    new IndexWebsite()

  }

}

new Index()