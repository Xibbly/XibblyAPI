import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'globalchatMute',

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

        mutedAt: {
            type: Number,
            required: true
        },

        expiriedAt: {
            type: Number,
            required: false
        },

        permament: {
            type: Boolean,
            default: true
        }

    })
}