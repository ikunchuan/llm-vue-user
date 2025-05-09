<template>
  <div class="dashboard">
    <!-- 控制栏 -->
    <div class="control-bar">
      <h2>主题词频分析</h2>
      <div class="year-buttons">
        <button
          v-for="year in years"
          :key="year"
          :class="{ active: selectedYear === year }"
          @click="changeYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </div>

    <!-- 主条形图 -->
    <div ref="barChart" class="bar-chart"></div>

    <!-- 下部布局 -->
    <div class="lower-section">
      <!-- 左侧卡片列表 -->
      <div class="card-list">
        <!-- 添加加载状态 -->
        <div v-if="loading" class="loading">数据加载中...</div>
        <template v-else>
          <div
            v-for="(item, index) in currentYearData"
            :key="item.主题"
            class="data-card"
            :style="{ borderColor: getColor(index) }"
            @mouseover="showTrend(item.主题)"
          >
            <div class="card-header">
              <span class="rank">#{{ index + 1 }}</span>
              <h3 class="title">{{ item.主题 || "未命名主题" }}</h3>
              <span class="trend" :class="trendClass(item.主题)">
                {{ trendText(item.主题) }}
              </span>
            </div>
            <div class="stats">
              <span class="value">{{ item.总词频 }}</span>
              <div class="keywords">
                <!-- 添加词频明细校验 -->
                <template v-if="item.词频明细">
                  <span
                    v-for="(word, idx) in extractKeywords(item.词频明细)"
                    :key="idx"
                    class="keyword"
                  >
                    {{ word }}
                  </span>
                </template>
                <span v-else class="no-keywords">暂无关键词数据</span>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 右侧趋势图 -->
      <div ref="lineChart" class="trend-chart"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import * as echarts from "echarts";
import Papa from "papaparse";
import { MagicString } from "vue/compiler-sfc";

// 配色方案 (10种对比色)
const COLORS = [
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#f1c40f",
  "#e74c3c",
  "#1abc9c",
  "#e67e22",
  "#34495e",
  "#7f8c8d",
  "#d35400",
];

export default {
  setup() {
    // 响应式数据
    const rawData = ref([]);
    const selectedYear = ref(2022);
    const barChart = ref(null);
    const lineChart = ref(null);
    let barChartInstance = null;
    let lineChartInstance = null;

    // 计算属性
    const years = computed(() => {
      return [...new Set(rawData.value.map((d) => d.年份))].sort();
    });

    // 当前年份全部数据（用于卡片）
    const currentYearData = computed(() => {
      return (
        rawData.value
          .filter((d) => d.年份 === selectedYear.value)
          .sort((a, b) => b.总词频 - a.总词频) || []
      );
    });

    // 图表数据（前10条）
    const chartData = computed(() => {
      return currentYearData.value.slice(0, 10);
    });

    // 初始化图表
    const initCharts = () => {
      barChartInstance = echarts.init(barChart.value);
      lineChartInstance = echarts.init(lineChart.value);
      updateBarChart();
    };

    // 更新条形图
    const updateBarChart = () => {
      const option = {
        // 新增标题配置
        title: {
          text: `${selectedYear.value}年创新创业类竞赛词频Top10`,
          left: "center",
          textStyle: {
            fontSize: 25,
            color: "#333",
            fontWeight: "light",
          },
          padding: [5, 5], // 标题与图表间距
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => `
                        <div class="chart-tooltip">
                            <b>${params[0].name}</b><br>
                            总词频: ${params[0].value}
                        </div>
                    `,
        },
        xAxis: {
          type: "value",
          splitLine: { show: false },
        },
        yAxis: {
          type: "category",
          data: chartData.value.map((d) => d.主题),
          axisLabel: {
            fontSize: 12,
            color: "#666",
          },
        },
        series: [
          {
            type: "bar",
            data: chartData.value.map((d, i) => ({
              value: d.总词频,
              itemStyle: {
                color: COLORS[i % 10],
                borderRadius: [0, 4, 4, 0],
              },
            })),
            barWidth: "65%",
          },
        ],
        grid: {
          left: "15%",
          right: "5%",
          top: "5%",
          bottom: "5%",
        },
      };
      barChartInstance.setOption(option);
    };

    // 更新趋势图
    const updateTrendChart = (theme) => {
      const yearsData = years.value;
      const trendData = yearsData.map((year) => {
        const item = rawData.value.find(
          (d) => d.年份 === year && d.主题 === theme
        );
        return item ? item.总词频 : 0;
      });

      const option = {
        xAxis: {
          type: "category",
          data: yearsData,
        },
        yAxis: { type: "value" },
        series: [
          {
            type: "line",
            data: trendData,
            smooth: true,
            lineStyle: { width: 2 },
            areaStyle: { color: "rgba(52, 152, 219, 0.1)" },
          },
        ],
        // 新增动态标题
        title: {
          text: `${theme}历年趋势`,
          left: "center",
          textStyle: {
            fontSize: 16,
            color: "#666",
            fontWeight: "normal",
          },
        },
      };
      lineChartInstance.setOption(option);
    };

    // 加载数据
    const loadData = async () => {
      try {
        const response = await fetch("/data/分年主题词频统计.csv");
        const csv = await response.text();
        Papa.parse(csv, {
          header: true,
          complete: (res) => {
            rawData.value = res.data.map((d) => ({
              ...d,
              总词频: Number(d.总词频) || 0,
              年份: Number(d.年份) || 2022,
            }));
            initCharts();
          },
        });
      } catch (error) {
        console.error("数据加载失败:", error);
      }
    };

    // 工具方法
    const getColor = (index) => COLORS[index % 10];

    const extractKeywords = (detail) => {
      return detail
        .split("，")
        .map((s) => s.split("(")[0])
        .slice(0, 4); // 只显示前4个关键词
    };

    const trendText = (theme) => {
      const prev =
        rawData.value.find(
          (d) => d.主题 === theme && d.年份 === selectedYear.value - 1
        )?.总词频 || 0;
      const current =
        currentYearData.value.find((d) => d.主题 === theme)?.总词频 || 0;

      if (prev === 0) return "New";
      const percent = (((current - prev) / prev) * 100).toFixed(1);
      return `${percent}%`;
    };

    const trendClass = (theme) => {
      const text = trendText(theme);
      if (text === "New") return "new";
      return text.includes("-") ? "down" : "up";
    };

    // 生命周期
    onMounted(() => {
      loadData();
    });

    return {
      barChart,
      lineChart,
      selectedYear,
      years,
      currentYearData,
      changeYear: (year) => {
        selectedYear.value = year;
        setTimeout(updateBarChart, 100);
      },
      showTrend: updateTrendChart,
      getColor,
      extractKeywords,
      trendText,
      trendClass,
    };
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  font-size: 14px;
}

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
  padding: 0px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.year-buttons button {
  padding: 6px 12px;
  margin-left: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.year-buttons button.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.bar-chart {
  height: 430px;
  /* 原400px增加20px给标题留空间 */
  padding-top: 10px;
  /* 增加顶部内边距 */
  margin-bottom: 30px;
  background: #fff;
  border-radius: 5px;
}

.lower-section {
  height: 400px;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 16px;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
}

.data-card {
  padding: 12px;
  background: #fff;
  border-left: 3px solid;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.rank {
  color: #888;
  margin-right: 8px;
}

.title {
  flex: 1;
  font-size: 14px;
  margin: 0;
}

.trend {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 8px;
}

.trend.up {
  background: #e8f5e9;
  color: #2e7d32;
}

.trend.down {
  background: #ffebee;
  color: #c62828;
}

.trend.new {
  background: #fff3e0;
  color: #ef6c00;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.keyword {
  padding: 2px 8px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 12px;
}

.trend-chart {
  height: 420px;
  background: #fff;
  border-radius: 6px;
  padding: 8px;
}

/* 滚动条样式 */
.card-list::-webkit-scrollbar {
  width: 4px;
}

.card-list::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 2px;
}
</style>
