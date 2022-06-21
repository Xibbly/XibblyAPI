import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'tokens',
    schema: new Schema({

        userId: {
            type: Number,
            required: true
        },

        token: {
            type: String,
            required: true,
            unique: true
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
        }

    })
}