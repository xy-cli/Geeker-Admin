<template>
  <div class="home">
    <div class="card top-box">
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="item-right">
              <div class="echarts-title">本周我处理的工单数量</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="item-right">
              <div class="echarts-title">本周我处理的工单分类</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="item-right">
              <div class="echarts-title">本周我处理的工单数量</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="item-right">
              <div class="echarts-title">本周我处理的工单分类</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pie from "./components/pie.vue";
</script>

<style scoped lang="scss">
.home {
  .top-box {
    box-sizing: border-box;
    padding: 25px 40px 0;
    margin-bottom: 10px;
    .top-content {
      margin-top: 10px;
      .item-right {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 430px;
        border: 1px solid var(--el-border-color);
        border-radius: 25px;
        .echarts-title {
          padding: 15px 20px;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid var(--el-border-color);
        }
        .book-echarts {
          flex: 1;
          width: 100%;
          padding-bottom: 15px;
        }
      }
    }
  }
}
</style>
