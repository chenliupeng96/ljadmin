<template>
  <div>
    <el-container style="position:absolute;left:0;top:55px;bottom:0;right:0;">
      <el-header class="d-flex align-items-center">
        <!-- 头部 开始 -->
        <div class="d-flex mr-auto">
          <el-select
            class="mr-2"
            placeholder="请选择活动区域"
            size="medium"
            style="width:150px;"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input class="mr-2" size="medium" style="width:150px;"></el-input>
          <el-button type="success" size="medium">搜索</el-button>
        </div>
        <el-button type="success">创建相册</el-button>
        <el-button type="warning">上传图片</el-button>
        <!-- 头部 结束 -->
      </el-header>
      <el-container>
        <el-aside
          width="200px"
          style="position:absolute;top:60px;left:0;bottom:60px;"
        >
          <!-- 侧边 开始 -->

          <!-- 侧边 结束 -->
        </el-aside>
        <el-container>
          <el-main
            style="position:absolute;top:60px;left:200px;bottom:60px;right:0;"
          >
            <!-- 主内容 开始 -->

            <!-- 主内容 结束 -->
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
