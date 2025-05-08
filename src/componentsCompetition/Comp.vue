<template>
  <div class="main-layout">


    <!-- 推荐模块 -->
    <section class="recommend-section">
      <h2 class="section-title">🔥 精选推荐</h2>
      <div class="recommend-container">

        <!-- 左侧推荐导航 -->
        <div class="recommend-sidebar">

          <div class="recommend-sidebar-item" v-for="(item, index) in sidebarItems" :key="index"
            :class="{ active: index === currentIndex }" @click="selectSidebarItem(item)">
            {{ item.name }} &nbsp &nbsp 🔥
          </div>
        </div>
        <!-- 右侧推荐卡片 -->
        <div class="recommend-cards">
          <div class="recommend-card" v-for="(card, index) in recommendCards" :key="index">
            <el-image style="width: 250px; height: 170px; border-radius: 8px"
              :src="'http://localhost:10086/images/upload/' + card.imageUrl" fit="cover" class="card-image"></el-image>
            <div class="card-title">{{ card.name }}</div> <!-- 显示卡片名称 -->
          </div>
        </div>
      </div>

    </section>

    <!-- 筛选条件 -->
    <section class="filters-section">
      <h2 class="section-title">🔎筛选你的目标竞赛</h2>

      <div class="filters-container">
        <!-- 竞赛名称搜索框 -->
        <div class="filter-item">
          <el-input placeholder="请输入相应竞赛名称" v-model="searchName" class="search-input"></el-input>
        </div>
        <!-- 开始日期选择器 -->
        <div class="filter-item">
          <el-date-picker v-model="searchStartDate" type="date" placeholder="选择开始日期"
            class="search-input"></el-date-picker>
        </div>
        <!-- 结束日期选择器 -->
        <div class="filter-item">
          <el-date-picker v-model="searchEndDate" type="date" placeholder="选择结束日期"
            class="search-input"></el-date-picker>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="filter-item search-button-item">
        <el-button type="primary" @click="searchCompetitions" class="search-button">搜索</el-button>
      </div>
    </section>
    <!-- 图标分类 -->
    <section class="icon-section">
      <div class="icon-container">
        <div class="icon-item">
          <el-icon class="icon"><img src="../assets/img/1.png" alt="Logo" class="logo"
              @click="onIconClick(1)" /></el-icon>
          <p>创新创业类</p>
        </div>
        <!-- 信息技术与编程类 -->
        <div class="icon-item">
          <el-icon class="icon"><img src="../assets/img/2.png" class="logo" @click="onIconClick(2)" /></el-icon>
          <p>信息技术与编程类</p>
        </div>

        <!-- 数学类 -->
        <div class="icon-item">
          <el-icon class="icon"><img src="../assets/img/3.png" class="logo" @click="onIconClick(3)" /></el-icon>
          <p>数学类</p>
        </div>

        <!-- 经济与管理类 -->
        <div class="icon-item">
          <el-icon class="icon"><img src="../assets/img/4.png" class="logo" @click="onIconClick(4)" /></el-icon>
          <p>经济与管理类</p>
        </div>

        <!-- 语言与文化类 -->
        <div class="icon-item">
          <el-icon class="icon"><img src="../assets/img/5.png" class="logo" @click="onIconClick(5)" /></el-icon>
          <p>语言与文化类</p>
        </div>
      </div>
    </section>
    <!-- 在 comp.vue 的模板中添加以下内容 -->
    <!-- 修改后的图表部分 -->
    <!-- 在 comp.vue 的模板中添加以下内容 -->
    <!-- 修改后的图表部分 -->
    <div class="container">
      <div class="visualization-section">
        <h3>竞赛数据分析</h3>

        <!-- 第一行：两个图表 -->
        <div class="chart-row">
          <div class="chart-container">
            <div id="levelChart" style="width: 100%; height: 200px;"></div>
          </div>
          <div class="chart-container">
            <div id="categoryChart" style="width: 100%; height: 200px;"></div>
          </div>
        </div>
        <!-- 第二行：两个图表 -->
        <div class="chart-row">
          <div class="chart-container">
            <div id="organizerChart" style="width: 100%; height: 200px;"></div>
          </div>
          <div class="chart-container">
            <div id="durationChart" style="width: 100%; height: 200px;"></div>
          </div>
        </div>
        <!-- 第三行：两个图表 -->
        <div class="chart-row">
          <div class="chart-container">
            <div id="timeTrendChart" style="width: 100%; height: 200px;"></div>
          </div>
          <div class="chart-container">
            <div id="overlapBarChart" style="width: 100%; height: 200px;"></div>
          </div>
        </div>
        <!-- 在现有图表部分添加 -->
        <div class="chart-row">
          <div class="chart-container">
            <div id="heatTrendChart" style="width: 100%; height: 300px;"></div>
          </div>
        </div>
        <!-- 第四行：重叠热力图和年份选择器 -->
        <div class="chart-row">
          <div class="chart-container">
            <div class="year-selector-container">
              <el-select v-model="selectedYear" @change="updateOverlapChart" class="year-selector">
                <el-option v-for="year in availableYears" :key="year" :label="year" :value="year">
                </el-option>
              </el-select>
            </div>
            <div id="overlapHeatmap" style="width: 100%; height: 200px;"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 展示卡片 -->
    <section class="cards-section">
      <!-- <h2 class="section-title">📋 竞赛列表</h2> -->
      <div class="card" v-for="(card, index) in cards" :key="index" @click="goToDetail(card.competitionId)">
        <img style="width: 360px; height: 170px" :src="'http://localhost:10086/images/upload/' + card.competitionImgUrl"
          alt="Card Image" />
        <div class="card-title">{{ card.competitionName }}</div>
        <div class="card-info">{{ card.levelName }}</div>
        <div class="card-footer">
          <!-- 动态绑定颜色样式 -->
          <div class="status" :style="{ color: statusColors[card.competitionStatus] || '#333' }">
            {{ card.competitionStatus }}
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- 在 comp.vue 的模板中添加以下内容 -->

</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: "MainLayout",
  data() {
    return {
      heatData: [], // 存储热度分析数据
      competitionNames: {
        '1001': '创新创业类',
        '1002': '信息技术与编程类',
        '1003': '数学类',
        '1004': '经济与管理类',
        '1005': '语言与文化类'
      },
      selectedYear: new Date().getFullYear(),
      availableYears: [],
      levelData: [],
      categoryData: [],
      organizerData: [],
      timeHeatmapData: [],
      durationData: [],
      timeData: [],
      overlapData: [],
      selectedYear: new Date().getFullYear(),
      availableYears: [],

      //推荐板块
      sidebarItems: [
        { name: "热门竞赛", type: "competition", popular: true, recommendCards: [] },
        { name: "热门课程", type: "course", popular: true, recommendCards: [] },
        { name: "热门社区", type: "community", popular: true, recommendCards: [] },
      ],
      recommendCards: [],
      currentType: null,

      iconCategories: {
        '1': 1,
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
      },
      // 展示卡片的内容
      cards: [],
      filteredCards: [],
      currentIndex: 0, // 当前激活的导航索引

      //条件查询数据
      searchName: '',       // 竞赛名称
      searchStartDate: '',  // 开始日期
      searchEndDate: '',    // 结束日期
      searchStatus: '',     // 参赛状态
      searchLevel: '',      // 难度级别

      activeDrawer: null, // 当前激活的抽屉
      cards: [],//存储后端查询后返回数据

      // 参赛状态与颜色的映射
      statusColors: {
        "进行中": "#17C964", // 绿色
        "未开始": "#FFA726", // 橙色
        "已结束": "#E53935"  // 红色
      },
    };
  },
  methods: {
    // 加载CSV数据
    async loadCSVData() {
      try {
        const [levelRes, categoryRes, organizerRes] = await Promise.all([
          fetch('/csv/比赛等级.csv'),
          fetch('/csv/比赛类别.csv'),
          fetch('/csv/比赛主办方.csv'),

        ]);

        this.levelData = this.parseCSV(await levelRes.text());
        this.categoryData = this.parseCSV(await categoryRes.text());
        this.organizerData = this.parseCSV(await organizerRes.text());


        await this.$nextTick();
        this.renderLevelChart();
        this.renderCategoryChart();
        this.renderOrganizerChart();


      } catch (error) {
        console.error('加载CSV数据失败:', error);
        this.$message.error('图表数据加载失败');
      }
    },
    // 新增方法 - 加载所有CSV数据
    async loadAllCSVData() {
      try {
        const [durationRes, timeRes, overlapRes] = await Promise.all([
          fetch('/csv/darution.csv'),
          fetch('/csv/time.csv'),
          fetch('/csv/overlap.csv')
        ]);

        this.durationData = this.parseCSV(await durationRes.text());
        this.timeData = this.parseCSV(await timeRes.text());
        this.overlapData = this.parseCSV(await overlapRes.text());

        // 提取所有可用年份
        this.extractAvailableYears();

        await this.$nextTick();
        this.renderDurationChart();
        this.renderTimeTrendChart();
        this.renderOverlapCharts();
      } catch (error) {
        console.error('加载CSV数据失败:', error);
        this.$message.error('图表数据加载失败');
      }
    },
    async loadHeatData() {
      try {
        const response = await fetch('/csv/pivot_table.csv');
        const csvText = await response.text();
        this.heatData = this.parseCSV(csvText);
        this.renderHeatTrendChart();
      } catch (error) {
        console.error('加载热度数据失败:', error);
        this.$message.error('热度数据加载失败');
      }
    },

    renderHeatTrendChart() {
      const chartDom = document.getElementById('heatTrendChart');
      if (!chartDom) return;

      const myChart = echarts.init(chartDom);

      // 准备数据 - 确保按年份排序
      const sortedData = [...this.heatData].sort((a, b) => {
        return parseInt(a.年份) - parseInt(b.年份);
      });

      // 获取年份数据，确保列名正确
      const years = sortedData.map(item => {
        // 检查数据中的年份列名，可能是"年份"或"year"
        const year = item.年份 || item.year;
        return year ? year.toString() : '';
      }).filter(year => year); // 过滤掉空值

      const series = [];

      // 为每个竞赛类型创建系列
      ['1001', '1002', '1003', '1004', '1005'].forEach(compId => {
        series.push({
          name: this.competitionNames[compId] || compId,
          type: 'line',
          smooth: true,
          data: sortedData.map(item => parseInt(item[compId]) || 0),
          symbolSize: 6,
          lineStyle: {
            width: 3
          },
          areaStyle: {
            opacity: 0.1
          }
        });
      });

      const option = {
        title: {
          text: '竞赛热度趋势分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function (params) {
            let result = params[0].axisValue + '<br/>';
            params.forEach(param => {
              result += `${param.seriesName}: ${param.value.toLocaleString()}<br/>`;
            });
            return result;
          }
        },
        legend: {
          data: series.map(s => s.name),
          top: 30
        },
        grid: {
          top: 80,
          left: 50,
          right: 50,
          bottom: 30,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: years,
          axisLabel: {
            formatter: function (value) {
              return value; // 直接显示年份
            }
          }
        },
        yAxis: {
          type: 'value',
          name: '浏览人数',
          axisLabel: {
            formatter: function (value) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + 'M';
              } else if (value >= 1000) {
                return (value / 1000).toFixed(0) + 'K';
              }
              return value;
            }
          }
        },
        series: series,
        color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae']
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });

      // 调试输出
      console.log('Heat data:', this.heatData);
      console.log('Years:', years);
      console.log('Series data:', series.map(s => s.data));
    },

    // 提取可用年份
    extractAvailableYears() {
      const years = new Set();
      this.overlapData.forEach(item => {
        const date = new Date(item.Date);
        if (!isNaN(date.getTime())) {
          years.add(date.getFullYear());
        }
      });
      this.availableYears = Array.from(years).sort((a, b) => b - a);

      // 如果没有数据，默认使用当前年份
      if (this.availableYears.length === 0) {
        this.availableYears = [this.selectedYear];
      }
    },

    // 新增方法 - 渲染竞赛时长分布图表
    renderDurationChart() {
      const chartDom = document.getElementById('durationChart');
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: '竞赛时长分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        series: [
          {
            name: '时长分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.durationData.map(item => ({
              value: item.数量,
              name: item.时间范围,
              itemStyle: {
                color: this.getDurationColor(item.时间范围)
              }
            }))
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },

    // 新增方法 - 获取时长颜色
    getDurationColor(duration) {
      const colors = {
        '一个月以内': '#FF9AA2',
        '一个月至三个月': '#FFB7B2',
        '三个月至六个月': '#FFDAC1',
        '半年至一年': '#E2F0CB',
        '超过一年': '#B5EAD7'
      };
      return colors[duration] || '#5470C6';
    },

    // 新增方法 - 渲染时间趋势图表
    renderTimeTrendChart() {
      const chartDom = document.getElementById('timeTrendChart');
      const myChart = echarts.init(chartDom);

      // 处理时间数据 - 只取月度数据
      const monthData = this.timeData.filter(item => item.DateType === 'Month');
      const dates = monthData.map(item => item.Date);
      const values = monthData.map(item => parseInt(item.Value));

      const option = {
        title: {
          text: '竞赛时间趋势',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: {
            rotate: 45,
            interval: Math.floor(dates.length / 10) // 显示部分标签避免重叠
          }
        },
        yAxis: {
          type: 'value',
          name: '竞赛数量'
        },
        series: [
          {
            name: '竞赛数量',
            type: 'line',
            smooth: true,
            data: values,
            itemStyle: {
              color: '#8884d8'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(136, 132, 216, 0.5)' },
                { offset: 1, color: 'rgba(136, 132, 216, 0.1)' }
              ])
            }
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },

    // 新增方法 - 渲染重叠竞赛图表
    renderOverlapCharts() {
      this.renderOverlapHeatmap();
      this.renderOverlapBarChart();
    },

    // 新增方法 - 渲染重叠竞赛热力图
    // 更新重叠图表
    updateOverlapChart() {
      this.renderOverlapHeatmap();
    },

    // 修改后的渲染重叠竞赛热力图方法
    renderOverlapHeatmap() {
      const chartDom = document.getElementById('overlapHeatmap');
      const myChart = echarts.init(chartDom);

      // 过滤出选定年份的数据
      const yearData = this.overlapData.filter(item => {
        const itemYear = new Date(item.Date).getFullYear();
        return itemYear === this.selectedYear;
      });

      const types = ['1天', '1周', '1月', '长周期'];
      const months = yearData.map(item => {
        const date = new Date(item.Date);
        return `${date.getMonth() + 1}月`;
      });

      // 为每种类型创建单独的系列
      const series = types.map(type => ({
        name: type,
        type: 'line',
        smooth: true,
        data: yearData.map(item => parseInt(item[type]) || 0),
        symbolSize: 8,
        lineStyle: {
          width: 3
        }
      }));

      const option = {
        title: {
          text: `${this.selectedYear}年竞赛重叠趋势`,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: types,
          top: 30
        },
        grid: {
          top: 80,
          left: 30,
          right: 30,
          bottom: 30,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLabel: {
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '重叠次数'
        },
        series: series
      };

      myChart.setOption(option);
      window.addEventListener('resize', () => myChart.resize());
    },


    // 新增方法 - 渲染重叠竞赛柱状图
    renderOverlapBarChart() {
      const chartDom = document.getElementById('overlapBarChart');
      const myChart = echarts.init(chartDom);

      // 计算各类重叠的总数
      const overlapTypes = ['1天', '1周', '1月', '长周期'];
      const totals = overlapTypes.map(type => {
        return this.overlapData.reduce((sum, item) => sum + (parseInt(item[type]) || 0), 0);
      });

      const option = {
        title: {
          text: '竞赛重叠类型对比',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: overlapTypes
        },
        yAxis: {
          type: 'value',
          name: '重叠次数'
        },
        series: [
          {
            name: '重叠次数',
            type: 'bar',
            data: totals.map((value, index) => ({
              value,
              itemStyle: {
                color: ['#d94e5d', '#eac736', '#50a3ba', '#e3e4e6'][index]
              }
            })),
            label: {
              show: true,
              position: 'top'
            }
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },

    parseCSV(csvText) {
      const lines = csvText.split('\n');
      // 处理可能的换行符和空格
      const headers = lines[0].split(',').map(header => header.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const obj = {};
        // 处理可能包含逗号的值
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        for (let j = 0; j < headers.length; j++) {
          let value = currentline[j] ? currentline[j].trim() : '';
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


    //比赛等级图表
    renderLevelChart() {
      const chartDom = document.getElementById('levelChart');
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '比赛等级分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center'
        },
        series: [
          {
            name: '比赛等级',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.levelData.map(item => ({
              value: item.总计,
              name: item.比赛等级
            }))
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },

    //比赛类别图表
    renderCategoryChart() {
      const chartDom = document.getElementById('categoryChart');
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: '比赛类别分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.categoryData.map(item => item.比赛类别)
        },
        series: [
          {
            name: '数量',
            type: 'bar',
            data: this.categoryData.map(item => item.总计),
            itemStyle: {
              color: function (params) {
                const colorList = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE'];
                return colorList[params.dataIndex % colorList.length];
              }
            }
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },

    //比赛主办方图表
    renderOrganizerChart() {
      const chartDom = document.getElementById('organizerChart');
      const myChart = echarts.init(chartDom);
      // 按计数排序并取前10
      const sortedData = [...this.organizerData]
        .sort((a, b) => b.计数 - a.计数)
        .slice(0, 10);

      const option = {
        title: {
          text: '主办方TOP10',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '主办方',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: sortedData.map(item => ({
              value: item.计数,
              name: item.主办方
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener('resize', function () {
        myChart.resize();
      });
    },

    autoSlideSidebar() {
      this.currentIndex = (this.currentIndex + 1) % this.sidebarItems.length;
      console.log('Current Index:', this.currentIndex); // 调试输出
      this.$forceUpdate(); // 强制视图更新
    },

    fetchRecommendItems(type) {
      const payload = { popular: 1, type: type };
      let apiEndpoint = '';
      switch (type) {
        case 'community':
          apiEndpoint = '/v1/cmns/search';
          break;
        case 'competition':
          apiEndpoint = 'comp/v1/search';
          break;
        case 'course':
          apiEndpoint = 'crs/search';
          break;
        default:
          console.error('未知类型:', type);
          return;
      }
      axios.post(apiEndpoint, payload)
        .then(response => {
          console.log('获取推荐数据成功:', response.data);
          if (response.data && Array.isArray(response.data.list)) {
            // 使用 slice 方法获取前5条数据
            const items = response.data.list.slice(0, 3);
            console.log('推荐详情数据5条:', items);
            this.recommendCards = items.map(item => {
              const imageUrl = type === 'community' ? item.communityImageUrl :
                type === 'competition' ? item.competitionImgUrl :
                  item.courseImgUrl;
              // 直接提取名称
              const name = type === 'community' ? item.communityName :
                type === 'competition' ? item.competitionName :
                  item.courseName;

              return { imageUrl, name }; // 返回一个对象，包含图片和名称

            });
          } else {
            console.error('后端返回的数据格式不正确或 list 属性不存在:', response.data);
          }
        })
        .catch(error => {
          console.error('获取数据失败:', error.response ? error.response.data : error.message);
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
        startDate: this.searchStartDate,  // 按开始日期筛选
        endDate: this.searchEndDate,      // 按结束日期筛选
        status: this.searchStatus,        // 按参赛状态筛选
        level: this.searchLevel           // 按难度级别筛选
      };

      axios.post('comp/v1/search', payload)
        .then(response => {
          if (response.data && Array.isArray(response.data.list)) {
            this.cards = response.data.list; // 更新搜索结果
          } else {
            console.error('后端返回的数据格式不正确或 list 属性不存在:', response.data);
          }
        })
        .catch(error => {
          console.error('查询失败:', error.response ? error.response.data : error.message);
        });
    },

    //获取竞赛数据
    fetchCards() {
      this.loading = true;
      this.error = null;
      // 发送GET请求到后端API
      axios.get('/comp/v1/compe')
        .then(response => {
          // 假设后端返回的数据是一个数组，每个元素都是一个卡片对象
          this.cards = response.data;
        })
        .catch(error => {
          this.error = '加载卡片数据失败，请稍后再试。';
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
      axios.get(url)
        .then(response => {
          if (response.data) { // 确保后端返回的 list 是数组
            // 成功获取数据，更新前端的卡片数据
            console.log(response.data)
            this.cards = response.data; // 更新为正确的属性名

          } else {
            // 后端返回的数据格式不正确
            console.error('后端返回的数据格式不正确:', response.data);
            this.$message.error('数据加载失败，请稍后再试。');
          }
        })
        .catch(error => {
          // 请求失败处理
          console.error('获取数据失败:', error.response ? error.response.data : error.message);
          this.$message.error('数据加载失败，请稍后再试。');
        });
    },
    searchByCategory(categoryId) {
      const competitionSearch = { categoryId };
      axios.post('comp/v1/search', competitionSearch, {
        params: {
          pageNum: 1,
          pageSize: 5
        }
      })
        .then(response => {
          if (response.data) {
            this.cards = response.data.list;
            this.filteredCards = response.data.list;
          } else {
            console.error('后端返回的数据格式不正确:', response.data);
          }
        })
        .catch(error => {
          console.error('查询失败:', error.response ? error.response.data : error.message);
        });
    },
    goToDetail(compId) {
      // 使用路由跳转到CompDetail页面，并传递竞赛ID作为参数
      this.$router.push({ name: 'CompDetail', params: { compId: compId } });
    },
    // searchCompetitions() {
    //   this.filteredCards = this.searchName
    //     ? this.cards.filter(card => card.courseName.includes(this.searchName))
    //     : this.cards;
    // }
  },

  mounted() {
    this.fetchCards();
    this.loadCSVData();
    this.loadAllCSVData(); // 修改为加载所有CSV数据
    this.loadHeatData();

    // 在组件挂载时，可以自动获取推荐板块的数据
    this.sidebarItems.forEach(item => {
      if (item.popular) {
        this.fetchRecommendItems(item.type);
      }
    });
    this.slideInterval = setInterval(this.autoSlideSidebar, 3000);// 每3秒自动切换导航栏索引

  },
  beforeDestroy() {
    clearInterval(this.slideInterval);
  },
};
</script>

<style scoped>
/* 新增样式 */
/* 在样式部分添加 */
#heatTrendChart {
  height: 300px !important;
}

.chart-container.full-width {
  width: 100%;
  margin-left: 0;
  margin-right: 0;
}

/* 年份选择器样式 */
.year-selector-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.year-selector {
  width: 120px;
}

/* 图表容器调整 */
.chart-container {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
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


/* 页面背景 */
body {
  background: linear-gradient(135deg, #fafafa, #ffe9e3);
  margin: 0;
  font-family: Arial, sans-serif;
}

/* 页面顶部 */


/* 外部容器，控制整体布局的宽度和居中 */
.main-layout {
  max-width: 1200px;
  /* 限制页面的最大宽度 */
  margin: 0 auto;
  /* 居中对齐 */
  padding: 5px;
  /* 增加内边距，避免贴边 */
  background-color: #f4f6f8;
  /* 设置背景颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 可选：添加阴影效果 */
  border-radius: 10px;
  /* 可选：添加圆角效果 */
}

/* 推荐模块样式 */
.recommend-section {
  display: flex;
  gap: 0px;
  margin: 10px 0;
  padding: 0px;
  /* background-color: #f9f9f9; */
  background-color: #FFFFFF;
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

  background-color: #E0E6F8;
  color: #5A67D8;
  font-weight: bold;
  border-left: 5px solid #5A67D8;
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

.card-image {
  width: 240px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.card-title {
  font-size: 13px;
  color: #333;
  padding: 0;
  text-align: center;
  visibility: visible;
  /* 确保可见 */
  opacity: 1;
  /* 确保不透明 */
}

/* 筛选条件样式 */
.filters-section {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  justify-content: space-evenly;
  width: 100%;
  /* 占满整个宽度 */
  padding: 25px 0;
  /* 增加上下内边距 */
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin: 10px 0;
  /* 增加上下外边距 */
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  /* 允许内容换行 */
  gap: 10px;
  /* 设置元素之间的间距 */
  justify-content: center;
  /* 水平居中 */
  max-width: 1000px;
  /* 限制最大宽度 */
}

.search-button-item {
  margin-right: 10px;
  /* 将搜索按钮推到最右边 */
}

/* 搜索输入框和日期选择器样式 */
.search-input {
  width: 180px;
  /* 根据需要调整宽度 */
}

/* 搜索按钮样式 */
.search-button {
  padding: 20px 20px;
  /* 增加内边距 */
  font-size: 18px;
  /* 增加字体大小 */
  font-weight: bold;
  /* 加粗字体 */
  color: #ffffff;
  /* 设置文字颜色 */
  background-color: #5A67D8;
  /* 按钮背景色 */
  border: none;
  /* 去掉边框 */
  border-radius: 5px;
  /* 增加圆角 */
  transition: all 0.3s ease;
  /* 平滑过渡效果 */
  cursor: pointer;
  /* 鼠标悬停时显示指针 */
}

.search-button:hover {
  background-color: #4A54C0;
  /* 按钮悬停背景色 */
  box-shadow: 0 15px 25px rgba(96, 48, 147, 0.4);
  /* 悬停时的阴影 */
  transform: translateY(-2px);
  /* 轻微上移，增加点击感 */
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
  color: #5A67D8;
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

/* 展示卡片样式 */
.cards-section {
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin: 0px auto;
  max-width: 1200px;
  /* 限制展示区域的最大宽度 */
}

/* 单个卡片样式 */
.card {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  /* 图片圆角 */
}

.card-title {
  font-size: 1.2em;
  margin: 10px 0;
}

.card-info {
  color: #777;
  font-size: 0.9em;
}

.card-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #e53935;
  font-weight: bold;
}

.rating {
  color: #5a67d8;
}

.status {
  font-size: 15px;
  color: #5a67d8;
  font-weight: bold;
}
</style>