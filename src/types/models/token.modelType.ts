export type PermissionsType = '*'

export default interface TokenModelType {
    userId: number
    token: string
    permissions?: PermissionsType[]
    createdAt: Date | string
    modifiedAt: Date | string
}