import { request } from './axios'

//题库接口

//获取题库(根据班级获取题)
export function gettitle(id) {
    return request({
        method: 'get',
        url: 'topic/',
        params: id
    })
}

//获取题库(根据题类型获取)
export function gettitleall(type) {
    return request({
        method: 'get',
        url: 'topic/',
        params: type
    })
}
//添加新题
export function addtitle(content) {
    console.log(content);
    return request({
        method: 'post',
        url: 'topic/',
        params: content
    })
}

//删除
export function dele(int) {
    return request({
        method: 'delete',
        url: 'topic/',
        params: {
            'id': int
        }
    })
}