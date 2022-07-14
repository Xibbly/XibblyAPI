import axios, {AxiosResponse} from 'axios'

export default class PostUtil {

    public async toDiscordWebhook(webhookUrl: string, webhookData: any): Promise<AxiosResponse<any, any>> {
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