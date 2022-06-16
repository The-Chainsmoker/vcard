import ajax from "./request"

// 获取加密报文
export const getValidServlet = (data) => {
    return ajax({
        url: "/vcard/pwd/ValidServlet",
        method: "post",
        data: data
    })
}
export const getPasswordServlet = (data) => {
    return ajax({
        url: "/vcard/pwd/PasswordServlet",
        method: "post",
        data: data
    })
}
export const reqFn = (data) => {
    return ajax({
        url: "",
        method: "post",
        data: data
    })
}
export const sendMs = (data) => {
    return ajax({
        'url': "",
        'method': "post",
        'data': data
    })
}


// --------

//进行统一导出
export default {
    sendMs,
    reqFn,
    getValidServlet,
    getPasswordServlet
}