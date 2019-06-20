<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 按钮 -->
    <el-button type="primary" plain>添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="160"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="100"></el-table-column>
      <el-table-column prop="address" label="操作" width="120"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <el-pagination
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>-->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      input5: "",
      currentPage4: 4,
      query: "", //查询
      pagenum: 1, //当前页码
      pagesize: 3 // 每页显示条数
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 获取列表
    async getTableData() {
      // 设置请求头 授权
      const AUTH_TOKEN = localStorage.getItem("token");
      console.log(AUTH_TOKEN);
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const {data, meta: {msg, status}} = res.data;
      if (status===200) {
        this.tableData = data.users;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.input-with-select {
  width: 330px;
  padding-top: 20px;
}
</style>
