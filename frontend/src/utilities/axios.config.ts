import _axios from 'axios'

const axios = _axios.create()

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

export function getAxios(){
    return axios
}