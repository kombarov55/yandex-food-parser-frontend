const rootUrl = "https://novemis.ru:8000"
// const rootUrl = "http://localhost:8000"


export default {
    xlsxRequests: `${rootUrl}/xlsx_requests`,
    foodRequest: foodName => `${rootUrl}/xlsx/${foodName}`,
    downloadLink: filename => `${rootUrl}/static/${filename}`,
    register: `${rootUrl}/account`,
    login: `${rootUrl}/account/login`,
    restorePassword: email => `${rootUrl}/account/restore_pwd/${email}`,
    searchFood: (foodName, amount, email) => `${rootUrl}/search_food/${foodName}/${amount}/${email}`,
    addCompilationItem: (foodId, email) => `${rootUrl}/account/${email}/compilation/${foodId}`,
    removeCompilationItem: (foodId, email, name = "Избранное") => `${rootUrl}/account/${email}/compilation/${name}/${foodId}`,
    getAllCompilations: (email) => `${rootUrl}/account/${email}/compilation`,
    moveCompilationItem: (foodId, email, name, prevName) => `${rootUrl}/account/${email}/compilation/${name}/${foodId}/${prevName}`,
    deleteCompilation: (email, name) => `${rootUrl}/account/${email}/compilation/${name}`,
}
