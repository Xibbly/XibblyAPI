export type Permissions = '*' | 'unlimited_tokens' | 'admin_panel' | 'view_users' | 'manage_users' | 'view_tokens' | 'manage_tokens' | 'premium'

export default interface UserType {

    userId: string
    permissions: Permissions[]
    createdAt: Date
    deleted: boolean
    ip: string

}