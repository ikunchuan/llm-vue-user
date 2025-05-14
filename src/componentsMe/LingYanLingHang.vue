<template>
  <div class="dashboard">
    <!-- 控制栏 -->
    <div class="control-bar">
      <h3 class="analysis-title">获奖选题趋势分析TOP10</h3>
      <div class="header-group">
        <!-- 数据源选择器 -->
        <div class="custom-select">
          <select v-model="dataSource" @change="handleSourceChange" class="styled-select">
            <option value="innovation">创新创业类竞赛</option>
            <option value="tech">信息技术与编程类竞赛</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <!-- 年份选择组件 -->
        <div class="year-pills">
          <button v-for="year in years" :key="year" :class="{ active: selectedYear === year }" @click="changeYear(year)"
            class="year-pill">
            {{ year }}
          </button>
        </div>
      </div>
    </div>

    <!-- 主条形图 -->
    <div ref="barChart" class="bar-chart"></div>

    <!-- 下部布局 -->
    <div class="lower-section">
      <!-- 左侧卡片列表 -->
      <div class="card-list">
        <!-- 用 chartData，保证只取前 10 条 -->
        <div v-for="(item, index) in chartData" :key="item.主题" class="data-card"
          :style="{ borderColor: getColor(index) }" @mouseover="showTrend(item.主题)">
          <div class="card-header">
            <span class="rank">#{{ index + 1 }}</span>
            <h3 class="title">{{ item.主题 || "未命名主题" }}</h3>
            <span class="trend" :class="trendClass(item.主题)">
              {{ trendText(item.主题) }}
            </span>
          </div>
          <div class="stats">
            <hr />
            <div class="keywords">
              <template v-if="item.词频明细">
                <span v-for="(word, idx) in extractKeywords(item.词频明细)" :key="idx" class="keyword">
                  {{ word }}
                </span>
              </template>
              <span v-else class="no-keywords">暂无关键词数据</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧趋势图 -->
      <div ref="lineChart" class="trend-chart"></div>
    </div>
  </div>
</template>


<script>
import * as echarts from "echarts";
import Papa from "papaparse";
// 配色方案 (10种对比色)
const COLORS = [
  "#7ED321", "#4A90E2", "#BD10E0", "#F5A623", "#50E3C2",
  "#B8E986", "#9013FE", "#374785", "#F9DC5C", "#FF6B6B",
];
// 数据源管理模块
const DATA_SOURCES = {
  innovation: { name: "创新创业类", path: "/data/分年主题词频统计.csv" },
  tech: { name: "信息技术与编程类", path: "/data/计设主题词频统计.csv" }
};
export default {
  data() {
    return {
      // 响应式状态
      dataSource: 'innovation',    // 当前数据源
      rawData: [],                 // 原始数据集
      selectedYear: 2022,          // 当前选中年份
      barChart: null,              // dom 引用
      lineChart: null,             // dom 引用
      barChartInstance: null,      // echarts 实例
      lineChartInstance: null,     // echarts 实例
    };
  },

  computed: {
    // 可用年份集合
    years() {
      const set = new Set(this.rawData.map(d => d.年份));
      return Array.from(set).sort();
    },
    // 当前年份全部数据
    currentYearData() {
      return this.rawData
        .filter(d => d.年份 === this.selectedYear)
        .sort((a, b) => b.总词频 - a.总词频);
    },
    // 用于条形图的前10条
    chartData() {
      return this.currentYearData.slice(0, 10);
    }
  },

  mounted() {
    // 先把模板里 ref 的 DOM 节点取出来
    this.barChart = this.$refs.barChart;
    this.lineChart = this.$refs.lineChart;
    // 再加载数据并初始化图表
    this.loadData();
  },

  methods: {
    // 初始化图表实例
    initCharts() {
      if (this.barChart && this.lineChart) {
        this.barChartInstance = echarts.init(this.barChart);
        this.lineChartInstance = echarts.init(this.lineChart);
        this.updateBarChart();
      }
    },

    // 更新条形图
    updateBarChart() {
      if (!this.barChartInstance) return;

      const option = {
        tooltip: {
          trigger: "axis",
          formatter: params => `
            <div class="chart-tooltip">
              <b>${params[0].name}</b><br/>
              总词频: ${params[0].value}
            </div>
          `,
          backgroundColor: '#fff',
          borderWidth: 0,
          borderRadius: 6,
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 12,
          padding: [8, 12]
        },
        xAxis: {
          type: "value",
          splitLine: { show: true, lineStyle: { color: '#f0f0f0', type: 'dashed' } },
          axisLabel: { color: '#7f8c8d' }
        },
        yAxis: {
          type: "category",
          data: this.chartData.map(d => d.主题).reverse(),
          axisLabel: { fontSize: 13, color: "#666", margin: 10 },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [{
          type: "bar",
          data: this.chartData.map((d, i) => ({
            value: d.总词频,
            itemStyle: {
              color: COLORS[i % COLORS.length],
              borderRadius: [0, 6, 6, 0],
              borderWidth: 0
            }
          })).reverse(),
          barWidth: '60%',
          emphasis: {
            scale: 1.03,
            focus: 'self',
            itemStyle: {
              shadowBlur: 12,
              shadowColor: 'rgba(0,0,0,0.2)',
              borderWidth: 1,
              borderColor: '#fff'
            }
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(240,240,240,0.4)',
            borderRadius: 6
          }
        }],
        grid: { left: "15%", right: "10%", top: "5%", bottom: "5%" }
      };
      this.barChartInstance.setOption(option);
    },

    // 更新折线趋势图
    updateTrendChart(theme) {
      if (!this.lineChartInstance) return;

      const years = this.years;
      const trendData = years.map(year => {
        const item = this.rawData.find(d => d.年份 === year && d.主题 === theme);
        return item ? item.总词频 : 0;
      });

      const idx = this.chartData.findIndex(d => d.主题 === theme);
      const lineColor = idx !== -1 ? COLORS[idx % COLORS.length] : '#3498db';

      const option = {
        title: {
          text: `“${theme}”近三年获奖趋势`,
          left: "center",
          textStyle: {
            fontSize: 16,
            color: "#2d3436",
            fontWeight: "500",
            fontFamily: "Microsoft YaHei"
          }
        },
        grid: { left: "10%", containLabel: true },
        xAxis: {
          type: "category",
          data: years,
          axisLine: { lineStyle: { color: "#e0e0e0" } },
          axisLabel: { color: "#7f8c8d", fontSize: 12 }
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          splitLine: { lineStyle: { color: "#f5f5f5", type: "solid" } },
          axisLabel: { color: "#7f8c8d", fontSize: 12 }
        },
        series: [{
          type: "line",
          data: trendData,
          smooth: 0.6,
          lineStyle: {
            width: 4,
            color: lineColor + "33",
            shadowColor: "rgba(52,152,219,0.2)"
          },
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: lineColor + "20",
            borderColor: lineColor,
            borderWidth: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: lineColor + "33" },
              { offset: 1, color: lineColor + "05" }
            ])
          },
          animation: true,
          animationDuration: 1500,
          animationEasing: "cubicOut"
        }]
      };
      this.lineChartInstance.setOption(option);
    },

    // 加载 CSV 并初始化
    async loadData() {
      try {
        const src = DATA_SOURCES[this.dataSource];
        const res = await fetch(src.path);
        const csv = await res.text();
        Papa.parse(csv, {
          header: true,
          complete: ({ data }) => {
            this.rawData = data.map(d => ({
              ...d,
              总词频: Number(d.总词频) || 0,
              年份: Number(d.年份) || 2022
            }));
            // 取最新年份
            const ys = this.years;
            if (ys.length) this.selectedYear = Math.max(...ys);
            // 挂载 DOM 引用后初始化
            this.$nextTick(this.initCharts);
            // 自动展示第一个主题趋势
            if (this.chartData[0]) {
              this.$nextTick(() => this.updateTrendChart(this.chartData[0].主题));
            }
          }
        });
      } catch (err) {
        console.error("数据加载失败:", err);
      }
    },

    // 切换数据源
    handleSourceChange() {
      this.rawData = [];
      this.selectedYear = null;
      this.barChartInstance = this.lineChartInstance = null;
      this.$nextTick(this.initCharts);
      this.loadData();
    },

    // 切换年份
    changeYear(year) {
      this.selectedYear = year;
      this.$nextTick(this.updateBarChart);
    },

    // 对外方法：显示趋势
    showTrend(theme) {
      this.updateTrendChart(theme);
    },

    // 工具方法 —— 动态颜色
    getColor(index) {
      return COLORS[index % COLORS.length];
    },
    // 工具方法 —— 提取关键词
    extractKeywords(detail) {
      return detail
        .split("，")
        .map(s => s.split("(")[0])
        .slice(0, 8);
    },
    // 工具方法 —— 计算趋势文本
    trendText(theme) {
      const prev = this.rawData.find(d => d.主题 === theme && d.年份 === this.selectedYear - 1)?.总词频 || 0;
      const curr = this.currentYearData.find(d => d.主题 === theme)?.总词频 || 0;
      if (prev === 0) return "New";
      return `${(((curr - prev) / prev) * 100).toFixed(1)}%`;
    },
    // 工具方法 —— 计算趋势样式
    trendClass(theme) {
      const txt = this.trendText(theme);
      if (txt === "New") return "new";
      return txt.includes("-") ? "down" : "up";
    }
  }
};
</script>

<style scoped>
/* 现代选择器样式 */
.header-group {
  display: flex;
  gap: 20px;
  align-items: center;
}

.custom-select {
  position: relative;
  min-width: 220px;
}

.styled-select {
  width: 100%;
  padding: 5px 30px 5px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background: #f8f9fa;
  font-size: 15px;
  color: #2d3436;
  appearance: none;
  transition: all 0.2s;
}

.styled-select:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
}

.styled-select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  pointer-events: none;
}

/* 胶囊式年份按钮 */
.year-pills {
  display: flex;
  gap: 8px;
}

.year-pill {
  padding: 5px 30px 5px 10px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background: #fff;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.year-pill:hover {
  border-color: #3498db;
  color: #3498db;
}

.year-pill.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.analysis-title {
  margin: 12px 0;
  color: #2d3436;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 看板容器样式 */
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  font-size: 14px;
}

/* 控制栏布局样式 */
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

/* 主柱状图容器 */
.bar-chart {
  height: 400px;
  /* 原400px增加20px给标题留空间 */
  padding-bottom: 20px;
  margin: 0 auto;
  background: #F9F9F9;
  /* 浅灰背景增强对比 */
  border-radius: 5px;
}

.chart-tooltip {
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chart-tooltip b {
  color: #3498db;
  margin-bottom: 4px;
  display: inline-block;
}

/* 下部响应式布局 */
.lower-section {
  height: 400px;
  display: grid;
  margin-top: 15px;
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

/* 数据卡片交互样式 */
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


/* 趋势图容器样式 */
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
