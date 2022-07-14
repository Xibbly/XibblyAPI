import dayjs from 'dayjs'

export default class DateUtil {

    public formatDate(date: Date): string {

        return dayjs(date).locale('pl-PL').format('DD.MM.YYYY HH:mm:ss')

    }

}