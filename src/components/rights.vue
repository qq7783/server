<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread lev1="权限管理" lev2="权限列表"></cus-bread>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="table1">
      <el-table-column prop="date" label="#" width="80"></el-table-column>
      <el-table-column prop="name" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="address" label="路径" width="180"></el-table-column>
      <el-table-column prop="address" label="层级" ></el-table-column>
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
  created () {
      this.getTableData();
  },
  methods: {
      async getTableData () {
          const res = await this.$http.get(`rights/list`);
        //   console.log(res);
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
