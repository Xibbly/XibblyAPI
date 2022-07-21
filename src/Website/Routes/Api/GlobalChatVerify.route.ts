import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatVerifyType} from '../../../Types/Api/GlobalChat.type'
import GlobalChatAddHandler from '../../../Database/Handlers/GlobalChatAdd.handler'
import LogsUtil from '../../../Utils/Logs.util'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/verify'

        this.methods.push({

            method: 'post',
            async run(req): Promise<RouteOutput> {

                const data: Omit<GlobalChatVerifyType, 'verifiedAt'> = req.body

                if (!data.token || !data.channelId || !data.moderatorId)
                    return {

                        error: {

                            code: 400,
                            message: 'Missing parameters'

                        }

                    }

                if (!Number(data.channelId) || data.channelId.length != 18 || !Number(data.moderatorId) || data.moderatorId.length != 18)
                    return {

                        error: {

                            code: 400,
                            message: 'Invalid data provided'

                        }

                    }

                if (process.env.GLOBALCHAT_TOKEN != data.token)
                    return {

                        error: {

                            code: 401,
                            message: 'Invaild token'

                        }

                    }

                if (!await new GlobalChatAddHandler().get(data.channelId))
                    return {

                        error: {

                            code: 404,
                            message: 'Guild is not waiting for verification'

                        }

                    }

                

                return {

                    success: {

                        message: 'Guild is now waiting for verification'

                    }

                }

            }

        })

    }

}