<template>
  <div class="header-warpper">
    <div class="header">
      <el-row class="content">
        <el-col class="box logo" :span="3">
          <h2 @click="toHome">logo</h2>
        </el-col>
        <el-col class="box class icon" :span="2">
          <span v-if="!isShow" @click="bindTrigger"></span>
          <span class="fork" v-else @click="bindTrigger"></span>
        </el-col>
        <el-col class="box" :span="13">
          <el-input placeholder="请输入内容" v-model="value">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
<<<<<<< HEAD
        <el-col class="box class " :span="3">
            <div class="tu-box" @click="bindTabbar('my')">
              <span class="person"></span>
              <span>个人中心</span>
            </div>
          
=======
        <el-col class="box class" :span="3">
          <router-link to="my">
            <el-dropdown class="tu-box" v-if="true">
              <span class="person"></span>
              <span>个人中心</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="toMyInfo">修改个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </router-link>
>>>>>>> 9cffa7e50ba0e51727235ab8ca80fbcab70a47e6
        </el-col>
        <el-col class="box class" :span="2">
          <div class="tu-box" @click="bindTabbar('cart')">
            <span class="person cart"></span>
            <span>购物车</span>
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
    };
  },
  mounted() {},
  methods: {
    // 跳转到首页
    toHome(){
       this.$router.push({path:"/"})
    },
    // 跳转到修改个人信息
    toMyInfo(){
      this.$router.push({name:MyInfo})
    },
    bindTabbar(name) {
      this.$router.push({ name: name });
    },
    changeShow(parms) {
      // console.log(parms)
      this.isShow = false;
    },
    bindTrigger() {
      this.isShow = !this.isShow;
      // console.log(this.isShow);
    },
  },
};
</script>

<style lang="scss" scoped>
.header-warpper {
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
        .person {
          width: 30px;
          height: 30px;
          // background: red;
          background: url("../assets/imgs/person.png") no-repeat center center;
          background-size: 100%;
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
