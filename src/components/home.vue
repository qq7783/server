<template>
  <el-container class="container">
    <el-header class="header">
      <el-row class="row">
        <el-col :span="4">
            <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19">
          <h1>后台管理系统</h1>
        </el-col>
        <el-col :span="1">
          <a href="">退出</a>
        </el-col>
      </el-row>
    </el-header> 
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.container {
  height: 100%;
  background: #ccc;
}
.aside {
  background: red;
}
.main {
  background-color: yellow;
}
h1 {
    text-align: center;
    line-height: 60px;
    color: #fff;
}
a {
    display: block;
    line-height: 60px;
    text-decoration: none;
}
</style>
