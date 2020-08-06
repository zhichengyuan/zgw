<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getStoreInfo, getRuname } from "@/api/apis";
// import { getUser } from "@/api/apis1";
export default {
  name: 'App',
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      // reload: this.reload,
      loadCartList:  this.loadCartList
    };
  },
  data(){
    return{

    }
  },
  methods:{
    loadCartList() {
      if (localStorage.getItem("token")) {
        //已经登陆
        this.$request.getCart().then(res => {
          if (res.code == 0) {
             this.$store.commit("loadCartList", res.data.items);
            //补充本地的
            let listBuff = [];
            let str = localStorage.getItem("cartlist");
            if (str != null) {
              listBuff = JSON.parse(str);
              localStorage.removeItem("cartlist");
              listBuff.forEach(el => {
                 el.userId = this.$store.state.userId;
                 this.$store.commit("clearCart",el);
                 this.$request.saveCart(el).then(res => {
                  if (res.code == 0) {
                     this.$store.commit("addCart", res.data);
                  }
                });
              });
            }
          }
        });
      } else {
        let listBuff = [];
        let str = localStorage.getItem("cartlist");
        if (str != null) listBuff = JSON.parse(str);
         this.$store.commit("loadCartList", listBuff);
      }
    },
    // 获取商品俄语语言包
    getRu() {
      this.$request.getRuname().then(res => {
        // console.log(res)
        if (res.code == 0) {
          if (res.data == null) {
            return; //whm
          }
          res.data.forEach((item, index) => {
            this.$lang[item.name] = item.ru;
          });
        }
      });
    },
   
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return "";
    },
    updateStoreInf() {
      this.$request.getStoreInfo().then(res => {
        // console.log(res)
        if (res.code == 0) {
          let storeinfo = {
            address: res.data.storeAddress,
            tel: res.data.storeTel,
            shopName:res.data.sid
          };
          // console.log(res);
          this.$store.commit("setStoreInfo", storeinfo);
          this.$store.commit("setActivitys", res.data.desc); 
          this.$store.commit("setSwiperList", res.data.adds);
        }

        // console.log(storeinfo);

        // // localStorage.setItem('perInfo', JSON.stringify(storeinfo))
        // this.$store.commit("setStoreInfo", storeinfo);
      });
      this.$request.getUser().then(res => {
        if (res.code == 0) {
          this.$store.commit("getUserName", res.data.username);
        }
      });
    },
    // 获取个人信息
    getUserInfo() {
      let token = localStorage.getItem("token");
      if (token) {
        this.$store.commit("setToken", token);
        this.$store.dispatch("syncUpdateUserInfo", token);
      }
    },

    getSid() { 
      let url = window.location.href; //获取当前url
      let hostname = window.location.hostname;
      let newsid = "";

      let oldsid = localStorage.getItem("sid");
      let hostisip = hostname.split(".").length > 3;

      if (
        hostisip ||
        hostname.substring(0, 3) == "www" ||
        hostname == "127.0.0.1" ||
        hostname == "localhost"
      ) {
        newsid = this.getQueryVariable("sid");
      } else {
        newsid = hostname.split(".")[0];
      }

      this.$store.commit("setSid", newsid);
      // console.log(newsid);

      if (newsid != "" && newsid != oldsid) {
        //待查询参数的 跳转一下 清除路径中的查询参数
        window.location.href = "/";
      }

      document.title =
        // localStorage.getItem("sid") + " " + this.$lang["高级商城"];
        localStorage.getItem("sid") + " " + '高级商城';
      // this.updateStoreInf();
    }
  },
  mounted() {
    // console.log(b);
    // console.log(getUser);
    
    this.getSid();
   
    this.$nextTick(() => {
    
      this.getUserInfo()
      this.loadCartList()
      this.getRu();
    });
  }
}
</script>

<style>
.mouse-cover-canvas {
 background: rgb(255, 255, 255);
  left: 734px!important;
  top: 280px!important;
}
.mouse-cover{
  width: 75px!important;
  height: 75px!important;
}
</style>
