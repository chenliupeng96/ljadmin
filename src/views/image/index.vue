<template>
  <div>
    <el-container style="position:absolute;left:0;top:55px;bottom:0;right:0;">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px" style="position:absolute;top:60px;left:0;bottom:60px;">
          <div style="height:1000px"></div>
        </el-aside>
        <el-container>
          <el-main  style="position:absolute;top:60px;left:200px;bottom:60px;right:0;">
            <div style="height:1000px"></div>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
