import DatabaseType from '../../types/Database/Model.type'
import {Schema} from 'mongoose'

export const data: DatabaseType = {

    name: 'globalchatadds',
    schema: new Schema({

        token: {

            type: String,
            required: true

        },

        webhookUrl: {

            type: String,
            required: true,
            unique: true

        },

        channelId: {

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

        }

    })

}