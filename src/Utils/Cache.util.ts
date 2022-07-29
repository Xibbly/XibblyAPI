import {Permissions} from '../Types/Database/User.type'
import UserHandler from '../Database/Handlers/User.handler'

const PermissionsCache = new Map<string, Permissions[]>()
export default PermissionsCache

export class CacheUtil {

    public async setup() {

        const users = await new UserHandler().getAll()
        for (const user of users) {

            PermissionsCache.set(user.userId, user.permissions)

        }

    }

}