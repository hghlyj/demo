import axios from 'axios'
export function request(config) {
    const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/exam/',
            // timeout: 5000,
        })
        //     //拦截器
        // instance.interceptors.request.use(config => {
        //     console.log('开始请求')
        //     return config;
        // }, error => {
        //     return Promise.reject(error);
        // });

    // instance.interceptors.response.use(response => {
    //     console.log('响应成功')
    //     return response;
    // }, error => {
    //     return Promise.reject(error);
    // });
    return instance(config)
}