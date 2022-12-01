const rootUrl = "http://176.119.159.133:8000"
// const rootUrl = "http://localhost:8000"

export default {
    xlsxRequests: `${rootUrl}/xlsx_requests`,
    foodRequest: foodName => `${rootUrl}/xlsx/${foodName}`,
    downloadLink: filename => `${rootUrl}/static/${filename}`
}
