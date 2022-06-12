import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'users',
    schema: new Schema({

        userID: {
            type: Number,
            required: true,
            unique: true
        }

    })
}