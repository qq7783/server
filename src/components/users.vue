<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-input
      @clear="getAllusers()"
      clearable
      placeholder="请输入内容"
      v-model="query"
      class="input-with-select"
    >
      <el-button slot="append" icon="el-icon-search" @click="selectUser()"></el-button>
    </el-input>
    <!-- 按钮 -->
    <el-button type="primary" plain @click="showAddUser()">添加用户</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="160"></el-table-column>
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">{{scope.row.create_time|formdata}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" plain circle size="small"></el-button>
            <el-button
              @click="showdelect(scope.row)"
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="small"
            ></el-button>
            <el-button type="success" icon="el-icon-check" plain circle size="small"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  current-page 当前的页码-->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 3, 5,]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      query: "", //查询
      pagenum: 1, //当前页码
      pagesize: 1, // 每页显示条数
      total: -1,
      dialogFormVisibleAdd: false,
      formLabelWidth: "120px",
      // 表单数据
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTableData();
    },
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
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 保存total
        this.total = data.total;
        this.tableData = data.users;
      }
    },
    // 查询用户
    selectUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    // 清空搜索框获取所有信息
    getAllusers() {
      this.getTableData();
    },
    // 显示添加用户对话框
    showAddUser() {
      this.dialogFormVisibleAdd = true;
    },
    // 添加用户函数请求
    async addUser() {
      const res = await this.$http.post(`users`, this.formdata);
      console.log(res);
      const {
        meta: { status }
      } = res.data;
      if (status === 201) {
        this.dialogFormVisibleAdd = false;
        this.getTableData();
        // 清空表单
        this.formdata = {};
      }
    },
    // 显示删除对话框
    showdelect (user) {
      console.log(user);
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${user.id}`);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTableData();
          this.pagenum = 1;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 删除用户函数发请求
    async deleUser () {
      const res = await this.$http.delete(`users/:id`)
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
.page {
  padding-top: 20px;
}
</style>
