<template>
  <div>
    <el-container
      style="position: absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;"
    >
      <el-header
        class="d-flex align-items-center"
        style="background-color:#545c64;"
      >
        <!-- logo开始 -->
        <a class="h5 text-light mb-0 mr-auto">{{ $conf.logo }}</a>
        <!-- logo结束 -->
        <!-- 顶部导航开始 -->
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
        <!-- 顶部导航结束 -->
      </el-header>
      <el-container style="height:100%;">
        <!-- 侧边布局开始 -->
        <el-aside width="200px">
          <el-menu
            :default-active="slideMenusActive"
            @select="slideSelect"
            style="height:100%;"
          >
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
        <!-- 侧边布局结束 -->
        <!-- 主布局 -->
        <el-main class="bg-light" style="padding-bottom:70px;position:relative;">
          <!-- 面包屑导航开始 -->
          <div
            class="border-bottom mb-3 bg-white"
            style="padding:20px;margin:-20px;"
            v-if="bran.length > 0"
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                v-for="(item, index) in bran"
                :key="index"
                :to="{ path: item.path }"
                >{{ item.title }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <!-- 面包屑导航结束 -->
          <!-- 主内容开始 -->
          <!-- 主内容开始 -->
          <router-view></router-view>
          <el-backtop
            target=".el-main"
            :bottom="100"
          >
            <div
              style="{height: 100%;width: 100%;background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center;line-height: 40px; color: #1989fa;}"
            >
              UP
            </div>
          </el-backtop>
        </el-main>
        <!-- 主布局结束 -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";
export default {
  mixins: [common],
  data() {
    return {
      navBar: [],
      bran: [],
    };
  },
  created() {
    this.navBar = this.$conf.navBar;
    console.log(this.bran);
    this.getRouterBran();
    // 初始化选中菜单
    this.__initNavBar();
  },
  watch: {
    $route() {
      localStorage.setItem(
        "navActive",
        JSON.stringify({
          top: this.navBar.active,
          left: this.slideMenusActive,
        })
      );
      this.getRouterBran();
    },
  },
  computed: {
    slideMenusActive: {
      get() {
        return this.navBar.list[this.navBar.active].subActive || "0";
      },
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val;
      },
    },
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    },
  },
  methods: {
    // 初始化选中
    __initNavBar() {
      let ls = localStorage.getItem("navActive");
      if (ls) {
        ls = JSON.parse(ls);
        this.navBar.active = ls.top;
        this.slideMenusActive = ls.left;
      }
    },
    // 获取面包屑导航
    getRouterBran() {
      let bran = this.$route.matched.filter((v) => v.name);
      let arr = [];
      bran.forEach((v) => {
        if (v.name === "index" || v.name === "layout") {
          return;
        }
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title,
        });
      });
      if (arr.length > 0) {
        arr.unshift({ name: "index", path: "/index", title: "后台首页" });
      }
      this.bran = arr;
    },

    handleSelect(key) {
      if(key === '100-1'){
        return console.log('修改')
      }
      if(key === '100-2'){
        return console.log('退出')
      }
      this.navBar.active = key;
      // 默认跳转第一个
      this.slideMenusActive = "0";
      if (this.slideMenus.length > 0) {
        this.$router.push({
          name: this.slideMenus[this.slideMenusActive].pathname,
        });
      }
    },
    slideSelect(key) {
      this.slideMenusActive = key;
      // 跳转指定页面
      console.log(this.slideMenus[key].pathname);
      this.$router.push({
        name: this.slideMenus[key].pathname,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
