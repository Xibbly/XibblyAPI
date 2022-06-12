import {Schema} from 'mongoose'

export default interface DatabaseType {
    name: string
    schema: Schema
}