import axios from "./request"

// 获取加密报文
export const getValidServlet = (data) => {
    return axios({
        url: "/vcard/pwd/ValidServlet",
        method: "post",
        data: data
    })
}
export const getPasswordServlet = (data) => {
    return axios({
        url: "/vcard/pwd/PasswordServlet",
        method: "post",
        data: data
    })
}
export const reqFn = (data) => {
    return axios({
        url: "",
        method: "post",
        data: data
    })
}
export const sendMs = (data) => {
    return axios({
        url: "",
        method: "post",
        data: data
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