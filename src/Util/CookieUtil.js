export default {
    get: (name) => get(name),
    set: (name, value) => set(name, value),
    remove: (name) => set(name, ""),
    exists: (name) => get(name) != ""
}

function get(name) {
    const cookieStr = document.cookie
    const cookiesArr = cookieStr.split(";")
    const cookie = cookiesArr.find(v => v.startsWith(name))
    return cookie && cookie.split("=")[1]
}

function set(name, value) {
    document.cookie = `${name}=${value}`
}