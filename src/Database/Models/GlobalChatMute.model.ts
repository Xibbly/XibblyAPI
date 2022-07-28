import DatabaseType from '../../types/Database/Model.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {

    name: 'globalchatmutes',
    schema: new Schema({

        userId: {

            type: String,
            required: true,
            unique: true

        },

        moderatorId: {

            type: String,
            required: true

        },

        reason: {

            type: String,
            required: true

        },

        expiriedAt: {

            type: Number

        },

        permament: {

            type: Boolean,
            default: true

        }

    })

}