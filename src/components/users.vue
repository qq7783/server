<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right"> -->
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <!-- <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>-->
    <!-- </el-breadcrumb> -->
    <!-- 封装的面包屑 -->
    <cus-bread lev1="用户管理" lev2="用户列表"></cus-bread>

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
          <el-switch
            @change="changeUser(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">
        <template slot-scope="scope">
          <el-row>
            <el-button
              @click="showEdit(scope.row)"
              type="primary"
              icon="el-icon-edit"
              plain
              circle
              size="small"
            ></el-button>
            <el-button
              @click="showdelect(scope.row)"
              type="danger"
              icon="el-icon-delete"
              plain
              circle
              size="small"
            ></el-button>
            <el-button
              @click="showsole(scope.row)"
              type="success"
              icon="el-icon-check"
              plain
              circle
              size="small"
            ></el-button>
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
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formdata.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleSole">
      <el-form :model="formdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">{{formdata.username}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          {{selectAll}}
          <el-select v-model="selectAll" placeholder="请选择角色">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="(item, i) in roles" :key="i" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleSole = false">取 消</el-button>
        <el-button type="primary" @click="editroles()">确 定</el-button>
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
      dialogFormVisibleEdit: false,
      dialogFormVisibleSole: false,
      formLabelWidth: "120px",
      // 表单数据
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      selectAll: -1,
      currUserId: -1,
      // 角色数组
      roles: []
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
      this.formdata = {};
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
    // 显示删除对话框 与函数发请求
    showdelect(user) {
      console.log(user);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${user.id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getTableData();
          this.pagenum = 1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 显示编辑用户对话框
    async showEdit(user) {
      this.dialogFormVisibleEdit = true;
      // console.log(user);
      // 根据id发请求获取里面的参数 在赋值
      const res = await this.$http.put(`users/${user.id}`);
      this.formdata = res.data.data;
      // this.formdata = user;
    },
    // 编辑用户函数 发请求
    async editUser() {
      const res = await this.$http.put(
        `users/${this.formdata.id}`,
        this.formdata
      );
      console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.getTableData();
        this.pagenum = 1;
      }
    },
    // 修改用户状态
    async changeUser(user) {
      // console.log(user);
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.getTableData();
        // this.pagenum = 1;
      }
    },
    // 显示分配角色对话框
    async showsole(user) {
      this.dialogFormVisibleSole = true;
      // console.log(user);
      this.formdata = user;
      this.currUserId = user.id;
      // 获取所有角色
      const roles = await this.$http.get(`roles`);
      // console.log(roles);
      this.roles = roles.data.data;
      // console.log(roles);
      const res1 = await this.$http.put(`users/${user.id}`);
      // console.log(res1);
      this.selectAll = res1.data.data.role_id;
    },
    // 修改角色
    async editroles() {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.selectAll
      });
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 关闭
        this.dialogFormVisibleSole = false;
        // this.formdata = {};
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
.page {
  padding-top: 20px;
}
</style>
