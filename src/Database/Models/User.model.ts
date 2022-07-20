import DatabaseType from '../../types/Database/Model.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {

    name: 'users',
    schema: new Schema({

        userId: {

            type: String,
            required: true,
            unique: true

        },

        permissions: {

            type: Array,
            required: true,
            default: []

        },

        createdAt: {

            type: Date,
            required: true,
            default: new Date()

        },

        deleted: {

            type: Boolean,
            default: false

        },

        ip: {

            type: String,
            required: true

        }

    })

}