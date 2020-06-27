<template>
  <div>
    <!-- ----------------数据统计开始---------------- -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card class="box-card" shadow="hover">
          <div class="d-flex align-items-center">
            <i
              :class="[item.color, item.icon]"
              class="h4 mb-0 text-white text-center mr-3"
              style="width:40px;height:40px;text-align:center;line-height:40px;"
            ></i>
            <div>
              <h4 class="mb-1">{{ item.num }}</h4>
              <small class="text-muted">{{ item.desc }}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- ----------------数据统计结束---------------- -->

    <!-- --------------------------------店铺、订单提示 | 统计图  开始-------------------------------- -->
    <el-row :gutter="20" class="mt-3">
      <!-- ----------------店铺、订单提示 开始---------------- -->
      <el-col
        :span="12"
        class="d-flex flex-column"
        style="height:370px;justify-content:space-between;"
      >
        <el-card class="box-card" v-for="(tip, ti) in tips" :key="ti">
          <div slot="header" class="clearfix">
            <span>{{ tip.title }}</span>
            <el-button style="float:right;padding:3px 0;" type="text">{{
              tip.desc
            }}</el-button>
          </div>
          <div class="row">
            <div
              :class="tip.list.length | getCol"
              v-for="(tlist, listi) in tip.list"
              :key="listi"
            >
              <button class="btn btn-light w-100">
                <h4 class="mb-1">{{ tlist.value }}</h4>
                <small class="text-muted">{{ tlist.name }}</small>
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- ----------------店铺、订单提示 结束---------------- -->

      <!-- ---------------统计图 开始---------------------- -->
      <el-col :span="12">
        <el-card class="box-card" style="height:370px;">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button
              style="float:right;padding:3px 0;"
              type="text"
            ></el-button>
          </div>
          
          <div ref="myChart" style="width: 600px;height:400px;"></div>

        </el-card>
      </el-col>
      <!-- ----------------统计图 结束---------------------- -->
    </el-row>
    <!-- --------------------------------店铺、订单提示 | 统计图  结束-------------------------------- -->
  </div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  data() {
    return {
      counts: [
        {
          icon: "el-icon-user-solid",
          num: "30",
          desc: "关注人数(个)",
          color: "bg-primary",
        },
        {
          icon: "el-icon-s-finance",
          num: "120",
          desc: "订单总数(笔)",
          color: "bg-success",
        },
        {
          icon: "el-icon-s-order",
          num: "4183.80",
          desc: "今日订单总金额(元)",
          color: "bg-danger",
        },
        {
          icon: "el-icon-s-data",
          num: "100",
          desc: "本月销售(笔)",
          color: "bg-warning",
        },
      ],
      tips: [
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
          ],
        },
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
            {
              name: "出售中",
              value: "64",
            },
          ],
        },
      ],
    };
  },
  filters: {
    getCol(total) {
      return `col-${12 / total}`;
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      //  初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);
      myChart.setOption({
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
