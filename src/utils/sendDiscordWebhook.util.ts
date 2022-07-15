import WebhookType from '../types/utils/webhook.type'
import axios, {AxiosResponse} from 'axios'

export default class SendDiscordWebhookUtil {

    public async sendToPublicLogs(webhookData: WebhookType) {
    }

    public async sendToLogs(webhookData: WebhookType) {
    }

    public async sendVerificatedAnnouncement(guildID: string): Promise<void> {
        await this.send(process.env.VERIFICATION_WEBHOOK_URL as string, {
            embeds: [{
                author: {
                    name: '🌐 | System weryfikacji czatu globalnego!'
                },
                description: `Serwer o ID \`${guildID}\` został zweryfikowany!`,
            }]
        })

        await this.send(process.env.VERIFICATION_WEBHOOK_URL as string, {
            embeds: [{
                author: {
                    name: '🌐 | System weryfikacji czatu globalnego!'
                },
                description: `Serwer o ID \`${guildID}\` został zweryfikowany!`,
            }]
        })
    }

    public async sendToVerification(guildID: string, inviteUrl: string): Promise<void> {
        const fixedInviteUrl = inviteUrl.startsWith('https://discord.gg/') ? inviteUrl : `https://${inviteUrl}`

        await this.send(process.env.VERIFICATION_WEBHOOK_URL as string, {
            content: guildID,
            embeds: [{
                author: {
                    name: '🌐 | System weryfikacji czatu globalnego!'
                },
                description: `ID serwera: \`${guildID}\`\nLink do serwera: ${fixedInviteUrl}`,
            }]
        })
    }

    public async sendToError(error: string) {
    }

    private async send(webhookUrl: string, webhookData: WebhookType): Promise<AxiosResponse<any, any>> {
        return await axios.post(process.env.WEBHOOK_API_URL as string, {
            token: process.env.WEBHOOK_API_TOKEN,
            webhookUrl,
            webhookData
        })
    }

}