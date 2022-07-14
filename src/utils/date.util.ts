import dayjs from 'dayjs'

export default class DateUtil {

    public async formatDate(date: Date): Promise<string> {

        return dayjs(date).locale('pl-PL').format('DD.MM.YYYY HH:mm:ss')

    }

}