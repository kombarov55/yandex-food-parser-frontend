export default {
    get: (name) => {
        const cookieStr = document.cookie
        const cookiesArr = cookieStr.split(";")
        const cookie = cookiesArr.find(v => v.startsWith(name))
        return cookie && cookie.split("=")[1]
    },
    set: (name, value) => {
        document.cookie = `${name}=${value}`
    }
}