<template>
  <div class="echarts">
    <ECharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";

const pieData = [
  { value: 500, name: "Gitee 访问量" },
  { value: 1000, name: "Gite 访问量" },
  { value: 200, name: "Gite2 访问量" },
  { value: 200, name: "Gite3 访问量" },
  { value: 200, name: "Gite4 访问量" },
  { value: 200, name: "Gite5 访问量" },
  { value: 200, name: "Gite6 访问量" },
  { value: 200, name: "Gite7 访问量" },
  { value: 200, name: "Gite8 访问量" },
  { value: 200, name: "Gite9 访问量" },
  { value: 200, name: "Gite10 访问量" },
  { value: 200, name: "Gite11 访问量" },
  { value: 2000, name: "GitHub 访问量" }
];

const option: ECOption = {
  tooltip: {
    trigger: "item"
  },
  legend: {
    type: "scroll",
    top: "4%",
    left: "2%",
    orient: "vertical",
    icon: "circle", //图例形状
    align: "left",
    itemGap: 20,
    textStyle: {
      fontSize: 13,
      color: "#a1a1a1",
      fontWeight: 500
    },
    formatter: function (name: string) {
      let dataCopy = "";
      for (let i = 0; i < pieData.length; i++) {
        if (pieData[i].name == name && pieData[i].value >= 10000) {
          dataCopy = (pieData[i].value / 10000).toFixed(2);
          return name + "      " + dataCopy + "w";
        } else if (pieData[i].name == name) {
          dataCopy = pieData[i].value + "";
          return name + "      " + dataCopy;
        }
      }
      return "";
    }
  },
  series: [
    {
      type: "pie",
      radius: ["60%", "30%"],
      center: ["60%", "52%"],
      // silent: true,
      // clockwise: true,
      startAngle: 150,
      data: pieData,
      labelLine: {
        length: 70,
        length2: 30,
        lineStyle: {
          width: 1
        }
      },
      label: {
        position: "outside",
        // show: true,
        formatter: "{d}%",
        fontWeight: 400,
        fontSize: 19,
        color: "#a1a1a1"
      }
    }
  ]
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
