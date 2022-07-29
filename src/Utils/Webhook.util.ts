import axios from 'axios'

export default class WebhookUtil {

    public async get(webhookUrl: string): Promise<any> {

        try {
            const res = await axios.post(`${process.env.WEBHOOK_API_URL}check`, {
                token: process.env.WEBHOOK_API_TOKEN,
                webhookUrl
            })
            return res.data
        } catch (e) {
            return false
        }

    }

    public async check(webhookUrl: string): Promise<boolean> {

        try {
            const res = await axios.post(`${process.env.WEBHOOK_API_URL}check`, {
                token: process.env.WEBHOOK_API_TOKEN,
                webhookUrl
            })
            return !!res.data.token.length
        } catch (e) {
            return false
        }

    }

    public async send(webhookUrl: string, webhookData: any): Promise<boolean> {

        try {
            const res = await axios.post(`${process.env.WEBHOOK_API_URL}`, {
                token: process.env.WEBHOOK_API_TOKEN,
                webhookUrl,
                webhookData
            })
            return res.status == 200
        } catch (e) {
            return false
        }

    }

}