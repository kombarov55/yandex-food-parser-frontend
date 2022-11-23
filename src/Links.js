// const rootUrl = "https://5be0-95-32-142-166.eu.ngrok.io"
const rootUrl = "http://localhost:8000"

export default {
    xlsxRequests: `${rootUrl}/xlsx_requests`,
    downloadLink: filename => `${rootUrl}/static/${filename}`
}