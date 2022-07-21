import DatabaseType from '../../types/Database/Model.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {

    name: 'tokens',
    schema: new Schema({

        userId: {

            type: String,
            required: true

        },

        token: {

            type: String,
            required: true,
            unique: true

        }

    })

}