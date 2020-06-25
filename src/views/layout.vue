<template>
  <div>
    <el-container style="position: absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;">
      <el-header>Header</el-header>
      <el-container style="height:100%;padding-bottom:60px;">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <li v-for="i in 100" :key="i">{{i}}</li>
        </el-aside>
        <!-- 主布局 -->
        <el-main>
          <li v-for="i in 100" :key="i">{{i}}</li>
        </el-main>
      </el-container>
    </el-container>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}
 .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
