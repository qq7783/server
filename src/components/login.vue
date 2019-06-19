<template>
  <div class="login-warp">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
      width="180px"
    >
      <h1>用户登录</h1>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="headLogin()" class="login-btn" type="primary" plain>登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //   发送登录请求
    async headLogin() {
      const res = await this.$http.post(`login`, this.formdata);
    //   console.log(res);
      const {
        data: {token},
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        //   保存token
        localStorage.setItem("token",token);
        //   跳转首页home
        this.$router.push({
            path: '/'
        })
      } else {
        //   提示错误
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.login-warp {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 380px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-btn {
  width: 100%;
}
</style>
