import {hash} from 'bcrypt'
import models from '../index.database'
import UserModelType from '../../types/models/user.modelType'

export default class UserHandler {

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
        return dateToInsert

    }

}
