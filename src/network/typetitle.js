import { request } from './axios'

// 类别及菜单栏接口
//菜单栏接口
export function getmenus() {
    return request({
        url: '/menus'
    })
}
//类别接口
//获取全部类别
export function gettitle1() {
    return request({
        url: '/title',
    })
}
//获取分页后的部分类别
export function gettitle2(content) {
    return request({
        url: '/title',
        params: {
            'size': content.size,
            'page': content.page
        }
    })
}


//添加类
export function add(content) {
    return request({
        method: 'post',
        url: 'title/',
        params: {
            'demo_name': content.cat_name,
            'pid': content.cat_pid,
            'level': content.cat_level
        }
    })

}


//删除一个类及其它的子类
export function dele(int) {
    return request({
        method: 'delete',
        url: 'title/',
        params: {
            'id': int
        }
    })
}

//修改类名
export function edit(content) {
    return request({
        method: 'put',
        url: 'title/',
        params: {
            'id': content.id,
            'demo_name': content.demo_name
        }
    })
}