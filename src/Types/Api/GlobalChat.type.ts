export interface GlobalChatAddType {

    token: string
    webhookUrl: string
    channelId: string
    inviteUrl: string
    addedAt: Date

}

export interface GlobalChatVerifyType {

    token: string
    moderatorId: string
    channelId: string
    webhookUrl: string
    inviteUrl: string
    addedAt: Date
    verifiedAt: Date

}

export interface GlobalChatVerifyPostType {

    token: string
    moderatorId: string
    channelId: string

}

export interface GlobalChatMutePostType {

    token: string
    userId: string
    moderatorId: string
    reason: string
    time?: string
    permament?: boolean

}

export interface GlobalChatMuteType {

    userId: string
    moderatorId: string
    reason: string
    expiriedAt?: number
    permament?: boolean

}

export interface GlobalChatDeltePostType {

    token: string
    moderatorId: string
    reason: string
    channelId: string

}

export interface GlobalChatVerifyDiscardType {

    token: string
    moderatorId: string
    channelId: string
    reason: string

}

export interface GlobalChatUserType {

    userId: string
    customId: string
    moderator: boolean

}

export interface GlobalChatSendType {

    token: string
    channelId: string
    userId: string
    userTag: string
    avatar_url: string
    content?: string
    files?: string[]

}