export default interface UserModelType {
    id: number
    name: string
    password: string
    permissions: string[]
    createdAt: Date
    modifiedAt: Date
    deleted: boolean
    ip: string
}