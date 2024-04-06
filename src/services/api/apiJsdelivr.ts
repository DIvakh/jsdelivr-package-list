import axios from "axios"

axios.defaults.baseURL = "https://data.jsdelivr.com/v1"

const instance = axios.create()

export default instance