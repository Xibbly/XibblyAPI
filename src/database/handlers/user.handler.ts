import {hash, compare} from 'bcrypt'
import models from '../index.database'
import UserModelType from '../../types/models/user.modelType'

export default class UserHandler {

    async login(name: string, password: string): Promise<Omit<UserModelType, 'password' | 'ip'> | false> {
        const data = await models.get('users')?.findOne({name})

        if (!data || await compare(data.password, password)) {
            return false
        }

        const dateFix: any = {
            id: data.id,
            name,
            permissions: data.permissions,
            createdAt: data.createdAt,
            modifiedAt: data.modifiedAt,
        }
        return dateFix
    }

    async createNew(name: string, password: string, ip: string): Promise<Omit<UserModelType, 'password' | 'ip'> | false> {

        if (await models.get('users')?.findOne({name})) {

            return false

        }

        const hashPassword = await hash(password, 10)

        const dateToInsert: any = {
            id: await models.get('users')?.count()! + 1,
            name,
            password: hashPassword,
            permissions: [],
            createdAt: new Date(),
            modifiedAt: new Date(),
            ip: ip
        }

        await models.get('users')?.insertMany([dateToInsert])

        delete dateToInsert.password
        delete dateToInsert.ip

        console.log(dateToInsert)
        return dateToInsert

    }

}
