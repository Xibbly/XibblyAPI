import axios, {AxiosResponse} from 'axios'
import WebhookType from '../types/utils/webhook.type'

export default class PostUtil {

    public async toDiscordWebhook(webhookUrl: string, webhookData: WebhookType): Promise<AxiosResponse<any, any>> {
        return await axios.post(process.env.WEBHOOK_API_URL!, {
            token: process.env.WEBHOOK_API_TOKEN,
            webhookUrl,
            webhookData
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

}