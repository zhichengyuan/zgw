<template>
  <div>
    <div class="informations">
      <div class="loginOut">
        <div class="content">
          <el-row>
           
            <el-col :span="12">
              <div class="sign">
                <div class="block-info">
                  <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    class="demo-ruleForm"
                  >
                    <el-form-item :label="$t('message.用户名')" prop="name">
                      <el-input v-model="ruleForm.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('message.密码')" prop="pass">
                      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="submitForm('ruleForm')"
                      >{{$t('message.更改密码')}}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </el-col>
             <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{$t('message.店铺信息')}}</span>
                </div>
                <div class="text item">
                  <span>{{$t('message.店铺地址')}}</span>
                  <span class="info">{{serviceTel}}</span>
                </div>
                <div class="text item">
                  <span>{{$t('message.店铺名称')}}</span>
                  <span class="info">{{serviceAddress}}</span>
                </div>
                <div class="text item">
                  <span>{{$t('message.店铺电话')}}</span>
                  <span class="info">{{shopName}}</span>
                </div>
              </el-card>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{$t('message.用户账号积分')}}</span>
                </div>
                <div class="text item">
                  <span>{{$t('message.当前账号积分:')}}</span>
                  <span class="info">{{intergral}}</span>
                </div>
                <div class="text item">{{$t('message.(该积分可用于抵扣部分下单商品的价钱：1积分=1₽)')}}</div>
              
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "******",
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t("message.请输入用户名"),
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: this.$t("message.长度在 3 到 5 个字符"),
            trigger: "blur",
          },
        ],
        pass: [
          {
            required: true,
            message: this.$t("message.请输入密码"),
            trigger: "blur",
          },
          {
            min: 4,
            max: 6,
            message: this.$t("message.长度在 4 到 6 个字符"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    serviceTel() {
      return this.$store.state.storeinfo.tel;
    },
    serviceAddress() {
      return this.$store.state.storeinfo.address;
    },
    shopName() {
      return this.$store.state.storeinfo.shopName;
    },
    intergral(){
      return this.$store.state.integral
    }
  },
  created() {
    this.ruleForm.name = this.$store.state.username;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.onClickRight();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击保存  保存个人信息--w
    onClickRight() {
      let userinfo = {
        nickname: this.nickname,
      };
      userinfo.password = this.ruleForm.pass;
      // if (this.isDisabled != true) {
      //   userinfo.password = this.ruleForm.pass;
      // }
      this.$request.userSave(userinfo).then((res) => {
        if (res.code == 0) {
          localStorage.removeItem("token");
          this.$message({
            message: this.$t("message.请重新登陆"),
            type: "success",
          });

          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    .info{
      margin-left: 25px;
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-bottom: 10px;
  }
.informations {
  position: relative;
  background-color: #fff;
  .loginOut {
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
        
        .block-info {
        }
      }
      /deep/ .el-form-item__content {
        text-align: center;
      }
    }
  }
}
</style>
