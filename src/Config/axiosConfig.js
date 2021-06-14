import axios from 'axios';

const instance = axios.create({

    baseURL: 'https://theeducationalnetwork.herokuapp.com/api/'
});


export default instance;