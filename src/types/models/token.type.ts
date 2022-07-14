export type PermissionsType = '*'

export default interface TokenType {
    userId: number
    token: string
    permissions?: PermissionsType[]
    createdAt: string
    modifiedAt: string
}