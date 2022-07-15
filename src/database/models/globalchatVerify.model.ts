import DatabaseType from '../../types/database.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {
    name: 'globalchatVerify',

    schema: new Schema({

        token: {
            type: String,
            required: true
        },

        guildId: {
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

        moderatorId: {
            type: String,
            required: true
        },

        addDate: {
            type: String,
            required: true
        },

        verifiedDate: {
            type: String,
            required: true
        }

    })
}