import axios from "axios"

axios.defaults.baseURL = "https://registry.npmjs.com/-/v1"

const instance = axios.create()

export default instance