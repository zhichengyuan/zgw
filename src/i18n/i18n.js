import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)

let locale1="";
var curlang = ""
var apptype = navigator.appName
if(apptype = "Netscape"){
    curlang = navigator.language
}else{
    curlang = navigator.userLanguage
}
if (curlang != "zh-cn" && curlang != "zh-CN") {
    curlang = "ru"
}
locale1 = curlang
console.log(locale1)
let i18n = new VueI18n({
    locale:  locale1 == "ru"?"ru":"cn",
    messages,
})
locale.i18n((key, value) => i18n.t(key, value)) //兼容element

export default i18n