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
        <el-button
          type="warning"
          size="mini"
          @click="unChoose"
          v-if="chooseList.length > 0"
          >取消选中</el-button
        >
        <el-button
          type="danger"
          size="mini"
          @click="imageDel({ all: true })"
          v-if="chooseList.length > 0"
          >批量删除</el-button
        >
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
            <el-row :gutter="20">
              <el-col
                :span="24"
                :lg="4"
                :md="6"
                :sm="8"
                v-for="(item, index) in imageList"
                :key="index"
              >
                <el-card
                  class="box-card mb-3 position-relative"
                  :body-style="{ padding: '0' }"
                  shadow="hover"
                  style="cursor:pointer;"
                >
                  <div
                    class="border"
                    :class="{ 'border-danger': item.ischeck }"
                  >
                    <span
                      class="badge badge-danger"
                      style="position:absolute;right:0;top:0;"
                      v-if="item.ischeck"
                      >{{ item.checkOrder }}</span
                    >

                    <img
                      :src="item.url"
                      class="w-100"
                      style="height:100px;"
                      @click="choose(item)"
                    />

                    <div
                      class="w-100 text-white px-1"
                      style="background:rgba(0,0,0,.5);margin-top:-25px; position:absolute;"
                    >
                      <span class="small">{{ item.name }}</span>
                    </div>

                    <div class="p-2 text-center">
                      <el-button-group>
                        <el-button
                          icon="el-icon-view"
                          size="mini"
                          class="p-2"
                          @click="previewImage(item)"
                        ></el-button>
                        <el-button
                          icon="el-icon-edit"
                          size="mini"
                          class="p-2"
                          @click="imageEdit(item, index)"
                        ></el-button>
                        <el-button
                          icon="el-icon-delete"
                          size="mini"
                          class="p-2"
                          @click="imageDel({ index })"
                        ></el-button>
                      </el-button-group>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
          <!--  ------------- 主内容 结束 ------------- -->
        </el-container>
      </el-container>
      <el-footer class="border-top d-flex align-items-center px-0">
        <div
          style="width:200px; flex-s"
          class="h-100 d-flex align-items-center justify-content-center border-right"
        >
          <el-button-group>
            <el-button type="primary" size="mini">上一页</el-button>
            <el-button type="primary" size="mini">下一页</el-button>
          </el-button-group>
        </div>
        <div style="flex:1;" class="px-2">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[20, 40, 80, 100]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            background
          >
          </el-pagination>
        </div>
      </el-footer>
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
    <el-dialog :visible.sync="previewModel" width="60vw" top="5vh">
      <div style="margin:-60px -20px -30px -20px;">
        <img :src="previewUrl" class="w-100" />
      </div>
    </el-dialog>

    <!-- ------------- 预览图片 模态框 开始 ------------- -->
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
      previewModel: false,
      albumModel: false,
      albumsIndex: 0,
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
      imageList: [],
      chooseList: [],
      previewUrl: "",
      currentPage: 1,
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
      for (let i = 0; i < 30; i++) {
        this.imageList.push({
          id: i,
          url:
            "https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1956029413.jpg",
          name: "图片" + i,
          ischeck: false,
          checkOrder: 0,
        });
      }
    },
    // 取消选中
    unChoose(){
      this.imageList.forEach(img=>{
        let i = this.chooseList.findIndex(item=>{
          return item.id === img.id;
        })
        if(i>-1){
          img.ischeck = false;
          img.checkOrder = 0;
          this.chooseList.splice(i,1);
        }
      })
      
    },
    // -------------- 选中图片 开始--------------
    choose(item) {
      // -------------- 选中 --------------
      if (!item.ischeck) {
        this.chooseList.push({
          id: item.id,
          url: item.url,
        });
        // -------------- 计算序号 --------------
        item.checkOrder = this.chooseList.length;
        // -------------- 修改状态 --------------
        item.ischeck = true;
        return;
      }
      // -------------- 取消选中 --------------
      let i = this.chooseList.findIndex((v) => v.id === item.id);
      if (i === -1) return;
      // -------------- 重新计算序号 --------------
      let length = this.chooseList.length;
      // -------------- 取消选中中间部分 --------------
      if (i + 1 < length) {
        for (let j = i; j < length; j++) {
          let no = this.imageList.findIndex(
            (v) => v.id === this.chooseList[j].id
          );
          if (no > -1) {
            this.imageList[no].checkOrder--;
          }
        }
      }
      // -------------- 删除 --------------
      this.chooseList.splice(i, 1);
      item.ischeck = false;
      item.checkOrder = 0;
    },
    // -------------- 选中图片 结束--------------
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

    // -------------- 预览图片 开始 --------------
    previewImage(item) {
      this.previewUrl = item.url;
      this.previewModel = true;
    },
    // -------------- 预览图片 结束 --------------
    // -------------- 修改图片名称 开始 --------------
    imageEdit(item) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        inputValidator(val) {
          if (val === "") {
            return "图片名称不能为空";
          }
        },
      }).then(({ value }) => {
        item.name = value;
        this.$message({
          message: "修改成功!",
          type: "success",
        });
      });
    },
    // -------------- 修改图片名称 结束 --------------
    // -------------- 删除当前图片与批量删除 开始 --------------
    imageDel(obj) {
      this.$confirm(obj.all ? "是否删除选中图片?" : "是否删除该相册?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (obj.all) {
            let list = this.imageList.filter(
              (img) => !this.chooseList.some((c) => c.id === img.id)
            );
            this.imageList = list;
            this.chooseList = [];
          } else {
            this.imageList.splice(obj.index, 1);
          }

          this.$message({
            message: "删除成功!",
            type: "success",
          });
        })
        .catch((e) => e);
    },
    // -------------- 删除当前图片与批量删除 结束 --------------

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
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
