import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)

let locale1="ru";

let i18n = new VueI18n({
    locale:  locale1,
    messages,
})
locale.i18n((key, value) => i18n.t(key, value)) //兼容element

export default i18n