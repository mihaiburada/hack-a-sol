import axios from '../utils/axios'

export const getPanels = () => {
    return axios.get("/panels").then(res => res.data)
}