import {connect as mongooseConnect, Model, model} from 'mongoose'
import {readdirSync} from 'fs'
import DatabaseType from '../types/database.type'

const models = new Map<string, Model<any>>();

export class IndexDatabase {

    constructor() {

        this.connect()
        this.handler()

    }

    private connect(): void {

        mongooseConnect(process.env.DATABASE_URL as string).then(() => {
            console.log('Connected to the database!')
        })

    }

    private handler(): void {

        readdirSync(`${__dirname}/models`).filter((fileName: string) => fileName.endsWith('.model.js') && !fileName.startsWith('--')).forEach((modelName: string) => {

            const modelObject: DatabaseType = require(`${__dirname}/models/${modelName}`).data
            const MODEL = model(modelObject.name, modelObject.schema)
            models.set(modelObject.name, MODEL)

        })

    }

}

export default models