import arequest from "./request";
// import config from "./config"


// 获取用户信息 1
let getUser = () => {
    return arequest.create({
        url: "user/info",
        method: "post",
        data: {}
    })
}






export {
    getUser
};