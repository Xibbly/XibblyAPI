export type PermissionsType = '*' | 'unlimited_tokens' | 'admin_panel' | 'view_users' | 'manage_users' | 'view_tokens' | 'manage_tokens' | 'premium'

export default interface UserType {
    id: number
    name: string
    password: string
    permissions: PermissionsType[]
    createdAt: Date
    modifiedAt: Date
    deleted: boolean
    ip: string
}