const rootUrl = "https://novemis.ru:8000"
// const rootUrl = "http://localhost:8000"


export default {
    xlsxRequests: `${rootUrl}/xlsx_requests`,
    foodRequest: foodName => `${rootUrl}/xlsx/${foodName}`,
    downloadLink: filename => `${rootUrl}/static/${filename}`,
    register: `${rootUrl}/account`,
    login: `${rootUrl}/account/login`,
    restorePassword: email => `${rootUrl}/account/restore_pwd/${email}`,
    searchFood: foodName => `${rootUrl}/search_food/${foodName}`
}

