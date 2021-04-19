// store/index.js
// import _this from "@/main.js"
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/apis'
Vue.use(Vuex)
    // 引入本地存储的方法
export default new Vuex.Store({

    state: {
        orderBuffer: {},
        token: localStorage.getItem('token'),
        //购物车数据储存
        cartList: [],
        username:JSON.parse(localStorage.getItem('username')) ||"",
        userId:"",
        emid:'',
        nickname: "",
        getrole:[],
        integral:1000,
        // cartNumber: localStorage.getItem('cartNum') || 0,
        storeinfo:JSON.parse(localStorage.getItem('storeInfo'))|| {},
        userInfo: {},
        activitys: [],
        swiperList: [],
        // getAddress:JSON.parse(localStorage.getItem('setAddress'))||null,
        sid: localStorage.getItem("sid"),
        domain:'',
      
    },
    mutations: {
   
    
        setDomain(state,payload) {
            state.domain = payload
        },
      
       
      


    },
    getters: {},

    actions: {

        setDomain({commit},payload) {
            commit("setDomain", payload);
        },
        
        

    },
    modules: {}
});