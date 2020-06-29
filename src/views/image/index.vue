<template>
  <div>
    <el-container style="position:absolute;left:0;top:55px;bottom:0;right:0;">
      <!-- ------------- 头部 开始 ------------- -->
      <el-header class="d-flex align-items-center">
        <div class="d-flex mr-auto">
          <el-select
            class="mr-2"
            placeholder="请选择图片排序方式"
            size="mini"
            style="width:150px;"
            v-model="searchForm.order"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input
            class="mr-2"
            size="mini"
            style="width:150px;"
            placeholder="输入相册名称"
            v-model="searchForm.keyword"
          ></el-input>
          <el-button type="success" size="mini">搜索</el-button>
        </div>
        <el-button type="success" size="mini" @click="openAlbumModel(false)"
          >创建相册</el-button
        >
        <el-button type="warning" size="mini" @click="uploadModel = true"
          >上传图片</el-button
        >
      </el-header>
      <!-- ------------- 头部 结束 ------------- -->
      <el-container>
        <!-- -- ------------- 侧边 | 相册列表 开始 -- ------------- -->
        <el-aside
          width="200px"
          style="position:absolute;top:60px;left:0;bottom:60px;"
          class="bg-white"
        >
          <ul class="list-group list-group-flush">
            <albumItem
              v-for="(item, index) in albums"
              :key="index"
              :item="item"
              :index="index"
              :active="albumsIndex === index"
              @change="albumsChange(index)"
              @edit="openAlbumModel({ item, index })"
              @del="albumDel(index)"
            />
          </ul>
        </el-aside>
        <!-- -- ------------- 侧边 | 相册列表 结束 -- ------------- -->
        <el-container>
          <!-- ------------- 主内容 开始 ------------- -->
          <el-main
            style="position:absolute;top:60px;left:200px;bottom:60px;right:0;"
          >
          </el-main>
          <!--  ------------- 主内容 结束 ------------- -->
        </el-container>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>

    <!-- ------------- 修改 | 创建相册 模态框 开始-------------- -->
    <el-dialog :title="albumModelTitle" :visible.sync="albumModel">
      <el-form :model="albumForm" ref="form" label-width="80px" :rules="rules">
        <el-form-item label="相册名称" prop="name">
          <el-input
            v-model="albumForm.name"
            size="medium"
            placeholder="请输入相册名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="albumForm.order"
            :min="0"
            size="medium"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="comfirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>

    <!-- ------------- 修改 | 创建相册 模态框 结束-------------- -->

    <!-- ------------- 上传图片 模态框 开始 ------------- -->

    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <div class="text-center">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadModel = false">取 消</el-button>
        <el-button type="primary" @click="uploadModel = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- ------------- 上传图片 模态框 结束 ------------- -->
  </div>
</template>

<script>
// 引入相册列表
import albumItem from "./../../components/image/album-item";
export default {
  data() {
    return {
      searchForm: {
        order: "",
        keyword: "",
      },
      uploadModel: false,
      albumsIndex: 0,
      albumModel: false,
      albumForm: {
        name: "",
        order: 0,
      },
      // ------------ 判断是否为创建相册 | 修改相册 开始 ------------
      albumEditIndex: -1,
      // ------------ 判断是否为创建相册 | 修改相册 结束 ------------
      albums: [],
      rules: {
        name: [
          { required: true, message: "不能相册名称为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.__init();
  },
  computed: {
    // -------------- 判断模态框标题 开始 --------------
    albumModelTitle() {
      return this.albumEditIndex > -1 ? "修改相册" : "创建相册";
    },
    // -------------- 判断模态框标题 结束 --------------
  },
  components: {
    albumItem,
  },
  methods: {
    __init() {
      for (let i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          num: Math.floor(Math.random() * 100),
          order: 0,
        });
      }
    },
    // -------------- 切换相册 开始--------------
    albumsChange(index) {
      this.albumsIndex = index;
    },
    // -------------- 切换相册 结束--------------

    // --------------  删除相册 开始 ---------------
    albumDel(index) {
      this.$confirm("是否删除该相册", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.albums.splice(index, 1);
          this.$message({
            message: "删除成功!",
            type: "success",
          });
        })
        .catch((e) => e);
    },
    // --------------  删除相册 结束 ---------------

    // -------------- 打开修改相册框 开始 --------------
    openAlbumModel(obj) {
      // 判断为修改相册
      if (obj) {
        let { item, index } = obj;
        // 初始化表单
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;
        // 打开模态框
        return (this.albumModel = true);
      }
      // 判断为创建相册
      this.albumForm = {
        name: "",
        order: 0,
      };
      this.albumEditIndex = -1;
      this.albumModel = true;
    },
    // -------------- 打开修改相册框 结束 --------------
    // --------------点击确定修改/创建相册 开始 --------------
    comfirmAlbumModel() {
      // 判断相册名称是否为空
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          // 判断修改或者创建
          if (this.albumEditIndex > -1) {
            // 修改
            this.albumEdit();
            return (this.albumModel = false);
          }
          // 追加albums
          this.albums.unshift({
            name: this.albumForm.name,
            order: this.albumForm.order,
            num: 0,
          });
          this.albumModel = false;
        }
      });
    },
    // -------------- 点击确定修改/创建相册 结束 --------------
    // -------------- 修改相册 开始 --------------
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
      this.albums[this.albumEditIndex].order = this.albumForm.order;
    },
    // -------------- 修改相册 结束 --------------
  },
};
</script>

<style lang="scss" scoped>
.sum-active {
  color: #67c23a !important;
  background-color: #f0f9eb !important;
  border-color: #c2e7b0 !important;
}
</style>
