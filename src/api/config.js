let development = "http://www.shopvill.com/api";
// let development = "http://154.8.173.206:777";
let production = "http://www.shopvill.com/api";

export default {
    baseURL: process.env.NODE_ENV === 'production' ? production : development,
    timemout: 30,
    headers: {},
    ImgUrlPath: production + "/avatar/img?id="
};