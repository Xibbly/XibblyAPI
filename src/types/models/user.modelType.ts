export type PermissionsType = '*' | 'admin_panel' | 'view_users' | 'manage_users' | 'view_tokens' | 'manage_tokens'

export default interface UserModelType {
    id: number
    name: string
    password: string
    permissions: PermissionsType[]
    createdAt: Date
    modifiedAt: Date
    deleted: boolean
    ip: string
}