<template>
  <div class="dashboard">
    <!-- 控制栏 -->
    <div class="control-bar">
      <h3 class="analysis-title">获奖选题趋势分析TOP10</h3>
      <div class="header-group">
        <!-- 增强型选择器 -->
        <div class="custom-select">
          <select v-model="dataSource" @change="handleSourceChange" class="styled-select">
            <option value="innovation">创新创业类竞赛</option>
            <option value="tech">信息技术与编程类竞赛</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <!-- 年份选择 -->
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
        <!-- 添加加载状态 -->
        <div v-if="loading" class="loading">数据加载中...</div>
        <template v-else>
          <div v-for="(item, index) in currentYearData" :key="item.主题" class="data-card"
            :style="{ borderColor: getColor(index) }" @mouseover="showTrend(item.主题)">
            <div class="card-header">
              <span class="rank">#{{ index + 1 }}</span>
              <h3 class="title">{{ item.主题 || "未命名主题" }}</h3>
              <span class="trend" :class="trendClass(item.主题)">
                {{ trendText(item.主题) }}
              </span>
            </div>
            <div class="stats">
              <p />
              <hr />
              <div class="keywords">
                <!-- 添加词频明细校验 -->
                <template v-if="item.词频明细">
                  <span v-for="(word, idx) in extractKeywords(item.词频明细)" :key="idx" class="keyword">
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

// 配色方案 (10种对比色)
const COLORS = [
  "#7ED321", // 活力绿 
  "#4A90E2", // 主蓝 
  "#BD10E0", // 科技紫
  "#F5A623", // 暖橙
  "#50E3C2", // 青柠
  "#B8E986", // 浅绿
  "#9013FE", // 深紫
  "#374785", // 钢铁蓝
  "#F9DC5C",  // 柔和黄
  "#FF6B6B", // 柔粉红
];

const DATA_SOURCES = {
  innovation: {
    name: "创新创业类",
    path: "/data/分年主题词频统计.csv"
  },
  tech: {
    name: "信息技术与编程类",
    path: "/data/计设主题词频统计.csv"
  }
};

export default {
  setup() {
    // 新增响应式数据源
    const dataSource = ref('innovation')
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
        tooltip: {
          trigger: "axis",
          formatter: (params) => `
        <div class="chart-tooltip">
          <b>${params[0].name}</b><br>
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
          splitLine: {
            show: true,
            lineStyle: {
              color: '#f0f0f0',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#7f8c8d'
          }
        },
        yAxis: {
          type: "category",
          data: chartData.value.map((d) => d.主题).reverse(),
          axisLabel: {
            fontSize: 13,
            color: "#666",
            margin: 10
          },
          axisLine: { show: false },
          axisTick: { show: false }
        },
        series: [{
          type: "bar",
          data: chartData.value.map((d, i) => ({
            value: d.总词频,
            itemStyle: {
              color: COLORS[i % 10],
              borderRadius: [0, 6, 6, 0], // 顶部圆角
              borderWidth: 0
            },
          })).reverse(),
          barWidth: '60%',
          // 增强悬停效果
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
          // 添加装饰元素
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(240,240,240,0.4)',
            borderRadius: 6
          }
        }],
        grid: {
          left: "15%",
          right: "10%",
          top: "5%",
          bottom: "5%",
        }
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

      // 获取当前主题在柱状图中的颜色索引
      const themeIndex = chartData.value.findIndex(d => d.主题 === theme);
      const lineColor = themeIndex !== -1 ? COLORS[themeIndex % 10] : '#3498db';

      const option = {
        // 坐标系样式优化
        grid: {
          left: "10%",

          containLabel: true
        },
        xAxis: {
          type: "category",
          data: yearsData,
          // 轴线样式
          axisLine: {
            lineStyle: {
              color: "#e0e0e0"
            }
          },
          // 标签样式
          axisLabel: {
            color: "#7f8c8d",
            fontSize: 12
          }
        },
        yAxis: {
          type: "value",
          // 隐藏y轴线
          axisLine: { show: false },
          // 网格线优化
          splitLine: {
            lineStyle: {
              color: "#f5f5f5",
              type: "solid"
            }
          },
          axisLabel: {
            color: "#7f8c8d",
            fontSize: 12
          }
        },

        series: [
          {
            type: "line",
            data: trendData,
            // 平滑曲线优化
            smooth: 0.6,  // 调整平滑度(0-1)
            // 线条样式
            lineStyle: {
              width: 4,
              color: lineColor + "33",
              shadowColor: "rgba(52,152,219,0.2)", // 添加发光效果
            },
            // 标记点样式
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              color: lineColor + "33",
              borderColor: "#3498db",
              borderWidth: 2
            },
            // 区域填充优化
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: lineColor + "33"  // 50%透明度
                },
                {
                  offset: 1,
                  color: lineColor + "05"  // 5%透明度
                }
              ])
            },
            // 动画配置
            animation: true,
            animationDuration: 1500,
            animationEasing: "cubicOut"
          }
        ],
        // 标题样式优化
        title: {
          text: `“${theme}”近三年获奖趋势`,
          left: "center",
          textStyle: {
            fontSize: 16,
            color: "#2d3436",
            fontWeight: "500",
            fontFamily: "Microsoft YaHei"
          }
        }
      };
      lineChartInstance.setOption(option);
    };

    // 加载数据
    const loadData = async () => {
      try {
        const currentSource = DATA_SOURCES[dataSource.value]
        const response = await fetch(currentSource.path)

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
          }
        }
        );
        // 自动设置最新年份并立即刷新图表
        const availableYears = [...new Set(rawData.value.map(d => d.年份))].sort()
        selectedYear.value = Math.max(...availableYears)
        updateBarChart()  // 新增这行立即更新图表
        updateTrendChart(chartData.value[0]?.主题) // 自动显示第一个主题的趋势
      } catch (error) {
        console.error("数据加载失败:", error);
      }
    };

    // 处理数据源变更
    const handleSourceChange = () => {
      rawData.value = [] // 清空旧数据
      selectedYear.value = null
      initCharts() // 重新初始化图表
      loadData()
    };

    // 工具方法
    const getColor = (index) => COLORS[index % 10];

    const extractKeywords = (detail) => {
      return detail
        .split("，")
        .map((s) => s.split("(")[0])
        .slice(0, 8); // 只显示前4个关键词
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
      dataSource,
      handleSourceChange,

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
  padding: 8px 35px 8px 15px;
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
  padding: 8px 35px 8px 15px;
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


.bar-chart {
  height: 400px;
  /* 原400px增加20px给标题留空间 */
  padding-bottom: 20px;
  margin: 0 auto;
  background: #F9F9F9;
  /* 浅灰背景增强对比 */
  border-radius: 5px;
}

/* 新增tooltip样式 */
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
.lower-section {
  height: 400px;
  display: grid;
  margin-top: 10px;
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
