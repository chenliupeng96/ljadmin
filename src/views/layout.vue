<template>
  <div>
    <el-container
      style="position: absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;"
    >
      <el-header
        class="d-flex align-items-center"
        style="background-color:#545c64;"
      >
        <!-- logo -->
        <a class="h5 text-light mb-0 mr-auto">{{ $conf.logo }}</a>
        <el-menu
          :default-active="navBar.active"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numToString"
            v-for="(item, index) in navBar.list"
            :key="index"
            >{{ item.name }}</el-menu-item
          >
          <el-submenu index="100">
            <template slot="title">
              <el-avatar
                size="small"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
              tail
            </template>
            <el-menu-item index="100-1">修改</el-menu-item>
            <el-menu-item index="100-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container style="height:100%;">
        <!-- 侧边布局 -->
        <el-aside width="200px">
          <el-menu default-active="2" @select="slideSelect" style="height:100%;">
            <el-menu-item
              :index="index | numToString"
              v-for="(item, index) in slideMenus"
              :key="index"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主布局 -->
        <el-main>
          <!-- 面包屑导航 -->
          <div class="border-bottom" style="padding:20px;margin:-20px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item 
            v-for="(item,index) in bran"
            :key="index"
            :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
export default {
  mixins: [common],
  data() {
    return {
      navBar: [],
      bran:[]
    };
  },
  created() {
    this.navBar = this.$conf.navBar;
    this.getRouterBran();
  },
  computed: {
    slideMenusActive: {
      get() {
        return this.navBar.list[this.navBar.active].subActive || "0";
      },
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val;
        console.log(val);
      },
    },
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    },
  },
  methods: {
    // 获取面包屑导航
    getRouterBran(){
      let bran = this.$route.matched.filter(v=>v.name);
      let arr = [];
      bran.forEach((v) => {
        if(v.name==='index'|| v.name==='layout'){
          return
        }
        arr.push({
          name: v.name,
          path:v.path,
          title:v.meta.title
        })
      });
      if(arr.length>0){
        arr.unshift({name:'index',path:'/index',title:'后台首页'})

      }
      this.bran = arr;
      console.log(arr);
    },


    handleSelect(key) {
      this.navBar.active = key;
    },
    slideSelect(key) {
      this.slideMenusActive = key;
    },
  },
};
</script>

<style lang="scss" scoped></style>
