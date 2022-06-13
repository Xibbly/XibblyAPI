import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'users',
    schema: new Schema({

        id: {
            type: Number,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
        },

        permissions: {
            type: Array,
            required: true
        },

        createdAt: {
            type: Date,
            required: true
        },

        modifiedAt: {
            type: Date,
            required: true
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