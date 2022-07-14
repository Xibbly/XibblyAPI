import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'globalchatAdd',

    schema: new Schema({

        token: {
            type: String,
            required: true
        },

        guildID: {
            type: String,
            required: true,
            unique: true
        },

        inviteUrl: {
            type: String,
            required: true,
            unique: true
        },

        webhookUrl: {
            type: String,
            required: true,
            unique: true
        },

        addDate: {
            type: String,
            required: true
        }

    })
}