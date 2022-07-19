import dayjs from 'dayjs'
import ms from 'ms'

export default class DateUtil {

    public format(date: Date): string {

        return dayjs(date).locale('pl-PL').format('DD.MM.YYYY HH:mm:ss')

    }

    public dateToUnix(date: Date): number {
        return dayjs(date).unix()
    }

    public unixToDate(unix: number): Date {
        return new Date(unix * 1000)
    }

    public add(howLong: string): number {
        const fixedDate = dayjs().add(ms(howLong)).unix()
        if (fixedDate < dayjs().unix() || isNaN(fixedDate))
            return -1
        return fixedDate

    }

}