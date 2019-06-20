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
          <a href="#" @click="logout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :router="true" :unique-opened="true" default-active="1" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">角色列表</el-menu-item>
            <el-menu-item index="1-2">权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">商品列表</el-menu-item>
            <el-menu-item index="1-2">分类参数</el-menu-item>
            <el-menu-item index="1-2">商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">数据列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    // 登录权限验证 在页面加载完之前
    beforeMount () {
        if (!localStorage.getItem('token')) {
            // 去登录页面
            this.$router.push({
                path: '/login'
            })
        }
    },
    methods: {
        logout () {  
            // 清除token
            localStorage.clear('token');
            this.$router.push({
                path: "/login"
            });
            // 提示退出成功
            this.$message.warning('退出成功');
        }
    }
};
</script>

<style>
.container {
  height: 100%;
  background: #ccc;
}
.aside {
  /* background: red; */
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
.el-menu-vertical-demo {
  height: 100%;
}
</style>
