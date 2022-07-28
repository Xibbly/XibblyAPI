import RouteType, {RouteOutput} from '../../../Types/Website/Route.type'
import {GlobalChatMutePostType} from '../../../Types/Api/GlobalChat.type'
import LogsUtil from '../../../Utils/Logs.util'
import GlobalChatUserHandler from '../../../Database/Handlers/GlobalChatUser.handler'
import DateUtil from '../../../Utils/Date.util'

export default class extends RouteType {

    constructor() {
        super()

        this.route = '/api/globalchat/mute'

        this.methods.push({

            method: 'post',
            async run(req): Promise<RouteOutput> {

                const data: GlobalChatMutePostType = req.body

                if (!data.token || !data.userId || !data.moderatorId || !data.reason || (!data.time && !data.permament))
                    return {
                        error: {
                            code: 400,
                            message: 'Missing parameters'
                        }
                    }

                if (!Number(data.userId) || data.userId.length != 18 || !Number(data.moderatorId) || data.moderatorId.length != 18)
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

                const userData = await new GlobalChatUserHandler().get(data.userId)
                if (!userData)
                    return {
                        error: {
                            code: 404,
                            message: 'User not found'
                        }
                    }

                if (await new GlobalChatUserHandler().getMute(data.userId))
                    return {
                        error: {
                            code: 400,
                            message: 'User is already muted'
                        }
                    }

                if ((process.env.DEV_IDS as string).split(',').includes(data.userId) || userData.moderator)
                    return {
                        error: {
                            code: 400,
                            message: 'You cannot mute this user'
                        }
                    }

                let expiriedAt = -1
                if (data.time) {
                    expiriedAt = new DateUtil().add(data.time as string)
                    if (expiriedAt == -1)
                        return {
                            error: {
                                code: 400,
                                message: 'Invalid time provided'
                            }
                        }

                    await new GlobalChatUserHandler().insertMute({
                        userId: data.userId,
                        moderatorId: data.moderatorId,
                        reason: data.reason,
                        expiriedAt,
                        permament: false
                    })
                } else {
                    await new GlobalChatUserHandler().insertMute({
                        userId: data.userId,
                        moderatorId: data.moderatorId,
                        reason: data.reason
                    })
                }


                await new LogsUtil().sendDiscord('public', {
                    embeds: [{
                        title: '👮‍♂️ | Czat globalny | Wyciszenie',
                        description: `ID użytkownika: \`${data.userId}\`(\`${userData.customId}\`)\nModerator: <@${data.moderatorId}>(\`${data.moderatorId}\`)\nPowód: \`${data.reason}\`\nCzas: \`${expiriedAt != -1 ? `${data.time}` : 'Nieokreślony'}\``,
                        color: '#ff0000'
                    }]
                })

                return {
                    success: {
                        message: 'User is now muted',
                        time: data.time,
                        permament: data.permament
                    }

                }

            }

        })

    }

}