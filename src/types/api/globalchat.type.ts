export default interface GlobalChatApiType {
    token: string
    userId: string
    tag: string
    avatarUrl: string
    guildId: string
    content: string
    filesUrl: string[]
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