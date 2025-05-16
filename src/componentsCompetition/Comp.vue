<template>
  <div class="competition-platform">
    <!-- 粘性搜索栏 -->
    <div class="sticky-search">
      <div class="search-container">
        <el-input
          v-model="searchName"
          placeholder="搜索竞赛..."
          class="smart-search"
          clearable
        >
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
        <el-button
          type="primary"
          class="advanced-filter"
          @click="showAdvanced = !showAdvanced"
        >
          高级筛选 ▼
        </el-button>
      </div>

      <!-- 高级筛选面板 -->
      <transition name="slide-fade">
        <div v-show="showAdvanced" class="advanced-panel">
          <div class="filter-group">
            <el-date-picker
              v-model="searchStartDate"
              type="date"
              placeholder="开始日期"
              value-format="YYYY-MM-DD"
            />
            <el-date-picker
              v-model="searchEndDate"
              type="date"
              placeholder="结束日期"
              value-format="YYYY-MM-DD"
            />
          </div>
          <div class="filter-actions">
            <el-button @click="resetFilters">重置</el-button>
            <el-button type="primary" @click="searchCompetitions"
              >应用</el-button
            >
          </div>
        </div>
      </transition>
    </div>

    <!-- 推荐模块 -->
    <section class="recommend-section">
      <h2 class="section-title">🔥 精选推荐</h2>
      <div class="recommend-container">
        <!-- 左侧推荐导航 -->
        <div class="recommend-sidebar">
          <div
            class="recommend-sidebar-item"
            v-for="(item, index) in sidebarItems"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="selectSidebarItem(item)"
          >
            {{ item.name }} &nbsp &nbsp 🔥
          </div>
        </div>
        <!-- 右侧推荐卡片 -->
        <div class="recommend-cards">
          <div
            class="recommend-card"
            v-for="(card, index) in recommendCards"
            :key="index"
          >
            <el-image
              style="width: 250px; height: 170px; border-radius: 8px"
              :src="'http://localhost:10086/images/upload/' + card.imageUrl"
              fit="cover"
              class="card-image"
            ></el-image>
            <div class="card-title">{{ card.name }}</div>
            <!-- 显示卡片名称 -->
          </div>
        </div>
      </div>
    </section>
    <!-- 图表容器结构 -->
    <div class="chart-controls">
      <el-radio-group
        v-model="activeTab"
        size="medium"
        @change="handleTabChange"
      >
        <el-radio-button label="basic">基础数据</el-radio-button>
        <el-radio-button label="trend">趋势分析</el-radio-button>
        <el-radio-button label="overlap">重叠分析</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 图表容器 -->
    <div class="container">
      <div class="visualization-section">
        <!-- 基础数据 -->
        <div v-show="activeTab === 'basic'">
          <h3>基础数据分析</h3>
          <div class="chart-row">
            <div class="chart-container">
              <div id="levelChart" style="width: 100%; height: 200px"></div>
            </div>
            <div class="chart-container">
              <div id="categoryChart" style="width: 100%; height: 200px"></div>
            </div>
          </div>
          <div class="chart-row">
            <div class="chart-container">
              <div id="organizerChart" style="width: 100%; height: 200px"></div>
            </div>
            <div class="chart-container">
              <div id="durationChart" style="width: 100%; height: 200px"></div>
            </div>
          </div>
        </div>

        <!-- 趋势分析 -->
        <div v-show="activeTab === 'trend'">
          <h3>趋势分析</h3>
          <div class="chart-row">
            <div class="chart-container">
              <div id="timeTrendChart" style="width: 100%; height: 300px"></div>
            </div>
            <div class="chart-container">
              <div id="heatTrendChart" style="width: 100%; height: 300px"></div>
            </div>
          </div>
        </div>

        <!-- 重叠分析 -->
        <div v-show="activeTab === 'overlap'">
          <h3>重叠分析</h3>
          <div class="chart-row">
            <div class="chart-container">
              <div
                id="overlapBarChart"
                style="width: 100%; height: 400px"
              ></div>
            </div>
          </div>
          <div class="chart-row">
            <div class="chart-container full-width">
              <div class="year-selector">
                <el-select
                  v-model="selectedYear"
                  placeholder="选择年份"
                  @change="updateOverlapChart"
                >
                  <el-option
                    v-for="year in availableYears"
                    :key="year"
                    :label="year"
                    :value="year"
                  ></el-option>
                </el-select>
              </div>
              <div id="overlapChart" style="width: 100%; height: 300px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 竞赛列表 -->
    <section class="competition-list">
      <div class="list-header">
        <h3>全部竞赛</h3>
        <el-tag type="info">共 {{ cards.length }} 个赛事</el-tag>
      </div>
      <section class="icon-section">
        <div class="icon-container">
          <div class="icon-item">
            <el-icon class="icon"
              ><img
                src="../assets/img/1.png"
                alt="Logo"
                class="logo"
                @click="onIconClick(1)"
            /></el-icon>
            <p>创新创业类</p>
          </div>
          <!-- 信息技术与编程类 -->
          <div class="icon-item">
            <el-icon class="icon"
              ><img
                src="../assets/img/2.png"
                class="logo"
                @click="onIconClick(2)"
            /></el-icon>
            <p>信息技术与编程类</p>
          </div>

          <!-- 数学类 -->
          <div class="icon-item">
            <el-icon class="icon"
              ><img
                src="../assets/img/3.png"
                class="logo"
                @click="onIconClick(3)"
            /></el-icon>
            <p>数学类</p>
          </div>

          <!-- 经济与管理类 -->
          <div class="icon-item">
            <el-icon class="icon"
              ><img
                src="../assets/img/4.png"
                class="logo"
                @click="onIconClick(4)"
            /></el-icon>
            <p>经济与管理类</p>
          </div>

          <!-- 语言与文化类 -->
          <div class="icon-item">
            <el-icon class="icon"
              ><img
                src="../assets/img/5.png"
                class="logo"
                @click="onIconClick(5)"
            /></el-icon>
            <p>语言与文化类</p>
          </div>
        </div>
      </section>

      <div class="card-grid">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="competition-card"
          @click="goToDetail(card.competitionId)"
        >
          <div class="card-image">
            <el-image
              :src="
                'http://localhost:10086/images/upload/' + card.competitionImgUrl
              "
              :lazy="true"
              fit="cover"
            >
              <template #placeholder>
                <div class="skeleton-box"></div>
              </template>
            </el-image>
          </div>
          <div class="card-content">
            <h4>{{ card.competitionName }}</h4>
            <div class="card-meta">
              <el-tag>{{ card.levelName }}</el-tag>
              <!-- <span class="date">{{ formatDate(card.startDate) }}</span> -->
            </div>
            <div
              class="card-status"
              :style="{ color: statusColors[card.competitionStatus] }"
            >
              {{ card.competitionStatus }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
import { Search } from "@element-plus/icons-vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectCreative } from "swiper/modules";

export default {
  name: "MainLayout",

  data() {
    return {
      activeTab: "basic", // 新增当前激活标签
      chartCleanupHandlers: [],
      activeChartGroup: "basic",
      chartInstances: new Map(),
      observer: null,
      showAdvanced: false,
      heatData: [], // 存储热度分析数据
      competitionNames: {
        1001: "创新创业类",
        1002: "信息技术与编程类",
        1003: "数学类",
        1004: "经济与管理类",
        1005: "语言与文化类",
      },
      availableYears: [],
      levelData: [],
      categoryData: [],
      organizerData: {}, //HBase中org_count表数据
      timeHeatmapData: [],
      durationData: [],
      timeData: [],
      overlapData: [], // 重叠分析数据
      selectedYear: 2025, // 默认选择2025年（根据示例数据）
      availableYears: [2025], // 可用年份列表

      //推荐板块
      sidebarItems: [
        {
          name: "热门竞赛",
          type: "competition",
          popular: true,
          recommendCards: [],
        },
        { name: "热门课程", type: "course", popular: true, recommendCards: [] },
        {
          name: "热门社区",
          type: "community",
          popular: true,
          recommendCards: [],
        },
      ],
      recommendCards: [],
      currentType: null,

      iconCategories: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
      // 展示卡片的内容
      cards: [],
      filteredCards: [],
      currentIndex: 0, // 当前激活的导航索引

      //条件查询数据
      searchName: "", // 竞赛名称
      searchStartDate: "", // 开始日期
      searchEndDate: "", // 结束日期
      searchStatus: "", // 参赛状态
      searchLevel: "", // 难度级别

      activeDrawer: null, // 当前激活的抽屉

      // 参赛状态与颜色的映射
      statusColors: {
        进行中: "#17C964", // 绿色
        未开始: "#FFA726", // 橙色
        已结束: "#E53935", // 红色
      },
    };
  },
  methods: {
    // 处理图表的 resize 事件中调用该方法
    handleTabChange() {
      this.$nextTick(() => {
        this.handleChartResize();
        // 对需要延迟加载的图表进行特殊处理
        setTimeout(() => {
          [
            "timeTrendChart",
            "heatTrendChart",
            "overlapBarChart",
            "overlapChart",
          ].forEach((chartId) => {
            const chart = echarts.getInstanceByDom(
              document.getElementById(chartId)
            );
            if (chart) chart.resize();
          });
        }, 300);
      });
    },
    //处理图表
    handleChartResize() {
      this.$nextTick(() => {
        [
          "levelChart",
          "categoryChart",
          "organizerChart",
          "durationChart",
          "timeTrendChart",
          "heatTrendChart",
          "overlapBarChart",
          "overlapChart",
        ].forEach((chartId) => {
          const chart = echarts.getInstanceByDom(
            document.getElementById(chartId)
          );
          if (chart) chart.resize();
        });
      });
    },

    //---------- 加载获取数据 ------>
    // 加载CSV数据
    async loadCSVData() {
      try {
        const [levelRes, categoryRes, organizerRes] = await Promise.all([
          fetch("/csv/比赛等级.csv"),
          fetch("/csv/比赛类别.csv"),
          // fetch('/csv/比赛主办方.csv'),
        ]);

        this.levelData = this.parseCSV(await levelRes.text());
        this.categoryData = this.parseCSV(await categoryRes.text());
        // this.organizerData = this.parseCSV(await organizerRes.text());

        await this.$nextTick();
        this.renderLevelChart();
        this.renderCategoryChart();
        // this.renderOrganizerChart();
      } catch (error) {
        console.error("加载CSV数据失败:", error);
        this.$message.error("图表数据加载失败");
      }
    },
    //  加载所有CSV数据
    async loadAllCSVData() {
      try {
        const [durationRes, timeRes, overlapRes] = await Promise.all([
          fetch("/csv/darution.csv"),
          fetch("/csv/time.csv"),
          // fetch('/csv/overlap.csv')
        ]);

        this.durationData = this.parseCSV(await durationRes.text());
        this.timeData = this.parseCSV(await timeRes.text());
        //  this.overlapData = this.parseCSV(await overlapRes.text());

        // 提取所有可用年份
        //    this.extractAvailableYears();

        await this.$nextTick();
        this.renderDurationChart();
        this.renderTimeTrendChart();
        // this.renderOverlapCharts();
      } catch (error) {
        console.error("加载CSV数据失败:", error);
        this.$message.error("图表数据加载失败");
      }
    },
    async loadHeatData() {
      try {
        const response = await fetch("/csv/pivot_table.csv");
        const csvText = await response.text();
        this.heatData = this.parseCSV(csvText);
        this.renderHeatTrendChart();
      } catch (error) {
        console.error("加载热度数据失败:", error);
        this.$message.error("热度数据加载失败");
      }
    },
    // 加载重叠数据
    async loadOverlapData() {
      try {
        const response = await fetch("/csv/重叠.csv");
        const csvText = await response.text();
        this.overlapData = this.parseCSV(csvText).filter((item) => {
          // 验证日期格式为YYYY-MM-DD
          const valid = item.年份 && /\d{4}-\d{2}-\d{2}/.test(item.年份);
          if (!valid) console.warn("无效日期数据:", item);
          return valid;
        });
        this.extractAvailableYears();
        this.renderOverlapChart();
        this.renderFullOverlapChart();
      } catch (error) {
        console.error("加载重叠数据失败:", error);
      }
    },
    fetchHBaseTableOrganizer() {
      axios
        .get("/hbase/scan", {
          params: {
            table: "org_count",
          },
        })
        .then((response) => {
          this.organizerData = response.data;
          console.log("获取HBase表数据成功:", this.organizerData);
          this.renderOrganizerChart();
        })
        .catch((error) => {
          console.error("获取HBase表数据失败:", error);
        });
    },
    //------工具方法------------->

    parseCSV(csvText) {
      const lines = csvText.split("\n");
      // 处理可能的换行符和空格
      const headers = lines[0].split(",").map((header) => header.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const obj = {};
        // 处理可能包含逗号的值
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        for (let j = 0; j < headers.length; j++) {
          let value = currentline[j] ? currentline[j].trim() : "";
          // 移除可能的引号
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          obj[headers[j]] = value;
        }

        result.push(obj);
      }

      return result;
    },
    // 提取可用年份
    extractAvailableYears() {
      const years = new Set();
      this.overlapData.forEach((item) => {
        try {
          // 修改日期分隔符为破折号
          const yearPart = item.年份.split("-")[0];
          const year = parseInt(yearPart, 10);
          if (!isNaN(year)) years.add(year);
        } catch (e) {
          console.warn("年份解析失败:", item.年份);
        }
      });
      this.availableYears = Array.from(years).sort((a, b) => b - a);

      // 设置默认选择数据中存在的年份
    },
    // 更新图表
    updateOverlapChart() {
      this.renderOverlapChart();
    },

    // 新增方法 - 获取时长颜色
    getDurationColor(duration) {
      const colors = {
        一个月以内: "#FF9AA2",
        一个月至三个月: "#FFB7B2",
        三个月至六个月: "#FFDAC1",
        半年至一年: "#E2F0CB",
        超过一年: "#B5EAD7",
      };
      return colors[duration] || "#5470C6";
    },
    //----------渲染图表--------->
    //比赛等级图表
    renderLevelChart() {
      const chartDom = document.getElementById("levelChart");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "比赛等级分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
        },
        series: [
          {
            name: "比赛等级",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "18",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.levelData.map((item) => ({
              value: item.总计,
              name: item.比赛等级,
            })),
          },
        ],
      };
      this.initChart("levelChart", option);

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    //比赛类别图表
    renderCategoryChart() {
      const chartDom = document.getElementById("categoryChart");
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "比赛类别分布",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: this.categoryData.map((item) => item.比赛类别),
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.categoryData.map((item) => item.总计),
            itemStyle: {
              color: function (params) {
                const colorList = [
                  "#5470C6",
                  "#91CC75",
                  "#FAC858",
                  "#EE6666",
                  "#73C0DE",
                ];
                return colorList[params.dataIndex % colorList.length];
              },
            },
          },
        ],
      };

      this.initChart("categoryChart", option);

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    //比赛主办方图表
    renderOrganizerChart() {
      const chartDom = document.getElementById("organizerChart");
      const myChart = echarts.init(chartDom);

      // 将 HBase 返回的数据格式化为适合 ECharts 的格式
      const formattedData = this.organizerData.rows.map((item) => ({
        主办方: item.rowKey,
        计数: parseInt(item.count, 10),
      }));

      // 排序取前10
      const sortedData = formattedData
        .sort((a, b) => b.计数 - a.计数)
        .slice(0, 10);

      const option = {
        title: {
          text: "主办方TOP10",
          left: "center",
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "5%", // 给 Y 轴文字留出足够空间
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "数量",
        },
        yAxis: {
          type: "category",
          data: sortedData.map((item) => item.主办方),
          axisLabel: {
            formatter: (value) =>
              value.length > 20 ? value.slice(0, 20) + "…" : value, // 可选：超长主办方名称省略显示
          },
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: sortedData.map((item) => item.计数),
            itemStyle: {
              color: "#73C0DE",
            },
          },
        ],
      };

      this.initChart("organizerChart", option);
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    // 渲染竞赛时长分布图表
    renderDurationChart() {
      const chartDom = document.getElementById("durationChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "竞赛时长分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
        },
        series: [
          {
            name: "时长分布",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "18",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.durationData.map((item) => ({
              value: item.数量,
              name: item.时间范围,
              itemStyle: {
                color: this.getDurationColor(item.时间范围),
              },
            })),
          },
        ],
      };

      this.initChart("durationChart", option);
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    //渲染时间趋势图表
    renderTimeTrendChart() {
      const chartDom = document.getElementById("timeTrendChart");
      const myChart = echarts.init(chartDom);
      const monthData = this.timeData.filter(
        (item) => item.DateType === "Month"
      );
      const dates = monthData.map((item) => item.Date);
      const values = monthData.map((item) => parseInt(item.Value));

      const option = {
        title: {
          text: "竞赛时间趋势",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: dates,
          axisLabel: {
            rotate: 45,
            interval: Math.floor(dates.length / 10), // 显示部分标签避免重叠
          },
        },
        yAxis: {
          type: "value",
          name: "竞赛数量",
        },
        series: [
          {
            name: "竞赛数量",
            type: "line",
            smooth: true,
            data: values,
            itemStyle: {
              color: "#8884d8",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(136, 132, 216, 0.5)" },
                { offset: 1, color: "rgba(136, 132, 216, 0.1)" },
              ]),
            },
          },
        ],
      };

      this.initChart("timeTrendChart", option);
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    //渲染竞赛热度趋势图表
    renderHeatTrendChart() {
      const chartDom = document.getElementById("heatTrendChart");
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);

      // 准备数据 - 确保按年份排序
      const sortedData = [...this.heatData].sort((a, b) => {
        return parseInt(a.年份) - parseInt(b.年份);
      });

      // 获取年份数据，确保列名正确
      const years = sortedData
        .map((item) => {
          // 检查数据中的年份列名，可能是"年份"或"year"
          const year = item.年份 || item.year;
          return year ? year.toString() : "";
        })
        .filter((year) => year); // 过滤掉空值

      const series = [];

      // 为每个竞赛类型创建系列
      ["1001", "1002", "1003", "1004", "1005"].forEach((compId) => {
        series.push({
          name: this.competitionNames[compId] || compId,
          type: "line",
          smooth: true,
          data: sortedData.map((item) => parseInt(item[compId]) || 0),
          symbolSize: 6,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            opacity: 0.1,
          },
        });
      });

      const option = {
        title: {
          text: "竞赛热度趋势分析",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          formatter: function (params) {
            let result = params[0].axisValue + "<br/>";
            params.forEach((param) => {
              result += `${
                param.seriesName
              }: ${param.value.toLocaleString()}<br/>`;
            });
            return result;
          },
        },
        legend: {
          data: series.map((s) => s.name),
          top: 30,
        },
        grid: {
          top: 80,
          left: 50,
          right: 50,
          bottom: 30,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: years,
          axisLabel: {
            formatter: function (value) {
              return value; // 直接显示年份
            },
          },
        },
        yAxis: {
          type: "value",
          name: "浏览人数",
          axisLabel: {
            formatter: function (value) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return (value / 1000).toFixed(0) + "K";
              }
              return value;
            },
          },
        },
        series: series,
        color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae"],
      };

      this.initChart("heatTrendChart", option);

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });

      // 调试输出
      console.log("Heat data:", this.heatData);
      console.log("Years:", years);
      console.log(
        "Series data:",
        series.map((s) => s.data)
      );
    },
    // 渲染全时段重叠分析图表
    renderFullOverlapChart() {
      const chartDom = document.getElementById("overlapBarChart");
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);

      // 1. 数据处理
      const sortedData = this.overlapData
        .map((item) => ({
          ...item,
          date: new Date(item.年份), // 转换为Date对象用于排序
        }))
        .sort((a, b) => a.date - b.date);

      // 2. 日期格式化
      const dates = sortedData
        .map((item) => {
          try {
            const [year, month, day] = item.年份.split("-");
            const monthNum = parseInt(month, 10);
            const dayNum = parseInt(day, 10);
            return `${year}/${monthNum}/${dayNum}`;
          } catch (e) {
            console.warn("日期解析失败:", item.年份);
            return null;
          }
        })
        .filter((date) => date);

      // 3. 数据准备
      const overlaps = sortedData
        .filter((_, index) => dates[index] !== null)
        .map((item) => parseInt(item.重叠次数));

      // 4. 图表配置
      const option = {
        title: {
          text: "全时段竞赛重叠趋势",
          left: "center",
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const date = params[0].axisValue;
            const value = params[0].data;
            return `<strong>${date}</strong><br/>重叠次数: ${value}`;
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: dates,
          axisLabel: {
            rotate: 45,
            formatter: (value) => {
              const parts = value.split("/");
              return parts.length === 2
                ? `${parts[0].padStart(2, "0")}/${parts[1].padStart(2, "0")}`
                : value;
            },
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          name: "重叠次数",
        },
        series: [
          {
            type: "bar",
            data: overlaps,
            itemStyle: {
              color: (params) => {
                const value = params.data;
                if (value >= 100) return "#ff4d4f";
                if (value >= 50) return "#faad14";
                return "#73d13d";
              },
              borderRadius: [2, 2, 0, 0],
            },
            barWidth: "40%",
          },
        ],
        dataZoom: [
          {
            type: "slider",
            start: 0,
            end: 100,
            bottom: "5%",
            height: 15,
          },
        ],
      };

      this.initChart("overlapBarChart", option);
      myChart.setOption(option);
      window.addEventListener("resize", () => myChart.resize());
    },
    // 渲染重叠图表
    renderOverlapChart() {
      const chartDom = document.getElementById("overlapChart");
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);

      // 1. 数据过滤
      const filteredData = this.overlapData.filter((item) => {
        try {
          const year = parseInt(item.年份.split("-")[0], 10);
          return year === this.selectedYear;
        } catch (e) {
          console.warn("年份解析失败:", item.年份);
          return false;
        }
      });

      // 2. 日期处理
      const dates = filteredData
        .map((item) => {
          try {
            const [year, month, day] = item.年份.split("-");

            // 有效性验证
            if (!year || !month || !day) {
              console.warn("日期格式错误:", item.年份);
              return null;
            }

            // 转换为数字并去除前导零
            const monthNum = parseInt(month, 10);
            const dayNum = parseInt(day, 10);

            // 范围验证
            if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
              console.warn("日期数值异常:", item.年份);
              return null;
            }

            return `${monthNum}/${dayNum}`;
          } catch (e) {
            console.warn("日期解析异常:", item.年份, e);
            return null;
          }
        })
        .filter((date) => date !== null); // 过滤无效日期

      // 3. 数据准备
      const overlaps = filteredData
        .filter((_, index) => dates[index] !== null) // 保持数据与日期对齐
        .map((item) => parseInt(item.重叠次数));

      // 4. 完整图表配置
      const option = {
        title: {
          text: `${this.selectedYear}年竞赛重叠分析`,
          left: "center",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            const date = params[0].axisValue;
            const value = params[0].data;
            return `<strong>${date}</strong><br/>重叠次数: ${value}`;
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: dates,
          axisLabel: {
            rotate: 45,
            formatter: (value) => {
              const parts = value.split("/");
              if (parts.length === 2) {
                // 显示为两位数格式（03/11）
                return `${parts[0].padStart(2, "0")}/${parts[1].padStart(
                  2,
                  "0"
                )}`;
              }
              return value;
            },
            margin: 15,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          name: "重叠次数",
          nameLocation: "end",
          nameTextStyle: {
            padding: [0, 0, 10, 0], // 调整坐标轴名称位置
          },
        },
        series: [
          {
            name: "重叠次数",
            type: "bar",
            data: overlaps,
            itemStyle: {
              color: (params) => {
                const value = params.data;
                if (value >= 30) return "#ff4d4f";
                if (value >= 20) return "#faad14";
                return "#73d13d";
              },
              borderRadius: [3, 3, 0, 0], // 顶部圆角
            },
            barWidth: "60%", // 调整柱宽
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
            zoomLock: true, // 禁止缩放过度
          },
          {
            type: "slider",
            start: 0,
            end: 100,
            bottom: "5%",
            height: 15,
          },
        ],
      };
      this.initChart("overlapChart", option);

      myChart.setOption(option);

      // 5. 响应式处理
      window.addEventListener("resize", () => myChart.resize());

      // 调试信息
      console.log("有效日期数据:", dates);
      console.log("对应数值:", overlaps);
      console.log("原始过滤数据:", filteredData);
    },

    autoSlideSidebar() {
      this.currentIndex = (this.currentIndex + 1) % this.sidebarItems.length;
      console.log("Current Index:", this.currentIndex); // 调试输出
      this.$forceUpdate(); // 强制视图更新
    },

    fetchRecommendItems(type) {
      const payload = { popular: 1, type: type };
      let apiEndpoint = "";
      switch (type) {
        case "community":
          apiEndpoint = "/v1/cmns/search";
          break;
        case "competition":
          apiEndpoint = "comp/v1/search";
          break;
        case "course":
          apiEndpoint = "crs/search";
          break;
        default:
          console.error("未知类型:", type);
          return;
      }
      axios
        .post(apiEndpoint, payload)
        .then((response) => {
          console.log("获取推荐数据成功:", response.data);
          if (response.data && Array.isArray(response.data.list)) {
            // 使用 slice 方法获取前5条数据
            const items = response.data.list.slice(0, 3);
            console.log("推荐详情数据5条:", items);
            this.recommendCards = items.map((item) => {
              const imageUrl =
                type === "community"
                  ? item.communityImageUrl
                  : type === "competition"
                  ? item.competitionImgUrl
                  : item.courseImgUrl;
              // 直接提取名称
              const name =
                type === "community"
                  ? item.communityName
                  : type === "competition"
                  ? item.competitionName
                  : item.courseName;

              return { imageUrl, name }; // 返回一个对象，包含图片和名称
            });
          } else {
            console.error(
              "后端返回的数据格式不正确或 list 属性不存在:",
              response.data
            );
          }
        })
        .catch((error) => {
          console.error(
            "获取数据失败:",
            error.response ? error.response.data : error.message
          );
        });
    },

    initChart(chartId, option) {
      const dom = document.getElementById(chartId);
      if (!dom) return null;

      const chart = echarts.init(dom);
      chart.setOption(option);
      this.chartInstances.set(chartId, chart);

      // 添加resize监听
      const resizeHandler = () => chart.resize();
      window.addEventListener("resize", resizeHandler);

      // 存储清理函数
      const cleanup = () => {
        window.removeEventListener("resize", resizeHandler);
        chart.dispose();
      };
      this.chartCleanupHandlers.push(cleanup);

      return chart;
    },

    // 新增懒加载逻辑
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const chartId = entry.target.id;
              switch (chartId) {
                case "levelChart":
                  this.renderLevelChart();
                  break;
                case "categoryChart":
                  this.renderCategoryChart();
                  break;
                case "organizerChart":
                  this.renderOrganizerChart();
                  break;
                case "durationChart":
                  this.renderDurationChart();
                  break;
                case "timeTrendChart":
                  this.renderTimeTrendChart();
                  break;
                case "heatTrendChart":
                  this.renderHeatTrendChart();
                  break;
                case "overlapBarChart":
                  this.renderFullOverlapChart();
                  break;
                case "overlapChart":
                  this.renderOverlapChart();
                  break;
              }
              entry.target.classList.add("loaded");
              this.observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      // 在nextTick中确保DOM已渲染
      this.$nextTick(() => {
        document.querySelectorAll(".chart-item").forEach((el) => {
          this.observer.observe(el);
        });
      });
    },

    // 推荐板块的热门社区和热门竞赛
    selectSidebarItem(item) {
      this.currentType = item.type;
      if (item.popular) {
        this.fetchRecommendItems(item.type);
      }
    },

    searchCompetitions() {
      const payload = {
        competitionName: this.searchName, // 按竞赛名称搜索
        startDate: this.searchStartDate, // 按开始日期筛选
        endDate: this.searchEndDate, // 按结束日期筛选
        status: this.searchStatus, // 按参赛状态筛选
        level: this.searchLevel, // 按难度级别筛选
      };

      axios
        .post("comp/v1/search", payload)
        .then((response) => {
          if (response.data && Array.isArray(response.data.list)) {
            this.cards = response.data.list; // 更新搜索结果
          } else {
            console.error(
              "后端返回的数据格式不正确或 list 属性不存在:",
              response.data
            );
          }
        })
        .catch((error) => {
          console.error(
            "查询失败:",
            error.response ? error.response.data : error.message
          );
        });
    },

    //获取竞赛数据
    fetchCards() {
      this.loading = true;
      this.error = null;
      // 发送GET请求到后端API
      axios
        .get("/comp/v1/compe")
        .then((response) => {
          // 假设后端返回的数据是一个数组，每个元素都是一个卡片对象
          this.cards = response.data;
        })
        .catch((error) => {
          this.error = "加载卡片数据失败，请稍后再试。";
        })
        .finally(() => {
          this.loading = false;
        });
    },

    //
    toggleDrawer(menu) {
      this.activeDrawer = menu;
    },
    // 保持抽屉打开
    keepDrawerOpen() {
      // 不做任何操作，保持抽屉打开
    },
    onIconClick(iconKey) {
      // 假设你的 iconCategories 对象中的值是后端的 parentId
      console.log(iconKey);
      const parentId = iconKey;

      // 构建后端接口的URL
      const url = `comp/v1/comp/byParentId?parentId=${parentId}`;

      // 发送GET请求到后端接口
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            // 确保后端返回的 list 是数组
            // 成功获取数据，更新前端的卡片数据
            console.log(response.data);
            this.cards = response.data; // 更新为正确的属性名
          } else {
            // 后端返回的数据格式不正确
            console.error("后端返回的数据格式不正确:", response.data);
            this.$message.error("数据加载失败，请稍后再试。");
          }
        })
        .catch((error) => {
          // 请求失败处理
          console.error(
            "获取数据失败:",
            error.response ? error.response.data : error.message
          );
          this.$message.error("数据加载失败，请稍后再试。");
        });
    },
    searchByCategory(categoryId) {
      const competitionSearch = { categoryId };
      axios
        .post("comp/v1/search", competitionSearch, {
          params: {
            pageNum: 1,
            pageSize: 5,
          },
        })
        .then((response) => {
          if (response.data) {
            this.cards = response.data.list;
            this.filteredCards = response.data.list;
          } else {
            console.error("后端返回的数据格式不正确:", response.data);
          }
        })
        .catch((error) => {
          console.error(
            "查询失败:",
            error.response ? error.response.data : error.message
          );
        });
    },
    goToDetail(compId) {
      // 使用路由跳转到CompDetail页面，并传递竞赛ID作为参数
      this.$router.push({ name: "CompDetail", params: { compId: compId } });
    },
  },

  mounted() {
    this.setupIntersectionObserver(); // 新增
    this.fetchCards();
    this.loadCSVData();
    this.loadAllCSVData(); // 修改为加载所有CSV数据
    this.loadHeatData();
    this.fetchHBaseTableOrganizer();
    this.loadOverlapData(); //

    // 在组件挂载时，可以自动获取推荐板块的数据
    this.sidebarItems.forEach((item) => {
      if (item.popular) {
        this.fetchRecommendItems(item.type);
      }
    });
    this.slideInterval = setInterval(this.autoSlideSidebar, 3000); // 每3秒自动切换导航栏索引
    window.addEventListener("resize", this.handleChartResize);
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
    // 清理图表实例
    this.chartCleanupHandlers.forEach((cleanup) => cleanup());
    this.chartCleanupHandlers = [];
    window.removeEventListener("resize", this.handleChartResize);

    // 清理观察者
    if (this.observer) this.observer.disconnect();
  },
};
</script>

<style scoped>
.chart-controls {
  margin: 20px 0;
  text-align: center;
}

.el-radio-group {
  margin-bottom: 20px;
}

.el-radio-button {
  margin: 0 10px;
}

/* 调整图表容器间距 */
.visualization-section > div {
  margin-top: 20px;
}

#overlapBarChart {
  height: 400px !important;
}

@media (max-width: 768px) {
  #overlapBarChart {
    height: 250px !important;
  }
}

.year-selector {
  margin: 15px 0;
  text-align: center;
}

.year-selector .el-select {
  width: 200px;
}

#overlapChart {
  margin-top: 10px;
}

/* 在样式部分添加 */
#heatTrendChart {
  height: 300px !important;
}

.chart-container.full-width {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

/* 图表容器调整 */
/* 修改chart-container样式 */
.chart-container {
  width: 100% !important;
  min-width: 300px;
  margin: 10px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 全宽图表特殊处理 */
.chart-container.full-width {
  width: calc(100% - 20px) !important;
}

.visualization-section {
  margin-bottom: 40px;
}

.chart-container:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .chart-row {
    flex-direction: column;
  }

  .chart-container {
    margin-bottom: 20px;
  }
}

/* 新增的图表布局样式 */
.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.visualization-section {
  margin-bottom: 20px;
}

.visualization-section h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  text-align: center;
}

.chart-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  flex: 1;
  min-width: 0;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.time-heatmap-section {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.time-heatmap-section h3 {
  margin-bottom: 10px;
  text-align: center;
}

/* 确保图表高度一致 */
#levelChart,
#categoryChart,
#organizerChart,
#timeHeatmapChart {
  height: 200px;
}

/* 新增样式系统 */
.competition-platform {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* 粘性搜索栏 */
.sticky-search {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.search-container {
  display: flex;
  gap: 15px;
  max-width: 800px;
  margin: 0 auto;
}

.smart-search {
  flex: 1;
  transition: all 0.3s ease;
}

.advanced-filter {
  background: linear-gradient(135deg, #5a67d8, #7c73e6);
  border: none;
  box-shadow: 0 4px 6px rgba(90, 103, 216, 0.2);
}

/* 优化后的轮播样式 */
/* 推荐模块样式 */
.recommend-section {
  display: flex;
  gap: 0px;
  margin: 10px 0;
  padding: 0px;
  /* background-color: #f9f9f9; */
  background-color: #ffffff;
  box-shadow: 0 8px 16px rgba(223, 190, 190, 0.1);
  border-radius: 15px;
  flex-wrap: wrap;
}

.recommend-container {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  gap: 40px;
  /* 左侧导航与卡片之间的间距 */
}

/* 左侧推荐导航样式 */
.recommend-sidebar {
  width: 220px;
  background-color: #fafafa;
  border-radius: 8px;
  padding: 20px 0;
}

.section-title {
  margin: 0;
  font-size: 20px;
  margin-bottom: 0px;
  color: #7c73e6;
  text-align: center;
}

.recommend-sidebar-item {
  padding: 15px 20px;
  font-size: 17px;
  color: #333333;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.recommend-sidebar-item:hover {
  background-color: #c4c1e0;
  /* 激活状态背景色 */
  color: #7c73e6;
  font-weight: bold;
}

.recommend-sidebar-item.active {
  background-color: #e0e6f8;
  color: #5a67d8;
  font-weight: bold;
  border-left: 5px solid #5a67d8;
}

/* 右侧推荐卡片容器 */
.recommend-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-evenly;
  padding: 0 40px 30px 40px;
  justify-content: center;
  /* 均匀分布卡片 */
  flex: 1;
}

/* 单个推荐卡片样式 */
.recommend-card {
  display: flex;
  flex-direction: column;
  /* 使卡片内容垂直排列 */
  align-items: center;
  /* 水平居中 */
  width: 250px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin-bottom: 0px;
  /* 为卡片添加底部间距 */
}

.recommend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(237, 155, 255, 0.15);
}

/* 数据看板 */
/* 整体布局 */
.visualization-dashboard {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin: 20px 0;
}

.chart-nav {
  margin-bottom: 24px;
  text-align: center;
}

/* 图表容器动效 */
.chart-group {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.chart-item {
  height: 300px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.chart-item.loaded {
  opacity: 1;
  transform: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .chart-group {
    grid-template-columns: 1fr;
  }

  .chart-card {
    margin-bottom: 16px;
  }
}

/* 过渡动画 */
.chart-group-enter-active,
.chart-group-leave-active {
  transition: all 0.5s ease;
}

.chart-group-enter-from,
.chart-group-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.wide {
  grid-column: span 2;
}

.full {
  grid-column: 1 / -1;
}

/* 图标分类样式 */
.icon-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  margin-bottom: 15px;
  max-width: 100%;
  padding: 2px 0px 15px 0px;
  background-color: #ffffff;
  /* 背景色 */
  border-radius: 10px;
  /* border-radius: 10px 10px 0px 0px; */
  /* 圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.icon {
  width: 50px;
  height: 50px;
  margin-bottom: 1px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #5a67d8;
  font-size: 12px;
  transition: all 0.3s ease;
}

.icon-item p {
  font-weight: 500;
  margin: 0;
}

.icon-item:hover {
  cursor: pointer;
  transform: scale(1.15);
}

.icon-container {
  display: flex;
  /* 使用 flexbox 让图片并排 */
  justify-content: center;
  /* 居中对齐 */
  align-items: center;
  /* 垂直居中 */
  margin: 0 auto;
  /* 让整个容器居中 */
  gap: 100px;
  /* 设置图片之间的间距 */
}

.logo {
  width: 23px;
  /* 设置图片宽度 */
  height: auto;
  /* 保持图片宽高比 */
  transition: transform 0.2s;
  /* 添加动画效果（可选） */
}

.logo:hover {
  transform: scale(1.2);
  /* 鼠标悬停放大图片（可选） */
}

/* 竞赛列表 */
.competition-list {
  margin-top: 40px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.competition-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.competition-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(90, 103, 216, 0.15);
}

.card-image {
  height: 200px;
  background: #f8f9fa;
}

.card-content {
  padding: 15px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.date {
  font-size: 0.9em;
  color: #666;
}

/* 骨架屏加载 */
.skeleton-box {
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: 1fr;
  }

  .swiper-slide {
    width: 80% !important;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
