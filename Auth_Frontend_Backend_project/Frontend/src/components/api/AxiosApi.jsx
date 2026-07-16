import axios from "axios"

const AxiosApi = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials : true
})

export default AxiosApi