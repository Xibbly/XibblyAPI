export default class StringUtil {

    replaceMessageGC(message: string): string {
        return message.replace(/(@everyone|@here|<(@|@!)\d+>)/g, `(wzmianka)`).replace(/(@everyone|@here|<@&\d+>)/g, `(wzmianka)`).replace(/(discord.gg|discord.com\/invite|link.do+\/)/g, `(zaproszenie)`)
    }

}