<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread lev1="权限管理" lev2="权限列表"></cus-bread>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="table1" height="400">
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    //   获取表格数据
    async getTableData() {
      const res = await this.$http.get(`rights/list`);
      //   console.log(res);
      this.tableData = res.data.data;
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.table1 {
  margin-top: 20px;
}
</style>
