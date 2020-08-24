<template>
  <div class="login-layout">
    <div class="login-register">
      <div class="content">
        <div class="sign">
          <div class="lo-re-block">
            <!-- tab -->
            <div class="step-block">
              <div class="tab">
                <a
                  href="javascript:void(0);"
                  :class="{active:index == currentIndex}"
                  @click="change(index)"
                  v-for="(item,index) in tabs"
                  :key="index"
                >{{item}}</a>
              </div>
            </div>
            <!-- form content 登录-->
            <div class="login-form" v-if="loginShow==currentIndex">
              <el-form
                :model="loginForm"
                status-icon
                :rules="rules"
                ref="loginForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="loginName">
                  <el-input v-model="loginForm.loginName" :placheholder="$t('message.用户名')"></el-input>
                </el-form-item>
                <el-form-item prop="loginPass">
                  <el-input
                    type="password"
                    v-model="loginForm.loginPass"
                    autocomplete="off"
                    :placheholder="$t('message.密码')"
                  ></el-input>
                </el-form-item>
                <el-button @click="login('loginForm')" class="fm-button">{{$t('message.登录')}}</el-button>
              </el-form>
            </div>
            <!-- form content 注册-->
            <div class="register-form" v-else>
              <el-form
                :model="registerForm"
                status-icon
                :rules="rules"
                ref="registerForm"
                class="demo-ruleForm"
              >
                <el-form-item prop="regName">
                  <el-input v-model="registerForm.regName" :placheholder="$t('message.用户名')"></el-input>
                </el-form-item>
                <el-form-item prop="regPass">
                  <el-input
                    type="password"
                    v-model="registerForm.regPass"
                    autocomplete="off"
                    :placheholder="$t('message.密码')"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="regcheckPass">
                  <el-input
                    type="password"
                    v-model="registerForm.regcheckPass"
                    autocomplete="off"
                    :placheholder="$t('message.确认密码')"
                  ></el-input>
                </el-form-item>

                <el-button @click="register('registerForm')" class="fm-button">{{$t('message.注册')}}</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.请输入密码')));
      } else {
        if (this.registerForm.regCheckpass !== "") {
          this.$refs.registerForm.validateField("regCheckpass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.请再次输入密码')));
      } else if (value !== this.registerForm.regPass) {
        callback(new Error(this.$t('message.两次输入密码不一致')));
      } else {
        callback();
      }
    };
    return {
      currentIndex: 0,
      tabs: [this.$t('message.个人登录'), this.$t('message.个人注册')],
      loginShow: 0,
      loginForm: {
        loginPass: "",
        loginName: "",
      },
      registerForm: {
        regPass: "",
        regCheckpass: "",
        regName: "",
      },
      rules: {
         regName:[{ required: true, trigger: "blur",message:this.$t('message.请输入用户名') }],
        loginName:[{ required: true, trigger: "blur",message:this.$t('message.请输入用户名') }],
        loginPass: [{ required: true, trigger: "blur" ,message:this.$t('message.请输入密码')}],
        regPass: [{ validator: validatePass, trigger: "blur" }],
        regcheckPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  inject:['loadCartList'] ,
  methods: {
    change(index) {
      this.currentIndex = index;
    },
    login(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // alert("loginForm!");
          this.userLogin();
        } else {
          // console.log("error loginForm!!");
          return false;
        }
      });
    },
    userLogin(){
      this.$request
        .login({ username: this.loginForm.loginName, password: this.loginForm.loginPass })
        .then(res => {
          if (res.code == 0) {
            this.$store.commit("setToken", res.data.token);
            this.$store.dispatch("syncUpdateUserInfo");
            this.loadCartList()
            //this.$store.dispatch("loadCartList");
            this.$message({
              message: this.$t('message.登录成功'),
              type: 'success'
            });
           
            this.$router.back(-1);
           
          } else {
            this.$message({
              message: this.$t('message.用户名或密码错误'),
              type: "warning",
            });
            
          }
        });
    },
    register(registerForm) {
      // console.log(this.registerForm);
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          
          // alert("registerForm!");
          this.onRegister();
        } else {
          // console.log("error registerForm!!");
          return false;
        }
      });
    },
    // 注册
    onRegister() {
      // if (this.passwordRegister != this.passnewReg) {
      //   this.$toast({
      //     message: `${this.$lang["两次输入密码不同"] +
      //       "，" +
      //       this.$lang["请重新输"]}`
      //   });
      //   return;
      // }

      this.$request
        .register({ username: this.registerForm.regName, password: this.registerForm.regPass,roles:["c"],integral:0})
        .then(res => {
          
          if (res.code == 0) {
            this.loginForm.loginName = this.registerForm.regName;
            this.loginForm.loginPass = this.registerForm.regPass;
            this.$message({
              message: this.$t('message.注册成功'),
              type: "success",
            });
            // this.$toast({
            //   message: `${this.$lang["注册成功"]}`
            // });
            this.userLogin();
            // this.login();
          }
          if (res.code == 1) {
            this.$message({
              message: this.$t('message.该账号已注册') ,
              type: "warning",
            });
            // this.$toast({
            //   message: `${this.$lang["该账号已注册"]}`
            // });
          }
        });
    }
  },
};
</script>

<style lang="scss" scoped>
.login-layout {
  position: relative;
  background-color: #fff;
  .login-register {
    .content {
      min-height: calc(100vh - 578px - 208px + 5px);
      width: 100%;
      max-width: 1500px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 40px 30px 0;
      margin: 0 auto;
      .sign {
        color: #000;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        position: relative;
        border-radius: 8px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 420px;
        padding: 28px 40px 40px;
        margin: 0 auto;
        margin-top: 40px;
        .lo-re-block {
          .step-block {
            text-align: left;
            margin-bottom: 20px;
            margin-top: 4px;
            .tab {
              >a{
                 color: #8b8b8b;
                 display: inline-block;
                text-decoration: none;
                margin: 9px 10px 0 0;
                font-weight: 700;
                  font-size: 22px;
              }
              .active {
              color: #ff9000;
              border-bottom: 2px solid #ff9000;
            }
            }
            
          }
          .login-form {
          }
          .fm-button {
            background: #ff9000;
            font-size: 16px;
            color: #fff;
            width: 100%;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
