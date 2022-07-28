import DatabaseType from '../../types/Database/Model.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {

    name: 'globalchatusers',
    schema: new Schema({

        userId: {

            type: String,
            required: true,
            unique: true

        },

        customId: {

            type: String,
            required: true,
            unique: true

        },

        moderator: {

            type: Boolean,
            default: false

        }

    })

}