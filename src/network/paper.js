import { request } from './axios'

//题库接口

//添加试卷(根据班级获取题)
export function addpaper(content) {
    return request({
        method: 'post',
        url: 'apper/',
        params: content
    })
}

//获取所有试卷
export function getpaper(content) {
    console.log(content)
    return request({
        method: 'get',
        url: 'apper/',
        params: content
    })
}