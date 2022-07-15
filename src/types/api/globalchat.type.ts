export default interface GlobalChatApiType {
    token: string
    userId: string
    tag: string
    avatar_url: string
    guildId: string
    content: string
    files: string[]
}

export interface GlobalChatApiAdd {
    token: string
    guildId: string
    inviteUrl: string
    webhookUrl: string
    addDate: string
}

export interface GlobalChatApiVerify {
    token: string
    guildId: string
    inviteUrl: string
    webhookUrl: string
    moderatorId: string
    verifiedDate: string
}

export interface GlobalChatApiVerifyPost {
    token: string
    guildId: string
    moderatorId: string
}