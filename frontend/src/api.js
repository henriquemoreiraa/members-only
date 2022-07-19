import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api'

export default axios.create({
    baseURL: `${url}`,
})