import dayjs from 'dayjs'
import ms from 'ms'

export default class DateUtil {

    public formatDate(date: Date): string {

        return dayjs(date).locale('pl-PL').format('DD.MM.YYYY HH:mm:ss')

    }

    public getDateUnix(date: Date): number {
        return dayjs(date).unix()
    }

    public unixToDate(unix: number): Date {
        return new Date(unix * 1000)
    }

    public addToDate(howLong: string): number {
        const fixedDate = dayjs().add(ms(howLong)).unix()
        if (fixedDate < dayjs().unix() || isNaN(fixedDate))
            return -1
        return fixedDate

    }

}