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
      console.log(variable,"vvvv")
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      console.log(query,vars,"hhhh")
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
        if (res.code == 0) {
          let storeinfo = {
            address: res.data.storeAddress,
            tel: res.data.storeTel,
            shopName:res.data.sid
          };
          this.$store.commit("setStoreInfo", storeinfo);
          this.$store.commit("setActivitys", res.data.desc); 
          this.$store.commit("setSwiperList", res.data.adds);
        }

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
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    //获取域名后缀
    getDomain(){
      //获取域名
      let  host = window.location.host;
      let host2=document.domain;
      // let host3 = 'http://www.shopvill.tm';
      //获取页面完整地址
      console.log("aaa")
      let url = window.location.href;
      var array = host2.split(".");
      let domain = '';
      if(array[2]) {
        domain = array[2]
      }
      this.$store.dispatch("setDomain",domain);
    },
    getSid() { 
      let url = window.location.href; //获取当前url
      let hostname = window.location.hostname;
      let newsid = "";
     
      let oldsid = localStorage.getItem("sid");
      let hostisip = hostname.split(".").length > 3;
      let emid = this.getQueryVariable("emid");
      localStorage.setItem("emid", emid);
     
      if (
        hostisip ||
        hostname.substring(0, 3) == "www" ||
        hostname == "127.0.0.1" ||
        hostname == "localhost"
      ) {
        
        newsid = this.getQueryVariable("sid");
        //  console.log('wowowowowowo',newsid)
      } else {
        
        newsid = hostname.split(".")[0];
      }
      
      this.$store.commit("setSid", newsid);
      if(newsid == '') {
        
        this.$router.replace({path:'/shopvill'}) 
      }
      // if((newsid == '' && oldsid == 'shopvill') || oldsid == null) {
      //   console.log("走到这第二个")
      //   this.$router.replace({path:'/shopvill'}) 
      // }
     
      
      if (newsid != "" && newsid != oldsid) {
        this.$router.replace({path:'/'})
        // console.log('什么鬼',newsid,oldsid);
        
        // //待查询参数的 跳转一下 清除路径中的查询参数
        // window.location.href = "/";
      }
     

      if(localStorage.getItem('sid') == null) {
        document.title = this.$t('message.高级商城');
      }else {
        document.title = localStorage.getItem("sid") + " " + this.$t('message.高级商城');
      }
        this.updateStoreInf();
    }
  },
  mounted() {
    let flag = this._isMobile()
    this.getDomain();
    this.getSid();
    if (flag != null) {
      if(localStorage.getItem("sid") == 'shopvill' || localStorage.getItem("sid")== '' || localStorage.getItem("sid") == null){
        window.location.href = "/";
        return
      }
      window.location.href = "/?sid=" + localStorage.getItem("sid");
      return
    }
    
    
   
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
      left: 730px!important;
      top: 180px!important;
    }

.mouse-cover{
  /* width: 75px!important;
  height: 75px!important; */
}
span,h1,h2,h3,h4,h5,h6,a{
  font-family: system,-apple-system,BlinkMacSystemFont,'Segoe UI','Segoe WP',Roboto,Ubuntu,Oxygen,Cantarell,'Fira Sans','Helvetica Neue',Helvetica,'Lucida Grande','Droid Sans',Tahoma,'Microsoft Sans Serif',sans-serif;
}
</style>
