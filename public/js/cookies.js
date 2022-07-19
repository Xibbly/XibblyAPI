class Cookies {

    close() {

        document.getElementById('cookies').style.display = 'none'
        localStorage.setItem('cookiesClosed', 'true')
        document.getElementById('title').classList.remove('blur')
        document.getElementById('content').classList.remove('blur')

    }

    check() {
        if (localStorage.getItem('cookiesClosed') === 'true') {
            document.getElementById('cookies').style.display = 'none'
        } else {
            document.getElementById('cookies').style.display = 'block'
            document.getElementById('title').classList.add('blur')
            document.getElementById('content').classList.add('blur')
        }
    }

}

new Cookies().check()