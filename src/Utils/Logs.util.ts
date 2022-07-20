import chalk from 'chalk'
import axios from 'axios'
import DateUtil from './Date.util'
import WebhookType from '../Types/Utils/LogsUtil.type'

export default class LogsUtil {

    public sendLog(type: 'red' | 'green' | 'blue', message: string): void {

        console.log(chalk[type](`[${new DateUtil().format(new Date())}] ${message}`))

    }

    public async sendDiscord(type: 'public' | 'private' | 'verification', webhookData: WebhookType): Promise<void> {

        let webhookUrl
        if (type === 'public')
            webhookUrl = process.env.PUBLIC_LOGS_WEBHOOK_URL
        else if (type === 'private')
            webhookUrl = process.env.PRIVATE_LOGS_WEBHOOK_URL
        else if (type === 'verification')
            webhookUrl = process.env.VERIFICATION_WEBHOOK_URL

        return await axios.post(process.env.WEBHOOK_API_URL as string, {
            token: process.env.WEBHOOK_API_TOKEN,
            webhookUrl,
            webhookData
        })

    }

}