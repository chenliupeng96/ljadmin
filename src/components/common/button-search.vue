<template>
  <div>
    <div class="d-flex align-items-cent">
          <!-- 左边 -->
          <!-- <el-button type="success" size="mini">发布商品</el-button>
          <el-button type="danger" size="mini">批量删除</el-button> -->
          <slot name="left"></slot>
          <!-- 右边 -->
          <div class="ml-auto" v-show="!superSearch">
            <slot name="right">
            <el-input v-model="keyword" :placeholder="placeholder" size="mini" style="width:150px;" class="mr-2"></el-input>
            <el-button type="info" size="mini" @click="$emit('search',keyword)">搜索</el-button>
            <el-button size="mini" @click="superSearch=true">高级搜索</el-button>
            </slot>
          </div>
        </div>
        <el-card class='box-card bg-light my-3' v-show="superSearch">
            <div slot='header' class='clearfix' style="margin: -10px;">
            <span>高级搜索</span>
            <el-button style='float: right; padding: 3px 0' type='text' @click="closeSurperSearch()">收起</el-button>
            </div>
            <!-- 表单 -->
            <slot name="form"></slot>
        </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      keyword:"",
      superSearch:false
    }
  },
  props:{
    placeholder:{
      type:String,
      default:""
    }
  },
  methods:{
    closeSurperSearch(){
      this.superSearch =false;
    }
  }
}
</script>

<style>

</style>