class Cookies {

    close() {

        document.getElementById('cookies').style.display = 'none'
        localStorage.setItem('cookiesClosed', 'true')

    }

    check() {
        if (localStorage.getItem('cookiesClosed') === 'true') {
            document.getElementById('cookies').style.display = 'none'
        } else {
            document.getElementById('cookies').style.display = 'block'
        }
    }

}

new Cookies().check()