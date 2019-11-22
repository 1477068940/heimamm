<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="header">
      <!-- 顶部的左侧 图标 点击旋转 -->
      <div class="left">
        <i class="el-icon-s-fold" :class="{rotate:isCollapse}" @click="isCollapse = !isCollapse"></i>
        <img src="../../assets/index-logo.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="avatar" src="../../assets/timg (2).jpg" alt />
        <span class="name">狮子头</span>
        <el-button class="logout" size="mini" type="primary">退出</el-button>
      </div>
      <!-- 顶部右侧 -->
    </el-header>
    <el-container>
      <!-- 左侧导航区 -->
      <el-aside class="aside" style="width:auto">
        <el-menu 
        default-active="2" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        >
          <el-menu-item index="1" collapse>
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区 -->
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false
    };
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .header {
    // background-color: skyblue;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .el-icon-s-fold {
        font-size: 23px;
        margin-right: 22px;
      }
      .login {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      .name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .aside {
    // background-color: green;
  }
  .main {
    background-color: red;
  }

  // 折叠菜单相关的类名
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-icon-s-fold {
    font-size: 40px;
    transition: 0.5s;
  }
  .rotate {
    transform: rotate(-90deg);
  }
}
</style>