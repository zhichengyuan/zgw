<template>
  <div>
    <div class="informations">
      <div class="loginOut">
        <div class="content">
          <div class="sign">
            <div class="block-info">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">修改个人信息</el-button>
                </el-form-item>
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
  name: "my",
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 4 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
        margin-top: 40px;
        .block-info {
        }
      }
    }
  }
}
</style>
