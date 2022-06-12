import {hash} from 'bcrypt'
import models from '../index.database'
import UserModelType from '../../types/models/user.modelType'

export default class UserHandler {

    async createNew(name: string, password: string): Promise<UserModelType | false> {

        if (await models.get('users')?.findOne({name})) {

            return false

        }

        const hashPassword = await hash(password, 10)

        const dateToInsert: UserModelType = {
            id: await models.get('users')?.count() || 0,
            name,
            password: hashPassword,
            permissions: [],
            createdAt: new Date(),
            modifiedAt: new Date()
        }

        models.get('users')?.insertMany([dateToInsert])

        return dateToInsert

    }

}