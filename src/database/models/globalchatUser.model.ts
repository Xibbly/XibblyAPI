import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'globalchatUser',

    schema: new Schema({

        userId: {
            type: String,
            required: true,
            unique: true
        },

        moderator: {
            type: Boolean,
            default: false
        },

        gcid: {
            type: String,
            required: true
        }

    })
}