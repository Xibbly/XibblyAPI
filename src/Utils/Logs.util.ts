import chalk from 'chalk'
import DateUtil from './Date.util'

export default class LogsUtil {

    public sendLog(type: 'green' | 'blue' | 'red', message: string): void {
        console.log(chalk[type](`[${new DateUtil().format(new Date())}] ${message}`))
    }

    public async sendDiscord(type: 'public' | 'private'): Promise<void> {

        //send to discord

    }

}