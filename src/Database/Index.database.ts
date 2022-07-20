import {connect as mongooseConnect, Model, model} from 'mongoose'
import {readdirSync} from 'fs'
import ModelType from '../types/Database/Model.type'
import LogsUtil from '../Utils/Logs.util'

const models = new Map<string, Model<any>>()

export class IndexDatabase {

    constructor() {

        this.connect()
        this.handler()

    }

    private connect(): void {

        mongooseConnect(process.env.DATABASE_URL as string).then(() => {
            new LogsUtil().sendLog('green', 'Connected to the database!')
        })

    }

    private handler(): void {

        readdirSync(`${__dirname}/models`).filter((fileName: string) => fileName.endsWith('.model.js') && !fileName.startsWith('--')).forEach((modelName: string) => {

            const modelObject: ModelType = require(`${__dirname}/models/${modelName}`).data
            const MODEL = model(modelObject.name, modelObject.schema)
            models.set(modelObject.name, MODEL)

        })

    }

}

export default models