export default interface GlobalChatApiType {
    token: string
    userId: string
    channelId: string
    tag: string
    avatar_url: string
    guildId: string
    content?: string
    files?: string[]
}

export interface GlobalChatApiAdd {
    token: string
    guildId: string
    channelId: string
    inviteUrl: string
    webhookUrl: string
    addDate: string
}

export interface GlobalChatApiVerify {
    token: string
    guildId: string
    channelId: string
    inviteUrl: string
    webhookUrl: string
    moderatorId: string
    addDate: string
    verifiedDate: string
}

export interface GlobalChatApiVerifyPost {
    token: string
    guildId: string
    moderatorId: string
}

export interface GlobalChatApiDelete {
    token: string
    guildId: string
    moderatorId: string
    reason: string
}