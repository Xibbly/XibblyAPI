import UserType from '../../Types/Database/User.type'
import models from '../Index.database'

export default class UserHandler {

    public async get(userId: string): Promise<UserType> {

        return (await models.get('users')?.findOne({userId})) as UserType

    }

    public async insert(userId: string, ip: string): Promise<UserType> {

        return await models.get('users')?.create({

            userId,
            ip

        }) as UserType

    }

}