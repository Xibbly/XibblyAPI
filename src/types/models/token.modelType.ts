export type PermissionsType = ''

export default interface TokenModelType {
    userId: number
    token: string
    permissions?: PermissionsType[]
    createdAt: Date
    modifiedAt: Date
}