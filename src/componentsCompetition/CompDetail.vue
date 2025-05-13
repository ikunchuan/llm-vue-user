<template>
  <!-- 根模板，包含整个布局 -->
  <div class="container">
    <!-- 主内容区域 -->
    <div class="main">
      <!-- 左侧内容区 -->
      <aside class="left-panel">
        <!-- 标题区块：标题变大，图片放在标题下方 -->
        <div class="title-block">
          <h1 class="large-title">
            {{ competitionBasicInfo.competitionName }}
          </h1>
          <el-image style="width: 330px; height: 170px; border-radius: 8px" :src="'http://localhost:10086/images/upload/' +
            competitionBasicInfo.competitionImgUrl
            " fit="cover" class="card-image"></el-image>
        </div>

        <!-- 原有竞赛时间和链接区域 -->
        <div class="box">
          <p>竞赛开始时间：{{ formatDate(competitionDetail.startDate) }}</p>
          <p>竞赛结束时间：{{ formatDate(competitionDetail.endDate) }}</p>
          <p>官方报名链接：{{ competitionDetail.competitionUrl }}</p>
          <el-button type="primary" @click="toggleFavorite">收藏竞赛</el-button>
        </div>

        <!-- 锚点导航 -->
        <div class="box anchor-nav">
          <a href="#" @click.prevent="scrollTo('schedule')">竞赛日程安排>></a>
          <a href="#" @click.prevent="scrollTo('details')">竞赛详情>></a>
        </div>
        <!-- 新增“相关竞赛”模块 -->
        <div class="box related-competitions">
          <h3>相关竞赛</h3>
          <ul>
            <li v-for="competition in competitionRecommends" :key="competition.competitionId" class="list-item">
              <a @click="gotoCompDetail(competition.competitionId)" class="title">{{ competition.competitionName }}</a>
              <p class="date">
                上线日期：{{ formatDateShort(competition.updatedTime) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- 新增“查看竞赛相关帖子”模块 -->
        <div class="box competition-posts">
          <h3>查看竞赛相关帖子</h3>
          <ul>
            <li v-for="post in relatedPosts" :key="post.id" class="list-item">
              <a @click="navigateToPostDetail(post.postId)" class="title">{{
                post.postTitle
              }}</a>
              <p class="date">
                发布日期：{{ formatDateShort(post.updatedTime) }}
              </p>
            </li>
          </ul>
        </div>
      </aside>

      <!-- 右侧内容区 -->
      <section class="right-panel">
        <!-- 右侧顶部内容 -->
        <div class="header"></div>

        <!-- 右侧主内容 -->
        <!--知识树-->
        <div style="
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 20px;
          ">
          <h3>知识图谱</h3>

        </div>
        <!-- 知识图谱 -->
        <div ref="chartRef" style="width: 100%; height: 500px"></div>
        <!-- <div class="tree">
          <div class="left">
            <span class="left-up">{{ competitionDetail.competitionName }}</span>
          </div>
          <div class="right-up">
            <ul class="three-parts">
              <li>
                <a
                  class="hover-effect recommended-course-link"
                  @click="goToCourseDetailb"
                  >{{ recommendedCourseNameb || 无 }}</a
                >
                <a class="recommended-course-link" @click="goToCourseDetailc">{{
                  recommendedCourseNamec || 无
                }}</a>
              </li>
              <li>
                <a class="recommended-course-link" @click="goToCourseDetaild">{{
                  recommendedCourseNamed || 无
                }}</a>
                <a class="recommended-course-link" @click="goToCourseDetaile">{{
                  recommendedCourseNamee || 无
                }}</a>
                <a class="recommended-course-link" @click="goToCourseDetailf">{{
                  recommendedCourseNamef || 无
                }}</a>
              </li>
            </ul>
          </div>

          <div class="line"></div>

          <div class="right-down">
            <ul class="three-columns">
              <li>
                <a class="recommended-course-link" @click="goToCourseDetail">{{
                  recommendedCourseName || 无
                }}</a>
                <a class="recommended-course-link" @click="goToCourseDetaili">{{
                  recommendedCourseNamei || 无
                }}</a>
              </li>

              <li>
                <a class="recommended-course-link" @click="goToCourseDetailg">{{
                  recommendedCourseNameg || 无
                }}</a>
                <a class="recommended-course-link" @click="goToCourseDetailh">{{
                  recommendedCourseNameh || 无
                }}</a>
              </li>
            </ul>
          </div>
        </div> -->

        <div class="content">
          <!-- <div class="steps-container">
            <el-steps style="max-width: 600px" :active="1">
              <el-step title="未开始" description="摩拳擦掌" />
              <el-step title="进行中" description="火热报名中" />
              <el-step title="已结束" description="来年再战" />
            </el-steps>
          </div> -->

          <!-- 竞赛名称 -->
          <div class="info-item">
            竞赛名称：<span class="info-content">{{
              competitionDetail.competitionName
            }}</span>
          </div>

          <!-- 竞赛描述 -->
          <!-- <div class="info-item">竞赛描述：<span class="info-content">{{ competitionDetail.competitionDescription }}</span>
          </div> -->
          <!-- 竞赛描述 -->
          <div class="info-item">
            <div class="info-label">竞赛描述：</div>
            <div class="info-content">
              {{ competitionDetail.competitionDescription }}
            </div>
          </div>

          <!-- 竞赛主办方 -->
          <div class="info-item">
            竞赛主办方：<span class="info-content">{{
              competitionDetail.competitionOrganizer
            }}</span>
          </div>

          <!-- 截止日期 -->
          <div class="info-item">
            截止日期：<span class="info-content">{{
              formatDate(competitionDetail.registrationDeadline)
            }}</span>
          </div>

          <!-- 竞赛日程安排 -->
          <div class="info-item" id="schedule">
            竞赛日程安排：<span class="info-content">{{
              competitionDetail.competitionSchedule
            }}</span>
          </div>

          <!-- 竞赛详情 -->
          <div class="competition-detail-text" id="details">
            <div v-html="competitionDetail.detail"></div>
          </div>
        </div>

        <!-- 知识图谱 -->
        <!-- <div ref="chartRef" style="width: 100%; height: 600px"></div> -->
      </section>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import * as echarts from "echarts";

export default {
  name: "CompDetail",
  data() {
    return {
      chart: null,
      graphData: {
        nodes: [],
        links: [],
      },

      competitionBasicInfo: {}, // 存储竞赛基本信息
      competitionDetail: {}, // 存储竞赛详情数据
      competitionRecommends: {}, // 存储竞赛推荐数据
      relatedPosts: [], // 存储相关帖子数据
      loading: true, // 加载状态
      error: null, // 错误信息
      headerImageUrl: "", // 后端传入的图片URL
      recommendedCourseName: "", // 存储推荐课程的名称
      recommendedCourseNameb: "", // 存储推荐课程的名称b
      recommendedCourseNamec: "",
      recommendedCourseNamed: "",
      recommendedCourseNamee: "",
      recommendedCourseNamef: "",
      recommendedCourseNameg: "",
      recommendedCourseNameh: "",
      recommendedCourseNamei: "",
    };
  },

  created() {
    this.fetchCompetitionDetail(this.$route.params.compId); // 获取竞赛详情
    this.fetchCompetitionBasicInfo(this.$route.params.compId); // 获取竞赛基本信息

    this.fetchCourse();
  },

  methods: {
    //知识图谱
    fetchData(competitionName) {
      console.log("获取图谱数据", competitionName);
      const name = competitionName;
      const depth = 2; // 或你可以根据需求设置动态值

      // 假设你有一个后端 API 接口：/api/graph
      fetch(
        `http://localhost:10086/comp/v1/graph?name=${encodeURIComponent(
          name
        )}&depth=${depth}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.graphData = data;
          this.initChart(data, name);
        })
        .catch((err) => {
          console.error("获取图谱数据失败", err);
        });
    },

    initChart(graphData, centerName) {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chartRef);
      }

      const option = {
        backgroundColor: '#f8fafc', // 背景色（可改为其他浅色）
        tooltip: { show: false },   // 关闭提示框
        series: [{
          type: 'graph',
          layout: 'force',
          roam: true,               // 允许缩放拖拽
          draggable: true,          // 允许节点拖拽
          focusNodeAdjacency: false,

          // 力引导布局参数
          force: {
            repulsion: 300,        // 节点间斥力（数值越大间距越大）
            edgeLength: [10, 70], // 边长度范围[min,max]
            gravity: 0.01,          // 向心力（数值越大节点越向中心聚集）
            friction: 0.3,        //50 摩擦系数（0-1，数值越大移动越慢）
            layoutAnimation: true,  // 启用布局动画

            // 新增力参数（专业版配置）
            edgeStrength: 0.8,      // 边的作用力强度（0-1）
            nodeStrength: 0.9       // 节点作用力强度（0-1）
          },

          // 标签样式配置
          label: {
            show: true,
            position: 'right',     // 标签位置（'left'/'top'/'bottom'）
            distance: 5,          // 标签与节点距离
            fontSize: 11,          // 基础字号
            fontFamily: 'Arial',
            color: '#334155',       // 文字颜色
            backgroundColor: '#fff',// 标签背景
            borderColor: '#e2e8f0', // 边框颜色
            borderWidth: 2,
            borderRadius: 4,
            padding: [4, 4],       // 标签内边距[垂直,水平]

            // 文字格式化（核心优化）
            formatter: ({ name }) => {
              const maxChars = 8;  // 每行最大字符数
              const lines = [];
              let currentLine = '';

              // 智能分词换行算法
              name.split('').forEach((char, index) => {
                if ((currentLine + char).length > maxChars ||
                  (index > 0 && /[·•]/.test(char))) { // 遇到特定符号强制换行
                  lines.push(currentLine);
                  currentLine = '';
                }
                currentLine += char;
              });
              lines.push(currentLine);

              // 最多显示2行
              return lines.slice(0, 2).join('\n') + (lines.length > 2 ? '...' : '');
            }
          },

          // 节点分类配置
          categories: [
            {
              name: 'Center',
              itemStyle: {
                color: '#7ED321',    // 中心节点颜色
                borderColor: '#7ED323', // 边框颜色
                borderWidth: 5
              }
            },
            {
              name: 'Competition',
              itemStyle: {
                color: '#4f46e5',    // 竞赛节点颜色
                borderColor: '#fff'
              }
            },
            {
              name: 'Skill',
              itemStyle: {
                color: '#F9DC5C',    // 技能节点颜色
                borderColor: '#fff'
              }
            }
          ],

          // 节点数据
          data: graphData.nodes.map((node) => {
            const isCenter = node.name === centerName;
            return {
              id: node.id,
              name: node.name,
              category: isCenter ? 'Center' : node.label,
              symbolSize: isCenter ? 60 : node.label === 'Skill' ? 25 : 36, // 节点尺寸
              itemStyle: {
                borderWidth: isCenter ? 4 : 2  // 边框粗细
              },
              label: {
                fontSize: isCenter ? 14 : 11,    // 字号分级
                fontWeight: isCenter ? 600 : 400, // 字重分级
                color: isCenter ? '#1e3a8a' : '#475569' // 文字颜色分级
              },
              // 新增引力权重配置（核心参数）
              force: {
                repulsion: isCenter ? 0 : 1,       // 中心节点不受斥力影响
                gravity: isCenter ? 5 : 0.8,       // 中心节点获得5倍引力
                edgeStrength: isCenter ? 1.2 : 0.8 // 中心节点连接线更强
              }
            };
          }),

          // 连接线配置
          links: graphData.links.map((link) => ({
            source: String(link.source),
            target: String(link.target),
            lineStyle: {
              color: this.isCenterLink(link, centerName) ? '#93c5fd' : '#e2e8f0', // 连接线颜色分级
              width: 1.5,          // 线宽
              opacity: 0.9,         // 透明度
              curveness: 0.3,        // 弯曲度（0-1）
              weight: this.isCenterLink(link, centerName) ? 2 : 1 // 中心连接线权重更高
            }
          }))
        }]
      };

      // 新增初始化后布局调整（专业技巧）
      setTimeout(() => {
        this.chart.dispatchAction({
          type: 'forceLayout',
          animation: { duration: 1000 },
          config: {
            initLayout: "circular",  // 初始布局为环形
            center: ['50%', '50%']     // 强制中心点位置
          }
        });
      }, 500);
      this.chart.setOption(option);
    },
    // 判断是否连接中心节点的方法
    isCenterLink(link, centerName) {
      const centerNode = this.graphData.nodes.find(n => n.name === centerName);
      return link.source === centerNode.id || link.target === centerNode.id;
    },

    updateChartStyle() {
      if (this.graphData) {
        this.initChart(this.graphData);
      }
    },

    // 获取课程信息
    fetchCourse() {
      axios
        .get(`http://localhost:10086/crs/v1`)
        .then((response) => {
          this.courseinfo = response.data;
          //  courseinfo 是一个数组，每个元素都是一个课程对象
          const course = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMapping[this.$route.params.compId]
          );
          const courseb = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingb[this.$route.params.compId]
          );
          const coursec = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingc[this.$route.params.compId]
          );
          const coursed = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingd[this.$route.params.compId]
          );
          const coursee = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappinge[this.$route.params.compId]
          );
          const coursef = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingf[this.$route.params.compId]
          );
          const courseg = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingg[this.$route.params.compId]
          );
          const courseh = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingh[this.$route.params.compId]
          );
          const coursei = this.courseinfo.find(
            (course) =>
              course.courseId === this.courseMappingi[this.$route.params.compId]
          );
          if (courseb) {
            this.recommendedCourseNameb = courseb.courseName;
          }
          if (course) {
            this.recommendedCourseName = course.courseName;
          }
          if (coursec) {
            this.recommendedCourseNamec = coursec.courseName;
          }
          if (coursed) {
            this.recommendedCourseNamed = coursed.courseName;
          }
          if (coursee) {
            this.recommendedCourseNamee = coursee.courseName;
          }
          if (coursef) {
            this.recommendedCourseNamef = coursef.courseName;
          }
          if (courseg) {
            this.recommendedCourseNameg = courseg.courseName;
          }
          if (courseh) {
            this.recommendedCourseNameh = courseh.courseName;
          }
          if (coursei) {
            this.recommendedCourseNamei = coursei.courseName;
          }
        })
        .catch((error) => {
          // 处理错误
        });
    },

    // 跳转到竞赛详情页面，并强制刷新
    gotoCompDetail(compId) {
      console.log("跳转到竞赛详情页面:", compId);
      this.$router
        .replace({ name: "CompDetail", params: { compId } })
        .then(() => {
          this.$nextTick(() => {
            // 等到 Vue 完成路由跳转后刷新页面
            this.$router.go(0);
          });
        });
    },

    //跳转到帖子详情页
    navigateToPostDetail(postId) {
      console.log("跳转到帖子详情页面:", postId);
      // 检查帖子对象是否有id属性
      if (postId) {
        this.$router.push({
          name: "PostDetail",
          params: { postId: postId },
        });
      } else {
        console.error("帖子ID不存在");
      }
    },

    //跳转课程详情页
    goToCourseDetail() {
      const compId = this.$route.params.compId;
      const courseMapping = this[`courseMapping${courseType}`];
      const courseId = courseMapping[compId];

      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 跳转推荐课程b
    goToCourseDetailb() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingb[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },
    // 跳转推荐课程c
    goToCourseDetailc() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingc[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },
    // 跳转推荐课程d
    goToCourseDetaild() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingd[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 跳转推荐课程e
    goToCourseDetaile() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappinge[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 跳转推荐课程f
    goToCourseDetailf() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingf[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 跳转推荐课程g
    goToCourseDetailg() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingg[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 跳转推荐课程h
    goToCourseDetailh() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingh[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 跳转推荐课程
    goToCourseDetaili() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingi[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error("没有找到对应的课程推荐");
      }
    },

    // 获取竞赛详情
    fetchCompetitionDetail(compId) {
      this.$http
        .get(`comdetail/v1/detail/${compId}`)
        .then((response) => {
          this.competitionDetail = response.data; // 假设后端返回的数据格式正确
          this.loading = false;
        })
        .catch((error) => {
          this.error = "加载竞赛详情失败，请稍后再试。";
          console.error("获取竞赛详情时发生错误:", error);
          this.loading = false;
        });
    },
    // 获取竞赛基本信息
    fetchCompetitionBasicInfo(compId) {
      axios
        .get(`comp/v1/compe/${compId}`) // 注意这里的URL可能需要根据后端实际接口调整
        .then((response) => {
          console.log("competitionBasicInfo", response.data);

          this.competitionBasicInfo = response.data;
          this.categoryId = this.competitionBasicInfo.categoryId; // 设置categoryId
          this.loading = false;
          this.fetchCompetitionsByCategoryId(this.categoryId); // 获取相关竞赛
          this.fetchCommunitiesByCategoryId(this.categoryId); // 获取社区
          this.fetchData(this.competitionBasicInfo.competitionName); // 获取知识图谱数据
        })
        .catch((error) => {
          this.error = "加载竞赛基本信息失败，请稍后再试。";
          console.error("获取竞赛基本信息时发生错误:", error);
          this.loading = false;
        });
    },

    scrollTo(anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },

    //收藏竞赛
    toggleFavorite() {
      const userId = this.getCurrentUserId(); // 假设这个方法返回当前登录用户的ID
      const compId = this.$route.params.compId; // 从路由参数中获取竞赛ID

      if (!userId) {
        this.$message.error("请先登录");
        return;
      }
      axios
        .post(
          `/comp/v1/compe/favorite?userId=${userId}&competitionId=${compId}`
        )
        .then((response) => {
          // 假设后端返回 表示收藏成功
          if (response.data == 1) {
            ElMessage({ message: "收藏成功！", type: "success" });
          } else {
            ElMessage({ message: "收藏失败！", type: "error" });
          }
        })
        .catch((err) => {
          ElMessage({ message: "请求失败，请重试", type: "error" });
        });
    },

    // 根据categoryId获取竞赛
    fetchCompetitionsByCategoryId() {
      if (this.categoryId === null) {
        console.error("categoryId is not defined");
        return;
      }
      axios
        .get(`comp/v1/comp/byParentId?parentId=${this.categoryId}`)
        .then((response) => {
          console.log("相关的竞赛数据:", response.data);
          if (Array.isArray(response.data)) {
            this.competitionRecommends = response.data;
            console.log("处理后的竞赛数据:", this.competitionRecommends);
          } else {
            console.warn("未获取到相关的竞赛或数据格式不正确");
            this.competitionRecommends = [];
          }
        })
        .catch((error) => {
          console.error("查询相关的竞赛错误:", error);
          this.competitionRecommends = [];
        });
    },
    // 根据categoryId获取社区
    fetchCommunitiesByCategoryId() {
      axios
        .get(`v1/cmns/cmn/byParentId`, {
          params: { parentId: this.categoryId },
        })
        .then((response) => {
          console.log("根据categoryId社区数据:", response.data);
          this.communities = response.data;
          if (this.communities.length > 0) {
            this.communityName = this.communities[0].communityId;
            console.log("communityName:", this.communityName);
            this.fetchRelatedPosts(this.communityName);
          }
        })
        .catch((error) => {
          console.error("获取社区时发生错误:", error);
        });
    },

    // 根据communityId获取相关帖子
    fetchRelatedPosts(communityName) {
      axios
        .post(`v1/posts/search`, { params: { communityName } })
        .then((response) => {
          console.log("获取相关帖子的响应:", response.data);
          // 检查 response.data.list 是否存在且不是 undefined
          if (
            response.data &&
            response.data.list &&
            Array.isArray(response.data.list)
          ) {
            const posts = response.data.list;
            this.relatedPosts = posts.map((post) => ({
              postId: post.postId,
              postTitle: post.postTitle, // 确保这里使用正确的字段名
              updatedTime: post.updatedTime,
            }));
          } else {
            console.error("帖子列表未定义或不是数组:", response.data.list);
            this.relatedPosts = []; // 确保相关帖子数组被设置为空数组
          }
        })
        .catch((error) => {
          console.error("获取相关帖子时发生错误:", error);
          this.relatedPosts = []; // 确保相关帖子数组被设置为空数组
        });
    },

    // 假设你有一个获取当前用户ID的方法
    getCurrentUserId() {
      console.log("sessionStorage.userId:", sessionStorage.userId);
      return sessionStorage.userId;
    },
    // 时间格式化方法
    formatDate(date) {
      if (!date) return "-";
      const d = new Date(date);
      return d.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
    formatDateShort(date) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("zh-CN", options); // 格式化为 "YYYY-MM-DD"
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

body {
  margin: 0;
  font-family: "Roboto", Arial, sans-serif;
  background-color: #f4f6f8;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* 左侧内容区样式 */
.left-panel {
  flex: 0 0 30%;
  /* 调整左侧宽度 */
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
}

.left-panel .title-block {
  margin-bottom: 20px;
}

.left-panel .large-title {
  font-size: 2.2em;
  color: #333;
  font-weight: 700;
  margin-bottom: 10px;
}

.left-panel .card-image {
  width: 100%;
  height: 170px;
  border-radius: 8px;
  object-fit: cover;
}

.left-panel .box {
  margin-bottom: 10px;
  background-color: #fafafa;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.left-panel .anchor-nav {
  margin-top: 0px;
}

.left-panel .anchor-nav a {
  display: block;
  padding: 5px 0;
  color: #7c73e6;
  /* 链接颜色统一 */
  text-decoration: none;
  font-size: 16px;
  /* 字体大小统一 */
  font-weight: normal;
  /* 普通字体 */
  margin-bottom: 10px;
}

.left-panel .anchor-nav a:hover {
  background-color: #e0e0e0;
  text-decoration: underline;
  /* 鼠标悬停下划线 */
}

.left-panel .related-competitions h3,
.left-panel .competition-posts h3 {
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
  font-size: 18px;
  /* 标题字体统一 */
}

.left-panel .related-competitions ul,
.left-panel .competition-posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.left-panel .related-competitions li,
.left-panel .competition-posts li {
  margin-bottom: 10px;
}

.left-panel .related-competitions a,
.left-panel .competition-posts a {
  color: #7c73e6;
  /* 链接颜色统一 */
  text-decoration: none;
  font-weight: normal;
  /* 普通字体 */
  font-size: 16px;
  /* 字体大小统一 */
}

.left-panel .related-competitions a:hover,
.left-panel .competition-posts a:hover {
  text-decoration: underline;
  /* 鼠标悬停下划线 */
}

/* 相关竞赛和相关帖子样式 */
.related-competitions ul,
.competition-posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  /* 增加下划线分隔效果 */
  padding-bottom: 10px;
}

.list-item:last-child {
  border-bottom: none;
  /* 去除最后一项的分隔线 */
}

.title {
  display: block;
  font-size: 16px;
  /* 标题字体大小 */
  font-weight: 500;
  /* 半粗字体 */
  color: #7c73e6;
  /* 链接颜色 */
  text-decoration: none;
  white-space: nowrap;
  /* 单行显示 */
  overflow: hidden;
  /* 超出隐藏 */
  text-overflow: ellipsis;
  /* 显示省略号 */
  margin-bottom: 5px;
  /* 标题与日期间距 */
}

.title:hover {
  text-decoration: underline;
  /* 鼠标悬停时添加下划线 */
}

.date {
  font-size: 14px;
  /* 日期字体大小 */
  color: #999;
  /* 日期颜色 */
  margin: 0;
  text-align: right;
  /* 日期靠右对齐 */
  white-space: nowrap;
  /* 禁止换行 */
  flex-shrink: 0;
  /* 防止日期被压缩 */
}

/* 右侧内容区样式 */
.right-panel {
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.steps-container {
  max-width: 600px;
  width: 100%;
  margin: 20px auto;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;
}

.info-content {
  font-size: 14px;
  color: #666;
}

.el-button {
  background-color: #7c73e6;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #ffe9e3;
}

/* 竞赛信息知识图谱样式 */
.tree {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: #7c73e6;
  border-radius: 18px;
}

.left {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 200px;
  color: #fff;
}

.left-up {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-up {
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 100px;
  display: flex;
  align-items: center;
}

.three-parts {
  display: flex;
  width: 100%;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.three-parts li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  text-align: center;
  color: #fff;
}

.line {
  position: absolute;
  top: 100px;
  right: 20px;
  height: 5px;
  width: 620px;
  background-color: #fff;
}

.right-down {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 680px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.three-columns {
  display: flex;
  width: 100%;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
}

.three-columns li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  text-align: center;
  color: #fff;
}

/* 为所有推荐的课程链接添加默认样式 */
.recommended-course-link {
  display: inline-block;
  /* 使链接占据整行 */
  padding: 3px 8px;
  /* 减少内边距 */
  margin: 2px;
  /* 减少外边距 */
  border: 1px solid #ddd;
  /* 添加边框而不是背景色 */
  color: #fff200;
  /* 文字颜色 */
  text-decoration: none;
  /* 去除下划线 */
  border-radius: 4px;
  /* 圆角边框 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* 添加轻微阴影 */
  transition: all 0.3s ease;
  /* 平滑过渡效果 */
  font-weight: 600;
}

/* 链接悬停时的效果 */
.recommended-course-link:hover {
  background-color: #0033fff8;
  /* 悬停时的背景色，更接近白色 */
  border-color: #4d2f2f;
  /* 悬停时的边框颜色 */
  color: #ffffff;
  /* 悬停时的文字颜色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  /* 悬停时的阴影 */
  cursor: pointer;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  line-height: 1.5;
  /* 增加行高，提高阅读体验 */
}

.info-label {
  flex-shrink: 0;
  /* 保持标签（如“竞赛描述：”）不缩放，始终可见 */
  white-space: nowrap;
  /* 保持标签在一行显示 */
  margin-right: 10px;
  /* 与内容部分保持一定间距 */
  width: 70px;
}

.info-content {
  flex-grow: 1;
  /* 内容部分占据剩余空间 */
  white-space: normal;
  /* 允许换行 */
  word-wrap: break-word;
  /* 长单词或URL可以被截断并换行 */
  overflow-wrap: break-word;
  /* 确保长文本可以换行 */
}

.competition-detail-text {
  width: 100%;
  /* 设置宽度为100%，占据整个容器 */
  max-width: 800px;
  /* 设置最大宽度，可以根据需要调整 */
  margin: 20px auto;
  /* 居中显示 */
  padding: 10px;
  border-radius: 8px;
  /* 圆角边框 */
  word-wrap: break-word;
  /* 允许在单词内换行 */
  overflow-wrap: break-word;
  /* 允许在单词内换行 */
  font-size: 16px;
  color: #666;
}
</style>
