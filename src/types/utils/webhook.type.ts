export interface embed {
    title?: string
    type?: string
    description?: string
    url?: string
    timestamp?: string
    color?: number | string
    footer?: {
        text: string
        icon_url?: string
        proxy_icon_url?: string
    }
    image?: {
        url: string
        proxy_url?: string
        height?: number
        width?: number
    }
    thumbnail?: {
        url: string
        proxy_url?: string
        height?: number
        width?: number
    }
    video?: {
        url: string
        proxy_url?: string
        height?: number
        width?: number
    }
    provider?: {
        name: string
        url: string
    }
    author?: {
        name: string
        url?: string
        icon_url?: string
        proxy_icon_url?: string
    }
    fields?: {
        name: string
        value: string
        inline?: boolean
    }[]
}

export interface allowed_mentions {
    parse?: ('roles' | 'users' | 'everyone')[]
    roles?: string[]
    users?: string[]
    repiled_users?: boolean
}

// export interface component {
//     type: 1 | 2 | 3 | 4
//     components: {
//
//     }[]
// }

export interface attachment {
    id: string
    filename: string
    description?: string
    content_type?: string
    size: number
    url: string
    proxy_url: string
    height?: number
    width?: number
    ephemeral?: boolean
}

export default interface WebhookType {
    content?: string
    username?: string
    avatar_url?: string
    tts?: boolean
    embeds?: embed[]
    allowed_mentions?: allowed_mentions
    // components: component[]
    files?: string[]
    payload_json?: string
    attachments?: attachment[]
    flags?: number
    thread_name?: string
}

export interface postWebhookType {
    token: string
    webhookUrl: string
    data: WebhookType
}