export default interface GlobalchatUserType {
    userId: string
    moderator: boolean
    gcid: string
}

export interface GlobalchatUserMutePostType {
    token: string
    userId: string
    moderatorId: string
    reason: string
    expiriedAt?: string
    permament: boolean
}

export interface GlobalchatUserMuteType {
    userId: string
    moderatorId: string
    reason: string
    mutedAt: number
    expiriedAt?: number
    permament: boolean
}