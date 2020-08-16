import axios from 'axios';

const instance = axios.create({
    baseURL : "http://localhost:3002/"
    
});

instance.interceptors.request.use ( (config) => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('authType');
    if(token){
        config.headers.Authorization = token;
        config.headers.AuthType = type;
    }
    return config;
} );

export default instance;