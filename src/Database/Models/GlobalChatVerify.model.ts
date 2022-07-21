import DatabaseType from '../../types/Database/Model.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {

    name: 'globalchatsverifies',
    schema: new Schema({

        token: {

            type: String,
            required: true

        },

        moderatorId: {

            type: String,
            required: true

        },

        channelId: {

            type: String,
            required: true,
            unique: true

        },

        webhookUrl: {

            type: String,
            required: true,
            unique: true

        },

        inviteUrl: {

            type: String,
            required: true,
            unique: true

        },

        addedAt: {

            type: Date,
            required: true

        },

        verifiedAt: {

            type: Date,
            required: true

        }

    })

}