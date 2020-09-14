<template>
  <div class="header-warpper">
    <div class="header">
      <el-row class="content">
        <el-col class="box logo" :span="3" >
          <!-- <img src="@/assets/imgs/logo.png" alt="" style="width:50px;height:50px;border-radius: 50%;cursor:pointer" @click="bindTabbar('home')"> -->
          <h2 style="font-size:32px;font-weight:700;color:#fff;margin-left:10px;cursor:pointer" @click="bindTabbar('home')">shopvill</h2>
        </el-col>
        <el-col class="box class icon" :span="2">
          <span v-if="!isShow" @click="bindTrigger"></span>
          <span class="fork" v-else @click="bindTrigger"></span>
        </el-col>
        <el-col class="box" :span="13">
          <el-input :placheholder="$t('message.请输入内容')" @input="searchChange" v-model.lazy="value">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col class="box class" :span="3">
          <el-dropdown class="tu-box" @command="handleCommand" trigger="click">
            <span class="person"></span>
            <!-- <span>{{$t("message.个人中心")}}</span> -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="tempOrder">{{$t("message.查看个人临时订单")}}</el-dropdown-item>
              <el-dropdown-item command="orderList">{{$t("message.查看个人订单")}}</el-dropdown-item>
              <el-dropdown-item command="myInfo">{{$t("message.个人中心")}}</el-dropdown-item>
              <el-dropdown-item v-if="!$store.state.token" command="my">{{$t("message.登录")}}    </el-dropdown-item>
              <el-dropdown-item v-if="$store.state.token" command="my">{{$t("message.退出登录")}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col class="box class" :span="2">
          <div class="tu-box" @click="bindTabbar('cart')">
            <span class="person cart">
              <div class="roundLogo">{{calcproductNumber}}</div>
            </span>
            <span class="cart1">{{$t("message.购物车")}}</span>
            <!-- 小徽标 -->
            
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row v-show="isShow">
      <el-col :span="5">
        <m-menu @handCahnge="changeShow" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MMenu from "./menu.vue";
export default {
  name: "headerc",
  components: {
    MMenu,
  },
  data() {
    return {
      value: "",
      isShow: false,
      productNumber:0
    };
  },
  computed:{
    calcproductNumber() {
      //每次遍历商品之前对总金额进行清零
      this.productNumber = 0;
      this.$store.state.cartList.forEach((item,index) => {
        this.productNumber += item.productNumber;
      })
      
      return this.productNumber;
 
    }
  },
  mounted() {},
  created(){
   
  },
  methods: {
    //填写搜索词进入商品搜索页面
    searchChange(v){
      console.log(v);
      if(v == '') {
        this.$router.push({name:'home'});
      }else {
        this.$router.push(`/search/${v}`);
      }
      
    },
    handleCommand(command) {
      if(command == 'my'){
        if(this.$store.state.token) {
          this.logout();
          return;
        }
      }
        this.bindTabbar(command)
      
      
      // this.$router.push({ name: command });
    },
    //tab页面跳转
    bindTabbar(name) {
      // console.log(this.$store.state.token);
      if(name == 'orderList' || name == 'myInfo') {
        if(!this.$store.state.token) {
          this.$router.push({ name: 'my' });
        }else{
          this.$router.push({ name: name });
        }
      }else{
        this.$router.push({ name: name });
      }
      
    },
    changeShow(parms) {
      // console.log(parms)
      this.isShow = false;
    },
    bindTrigger() {
      this.isShow = !this.isShow;
      // console.log(this.isShow);
    },
    //退出登录
    logout() {
      //清除购物车以及token
      localStorage.removeItem("token");
      this.$store.commit("removeCart", this.$store.state.cartList);
      localStorage.removeItem("cartlist");
      

      this.nicname = "";
      this.passWord = "";
      this.$message({
          message: this.$t('message.已退出'),
          type: "success",
        });
      // this.$toast({
      //   message: `${this.$lang["已退出"]}`
      // });
      this.$store.commit("clear")
      this.$router.replace("/my");
      // this.isRouterAlive = false;
      // this.$nextTick(function() {
      //   this.isRouterAlive = true;
      // });
      //location.reload();
    },
    
  },
};
</script>

<style lang="scss" scoped>
.header-warpper {
  min-width: 1200px;
  background: #ff9000;
}
.header {
  width: 90%;
  margin: 0 auto;
  height: 64px;

  // display: flex;
  // align-items: center;
  .content {
    height: 100%;
    .box {
      height: 100%;
      display: flex;
      align-items: center;
      /deep/ .el-input {
        font-size: 18px;
        height: 58px;
        .el-input__icon {
          margin-top: 2px;
        }
        input {
          border: none;
          border-radius: 30px;
          height: 58px;
          background: rgba(255, 255, 255, 0.3);
          outline: none;
        }
        input:hover {
          background: rgba(255, 255, 255, 0.6);
        }
        input:focus {
          outline: none;
          background: rgba(255, 255, 255, 1);
        }
      }
      .tu-box {
        font-size: 12px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        
        cursor: pointer;
        .cart1{
          text-align: center;
        }
        .person {
          width: 30px;
          height: 30px;
          // background: red;
          background: url("../assets/imgs/person.png") no-repeat center center;
          background-size: 100%;
          position: relative;
          .roundLogo {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: red;
            position: absolute;
            color: #fff;
            text-align: center;
            line-height: 15px;
            right: -17px;
          }
        }
        .cart {
          background: url("../assets/imgs/chart.png") no-repeat center center;
          background-size: 100%;
        }
        
      }
      
    }
    .logo {
      justify-content: center;
    }
    .class {
      justify-content: center;
    }
    .icon {
      span {
        width: 40px;
        height: 40px;
        background: url("../assets/imgs/san.png") no-repeat center center;
        background-size: 100%;
      }
      .fork {
        background: url("../assets/imgs/fork.png") no-repeat center center;
        background-size: 100%;
      }
    }
  }
}
</style>
