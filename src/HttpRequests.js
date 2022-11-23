export function get(url, onSuccess = () => {}, onFailure = () => {}) {
    const xhr = new XMLHttpRequest()
    console.log("prev method!!")
    xhr.open("GET", url, true)
    xhr.send()
    xhr.onload = function () {
        if (xhr.status == 200) {
            onSuccess(parseResponse(xhr.responseText))
        } else {
            onFailure && onFailure()
        }
    }
}

export function post(url, body, onSuccess, onFailure) {
    const onSuccessCallback = onSuccess == null ? () => {} : onSuccess

    const xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccessCallback(parseResponse(xhr.responseText))
        } else {
            onFailure && onFailure(parseResponse(xhr.responseText))
        }
    }
}

export function postWithoutAuth(url, body, onSuccess, onFailure) {
    const onSuccessCallback = onSuccess == null ? () => {} : onSuccess
    const onFailureCallback = onFailure == null ? () => {} : onFailure

    const xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccessCallback(parseResponse(xhr.responseText))
        } else {
            onFailureCallback()
        }
    }
}

export function patch(url, body, onSuccess, onFailure) {
    const xhr = new XMLHttpRequest()
    xhr.open("PATCH", url, true)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))

    xhr.onload = function () {
        if (xhr.status === 200) {
            onSuccess && onSuccess(parseResponse(xhr.responseText))
        } else {
            onFailure && onFailure()
        }
    }
}

function parseResponse(rs) {
    try {
        return JSON.parse(rs)
    } catch (ignored) {
        return {}
    }
}