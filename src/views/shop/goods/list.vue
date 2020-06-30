<template>
  <div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
    <el-tabs v-model='tabIndex' @tab-click='handleClick'>
      <el-tab-pane v-for="(item,index) in tabbars" :key="index" :label="item.name">用户管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        tabIndex:0,
        tabbars:[
          {name: "审核中"},
          {name: "出售中"},
          {name: "已下架"},
          {name: "库存预警"},
          {name: "回收站"},
        ]
      }
    },
    methods:{
      // 加载数据
      handleClick(tab,event){
        console.log(tab.index);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>