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