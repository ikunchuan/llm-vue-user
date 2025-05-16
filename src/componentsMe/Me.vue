<template>
    <!-- 新增外层容器 -->
    <div class="outer-layout">
        <!-- 推荐模块移动到主布局左侧 -->
        <!-- 悬浮侧边栏容器 -->
        <div class="floating-sidebar glowing-border" @mouseenter="isExpanded = true" @mouseleave="isExpanded = false">
            <!-- 推荐课程 -->
            <el-card class="sidebar-card neon-card">
                <div class="card-header">
                    <i class="el-icon-notebook-2 highlight-icon"></i>
                    <transition name="fade-slide">
                        <span v-if="isExpanded" class="gradient-text">推荐课程</span>
                    </transition>
                </div>
                <div class="compact-list">
                    <div v-for="(course, index) in recommendedCourses.slice(0, 4)" :key="course.id"
                        class="compact-item hover-glow" @click.stop="viewCourse(course.id)">
                        <div class="item-index">{{ index + 1 }}</div>
                        <div class="item-content">
                            <div class="ellipsis-text" :title="course.title">
                                {{ course.title }}
                            </div>
                            <transition name="fade">
                                <div v-if="isExpanded" class="item-meta">
                                    <el-rate v-model="course.rating" disabled :max="5"
                                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']" class="mini-rate" />
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </el-card>

            <!-- 推荐比赛 -->
            <el-card class="sidebar-card neon-card" style="margin-top: 12px">
                <div class="card-header">
                    <i class="el-icon-trophy highlight-icon"></i>
                    <transition name="fade-slide">
                        <span v-if="isExpanded" class="gradient-text">推荐赛事</span>
                    </transition>
                </div>
                <div class="compact-list">
                    <div v-for="(comp, index) in recommendedCompetitions.slice(0, 4)" :key="comp.id"
                        class="compact-item hover-glow" @click.stop="viewCompetition(comp.id)">
                        <div class="item-index">{{ index + 1 }}</div>
                        <div class="item-content">
                            <div class="ellipsis-text" :title="comp.title">
                                {{ comp.title }}
                            </div>
                            <transition name="fade">
                                <div v-if="isExpanded" class="item-meta">
                                    <i class="el-icon-time fire-icon"></i>
                                    <span class="deadline-text">{{
                                        formatDate(comp.deadline)
                                    }}</span>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>

        <div class="main-layout">
            <el-container class="profile">
                <el-aside width="25%">
                    <el-card class="profile-container">
                        <div class="profile-header">
                            <el-space wrap>
                                <el-popover :width="300"
                                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
                                    <template #reference>
                                        <el-avatar :size="80" :src="getImgUrl(userInfo.userProfilePicture)"
                                            style="margin-left: 10" />
                                    </template>
                                    <template #default>
                                        <div class="demo-rich-conent"
                                            style="display: flex; gap: 16px; flex-direction: column">
                                            <el-avatar :size="80" :src="getImgUrl(userInfo.userProfilePicture)"
                                                style="margin-bottom: 5px" />
                                            <div>
                                                <p style="margin: 0; font-weight: 500">
                                                    {{ userInfo.username }}
                                                </p>
                                                <p style="
                            margin: 0;
                            font-size: 14px;
                            color: var(--el-color-info);
                          ">
                                                    {{ userInfo.userLocal }}
                                                </p>
                                            </div>
                                            <p style="margin: 0">
                                                {{ userInfo.userEmail }}
                                            </p>
                                        </div>
                                    </template>
                                </el-popover>
                                <h3>{{ userInfo.userName }}</h3>
                            </el-space>
                            <p style="font-size: 17px; margin: 10px auto; color: #666">
                                {{ userInfo.userEmail }}
                            </p>

                            <el-row justify="space-evenly" class="follow-fans">
                                <el-col :span="50" class="pointer">
                                    <el-space direction="horizonal" size="2">
                                        <div class="stat-text">关注</div>
                                        &nbsp;
                                        <div class="stat-number">{{ countFollowers() }}</div>
                                    </el-space> </el-col>&nbsp;
                                <el-col :span="50" class="pointer">
                                    <el-space direction="horizonal" size="2">
                                        <div class="stat-text">粉丝</div>
                                        &nbsp;
                                        <div class="stat-number">{{ countFans() }}</div>
                                    </el-space>
                                </el-col>
                            </el-row>
                        </div>

                        <div class="activity-stats">
                            <div class="activity-item">
                                <div style="display: flex; align-items: center">
                                    <img src="../assets/img/64.png" alt="浏览图标" class="activity-icon" />
                                    <span class="activity-text">获得浏览:</span>
                                </div>
                                <span class="activity-number">{{ postView }}</span>
                            </div>
                            <div class="activity-item">
                                <div style="display: flex; align-items: center">
                                    <img src="../assets/img/61.png" alt="点赞图标" class="activity-icon" />
                                    <span class="activity-text">获得点赞:</span>
                                </div>
                                <span class="activity-number">{{ postLike }}</span>
                            </div>
                            <div class="activity-item">
                                <div style="display: flex; align-items: center">
                                    <img src="../assets/img/62.png" alt="收藏图标" class="activity-icon" />
                                    <span class="activity-text">获得收藏:</span>
                                </div>
                                <span class="activity-number">{{ postFavorite }}</span>
                            </div>
                            <div class="activity-item">
                                <div style="display: flex; align-items: center">
                                    <img src="../assets/img/63.png" alt="评论图标" class="activity-icon" />
                                    <span class="activity-text">获得评论:</span>
                                </div>
                                <span class="activity-number">{{ postComment }}</span>
                            </div>
                        </div>

                        <div class="bio-section">
                            <h4 class="bio-title">
                                简介
                                <button class="edit-button" @click="openDialog">
                                    编辑资料
                                </button>
                            </h4>
                            <p class="bio-text">{{ userInfo.userBio }}</p>

                            <button class="knowledge-button" @click="openKnowledgeDialog">
                                个人知识网
                            </button>
                            <div v-if="userInfo.knowledgeNetwork?.length" ref="knowledgeChart"
                                class="compact-knowledge-graph">
                                <!-- 添加加载提示 -->
                                <div v-if="!chartInited" class="graph-loading">
                                    知识网络加载中...
                                </div>
                            </div>
                        </div>

                        <div class="badges">
                            <h4 class="section-title">
                                <img src="../assets/img/60.png" alt="解锁徽章" class="activity-icon" />徽章
                            </h4>
                            <p class="section-text">
                                空空如也, 看看如何<a href="#" class="link">解锁徽章></a>
                            </p>
                        </div>

                        <div class="skills">
                            <h4 class="section-title">
                                <img src="../assets/img/技能树.png" alt="技能" class="activity-icon" />技能
                            </h4>
                            <p>技能树： <span>暂未开启</span></p>
                            <div class="skill-details">
                                <p class="skill-item">理论： <span>0</span></p>
                                <p class="skill-item">应用： <span>0</span></p>
                            </div>
                        </div>

                        <div class="activity">
                            <h4 class="section-title">动态</h4>
                            <p class="section-text">嚯，这个人还没有动静呢</p>
                        </div>
                    </el-card>
                </el-aside>

                <el-main class="right-box" style="padding: 0">
                    <el-card>
                        <div>
                            <el-row justify="space-evenly" style="text-align: center">
                                <el-col :span="4" v-for="(item, index) in items" :key="index" @click="goTo(item.path)"
                                    class="pointer">
                                    <div class="nav-item">{{ item.name }}</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="view-content">
                            <router-view />
                        </div>
                    </el-card>
                </el-main>
            </el-container>
        </div>
    </div>

    <!-- 编辑简介弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="简介编辑" width="500">
        <el-form :model="form" label-position="left" label-width="80px" :rules="rules">
            <el-row :gutter="24">
                <el-col :span="14">
                    <el-form-item v-show="false">
                        <el-input v-model="form.userId" />
                    </el-form-item>

                    <el-form-item label="用户名">
                        <el-input v-model="form.userName" maxlength="20" type="textarea" placeholder="请输入用户名"
                            show-word-limit />
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-select v-model="form.userSex" placeholder="请选择性别">
                            <el-option label="男" value="1" />
                            <el-option label="女" value="2" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input v-model="form.userAge" type="number" placeholder="请选择年龄" :min="1" />
                    </el-form-item>

                    <el-form-item label="电话">
                        <el-input v-model="form.userPhone" type="text" placeholder="请输入邮箱" />
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-input v-model="form.userEmail" type="email" placeholder="请输入邮箱" />
                    </el-form-item>

                    <el-form-item label="所在地">
                        <el-input v-model="form.userLocal" maxlength="50" type="textarea" placeholder="请输入所在地"
                            show-word-limit />
                    </el-form-item>

                    <el-form-item label="简介">
                        <el-input v-model="form.userBio" maxlength="50" type="textarea" placeholder="请输入简介"
                            show-word-limit />
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-upload class="avatar-uploader" action="http://localhost:10086/uis/v1/upload"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.userProfilePicture" :src="getImgUrl(form.userProfilePicture)" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon">
                            <Plus />
                        </i>
                    </el-upload>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <div>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="editProfile">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <!-- 知识网编辑弹窗 -->
    <el-dialog v-model="knowledgeDialogVisible" title="个人知识网" width="700px" @closed="onDialogClosed">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(category, index) in Object.values(knowledgeItems)" :key="index">
                <template #label>
                    <span style="font-weight: bold">{{ category.name }}</span>
                </template>
                <el-checkbox-group v-model="selectedKnowledge" style="padding: 15px">
                    <el-row :gutter="20">
                        <el-col :span="12" v-for="(item, itemIndex) in category.items" :key="itemIndex">
                            <el-checkbox :label="item.name" style="margin: 8px 0">
                                {{ item.name }}
                            </el-checkbox>
                        </el-col>
                    </el-row>
                </el-checkbox-group>
            </el-tab-pane>
        </el-tabs>
        <template #footer>
            <el-button @click="knowledgeDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveKnowledge">保存</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { h } from "vue";
import { ElDivider } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { RouterView } from "vue-router";
import axios from "axios";
import * as echarts from "echarts";
export default {
  data() {
    return {
      isExpanded: false, //推荐栏
      recommendedCourses: [],
      recommendedCompetitions: [],
      name: "ProfilePage",
      spacer: h(ElDivider, { direction: "vertical" }),
      // avatarUrl: this.userInfo.userProfilePicture,

      userInfo: {}, //存储用户数据
      followersInfo: [], //用户关注
      fansInfo: [], //用户粉丝
      form: {}, //编辑资料表单

      loadingRecommendations: false,

      postView: "",
      postLike: "",
      postFavorite: "",
      postComment: "",
      avatarUrl: "https://via.placeholder.com/80", //默认头像

      loading: true,
      dialogFormVisible: false,

      knowledgeChart: null, // 用来存储 ECharts 实例
      chartInited: false, // loading 控制
      knowledgeDialogVisible: false,
      selectedKnowledge: [], // 应该存储知识项名称的字符串数组
      knowledgeItems: {
        programming: {
          name: "编程语言类",
          items: [
            { name: "Python", checked: false },
            { name: "Java", checked: false },
            { name: "C/C++", checked: false },
            { name: "C语言", checked: false },
            { name: "JavaScript基础", checked: false },
            { name: "PLC编程", checked: false },
            { name: "RESTful API", checked: false },
            { name: "NoSQL", checked: false },
            { name: "SQL", checked: false },
          ],
        },
        math: {
          name: "数学基础类",
          items: [
            { name: "高数", checked: false },
            { name: "线性代数", checked: false },
            { name: "统计学", checked: false },
            { name: "数学建模", checked: false },
            { name: "数据分析基础", checked: false },
            { name: "结构力学", checked: false },
            { name: "理论力学", checked: false },
          ],
        },
        systemDesign: {
          name: "系统设计类",
          items: [
            { name: "系统架构", checked: false },
            { name: "UML", checked: false },
            { name: "质量保障", checked: false },
            { name: "算法基础", checked: false },
            { name: "分布式系统", checked: false },
            { name: "系统安全", checked: false },
            { name: "网络基础", checked: false },
          ],
        },
        interdisciplinary: {
          name: "交叉领域",
          items: [
            { name: "金融科技", checked: false },
            { name: "工业自动化", checked: false },
            { name: "医学基础", checked: false },
            { name: "生物信息学", checked: false },
            { name: "物联网技术", checked: false },
            { name: "机器人控制", checked: false },
            { name: "能源工程", checked: false },
          ],
        },
        tools: {
          name: "工具类",
          items: [
            { name: "Axure", checked: false },
            { name: "CAD", checked: false },
            { name: "BIM技术", checked: false },
            { name: "3D建模", checked: false },
            { name: "GIS", checked: false },
            { name: "版本控制", checked: false },
            { name: "数字电路", checked: false },
          ],
        },
        business: {
          name: "商业类",
          items: [
            { name: "市场分析", checked: false },
            { name: "创新创业", checked: false },
            { name: "商业思维", checked: false },
            { name: "财务基础", checked: false },
            { name: "项目管理", checked: false },
            { name: "科研方法论", checked: false },
            { name: "创新方法论", checked: false },
          ],
        },
      },
      items: [
        { name: "创作中心", path: "" },
        { name: "我的收藏", path: "myfavorite" },
        { name: "灵验领航", path: "lingyanlinghang" },
        { name: "浏览记录", path: "browsinghistory" },
      ],
    };
  },

  methods: {
    async fetchRecommendations() {
      try {
        const userId = this.userInfo.userId;
        // 并行请求课程和比赛推荐
        const [coursesRes, competitionsRes] = await Promise.all([
          axios.get(`/recommend/courses?userId=${userId}`),
          axios.get(`/recommend/competitions?userId=${userId}`),
        ]);

        // 处理课程数据映射
        this.recommendedCourses = coursesRes.data.map((course) => ({
          id: course.courseId,
          title: course.courseName,
          description: course.courseDescription,
          rating: course.courseRating,
          tags: [course.courseDifficultyLevel, course.categoryId?.toString()],
        }));

        // 处理比赛数据映射（根据实际API响应结构调整）
        this.recommendedCompetitions = competitionsRes.data.map(
          (competition) => ({
            id: competition.competitionId,
            title: competition.competitionName,
            description: competition.competitionDescription,
            deadline: competition.registrationDeadline,
            tags: [competition.category, competition.difficulty],
          })
        );
      } catch (error) {
        console.error("推荐获取失败:", error);
        this.$message.error("推荐数据加载失败: " + error.message);
      }
    },
    formatDate(dateString) {
      if (!dateString) return "长期有效";
      const date = new Date(dateString);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    },

    // 跳转方法
    viewCourse(courseId) {
      this.$router.push(`/home/CourseDetail/${courseId}`);
    },
    viewCompetition(compId) {
      this.$router.push(`/home/CompDetail/${compId}`);
    },
    //获取图片链接
    getImgUrl(url) {
      if (url === null) {
        return this.avatarUrl;
      } else {
        const touxiang = "http://localhost:10086/images/upload/" + url;
        return touxiang;
      }
    },
    //图片回调
    handleAvatarSuccess(response) {
      console.log(response);
      this.form.userProfilePicture = response;
    },

    goTo(itemPath) {
      this.$router.push("/home/me/" + itemPath);
    },

    // userAvatar() {
    //   if (this.userInfo.userAvatar === null) {
    //     console.log(this.avatarUrl);
    //     return this.avatarUrl;
    //   } else {
    //     console.log(this.avatarUrl);
    //     return this.userInfo.userAvatar;
    //   }
    // },

    openDialog() {
      this.form = {};
      this.form = this.userInfo;
      this.dialogFormVisible = true;
    },

    editProfile() {
      axios.put("/uis/v1/ui", this.form).then(() => {
        this.closeDialog();
        location.reload(); // 刷新页面
      });
    },

    closeDialog() {
      return (this.dialogFormVisible = false);
    },

    countFollowers() {
      if (sessionStorage.userId && sessionStorage.userName) {
        return this.followersInfo.length;
      } else {
        return 0;
      }
    },

    countFans() {
      if (sessionStorage.userId && sessionStorage.userName) {
        return this.fansInfo.length;
      } else {
        return 0;
      }
    },
    async openKnowledgeDialog() {
      this.knowledgeDialogVisible = true;
      // 先拉取后端数据
      const userId = this.userInfo.userId;
      if (!userId) return this.$message.error("用户信息未就绪");
      try {
        const res = await axios.get(`/uis/v1/user/knowledge/${userId}`);
        this.selectedKnowledge = res.data.map(String);
      } catch (err) {
        this.$message.error("获取失败：" + err.message);
      }
    },
    // 弹窗真正打开之后（DOM 已渲染），再初始化图表
    handleKnowledgeOpen() {
      // 确保拉取过 userInfo.knowledgeNetwork
      this.userInfo.knowledgeNetwork = this.selectedKnowledge;
      this.$nextTick(() => this.initCompactKnowledgeGraph());
    },

    // 保存后刷新图表
    async saveKnowledge() {
      try {
        await axios.put("/uis/v1/user/knowledge", {
          userId: this.userInfo.userId,
          knowledge: this.selectedKnowledge,
        });
        this.$message.success("保存成功");
        this.knowledgeDialogVisible = false;

        this.$nextTick(() => {
          this.initCompactKnowledgeGraph();
        });
      } catch (err) {
        this.$message.error("保存失败：" + err.message);
      }
    },
    onDialogClosed() {
      if (this.knowledgeChart) {
        this.knowledgeChart.dispose();
        this.knowledgeChart = null;
      }
      this.initCompactKnowledgeGraph();
    },
    refreshChart() {
      if (this.knowledgeChart) {
        this.knowledgeChart.dispose();
        this.initCompactKnowledgeGraph();
      }
    },
    // 初始化紧凑型知识网络
    initCompactKnowledgeGraph() {
      const chartDom = this.$refs.knowledgeChart;
      if (!chartDom) return;
      // 每次都 init 一个新实例
      this.knowledgeChart = echarts.init(chartDom);

      const { nodes, links } = this.generateGraphData();
      const option = {
        series: [
          {
            type: "graph",
            layout: "force",
            roam: true,
            symbolSize: (d) => d.symbolSize,
            data: nodes.map((n) => ({
              ...n,
              itemStyle: { color: this.getCategoryColor(n.category) },
            })),
            links,
            force: { repulsion: 100, edgeLength: [50, 150] },
            label: {
              show: true,
              position: "right",
              fontSize: 12,
              color: "#333",
            },
            emphasis: {
              scale: true,
              label: {
                show: true,
                fontSize: 14,
                fontWeight: "bold",
              },
              lineStyle: {
                width: 3,
              },
            },
            lineStyle: { curveness: 0.1, width: 1 },
            blur: { itemStyle: { opacity: 0.2 }, label: { color: "#aaa" } },
          },
        ],
      };

      this.knowledgeChart.setOption(option);
      setTimeout(() => this.knowledgeChart.resize(), 100);
      this.chartInited = true;
      // 窗口尺寸变化时自动调整
      window.addEventListener("resize", () => this.knowledgeChart.resize());
    },

    // === 生成 nodes & links ===
    generateGraphData() {
      const nodes = (this.userInfo.knowledgeNetwork || []).map((name) => ({
        name,
        category: this.getCategory(name),
        value: this.calcKnowledgeWeight(name),
        symbolSize: Math.min(30, Math.max(15, name.length * 2)),
      }));

      const links = [];

      // 1. 同类知识连接（使用曲线表示）
      const categoryMap = new Map();
      nodes.forEach((node) => {
        if (!categoryMap.has(node.category)) {
          categoryMap.set(node.category, []);
        }
        categoryMap.get(node.category).push(node);
      });

      categoryMap.forEach((group) => {
        // 同类节点形成星型结构，连接到中心节点
        if (group.length > 1) {
          const centerNode = group.reduce((prev, curr) =>
            prev.value > curr.value ? prev : curr
          );

          group.forEach((node) => {
            if (node.name !== centerNode.name) {
              links.push({
                source: centerNode.name,
                target: node.name,
                lineStyle: {
                  curveness: 0.2,
                  color: this.getCategoryColor(node.category),
                },
              });
            }
          });
        }
      });

      // 2. 跨类强关联连接
      const strongConnections = [
        // 编程语言与数学
        ["Python", "数据分析基础"],
        ["Java", "系统架构"],
        ["C/C++", "算法基础"],
        // 系统设计与工具
        ["系统架构", "UML"],
        ["质量保障", "版本控制"],
        // 交叉领域与其他
        ["金融科技", "市场分析"],
        ["工业自动化", "PLC编程"],
      ];

      strongConnections.forEach(([source, target]) => {
        if (
          nodes.some((n) => n.name === source) &&
          nodes.some((n) => n.name === target)
        ) {
          links.push({
            source,
            target,
            lineStyle: {
              type: "dashed",
              curveness: 0.3,
              color: "#888",
            },
          });
        }
      });

      // 3. 高频知识互连（前20%的知识点互连）
      const topNodes = [...nodes]
        .sort((a, b) => b.value - a.value)
        .slice(0, Math.ceil(nodes.length * 0.2));

      topNodes.forEach((a, i) => {
        topNodes.slice(i + 1).forEach((b) => {
          // 只有不同类别的才连接
          if (a.category !== b.category) {
            links.push({
              source: a.name,
              target: b.name,
              lineStyle: {
                width: 2,
                curveness: 0.1,
              },
            });
          }
        });
      });

      return { nodes, links };
    },

    // 简单模拟权重
    calcKnowledgeWeight(name) {
      const baseWeight = name.length * 2; // 基础权重
      const randomFactor = 0.5 + Math.random(); // 0.5-1.5随机因子
      return Math.round(baseWeight * randomFactor);
    },

    // 获取分类颜色列表
    getCategory(name) {
      const cats = Object.values(this.knowledgeItems);
      for (let i = 0; i < cats.length; i++) {
        if (cats[i].items.some((item) => item.name === name)) {
          return i; // 也可以 return cats[i].name
        }
      }
      return -1; // 默认
    },

    // 根据 category 索引/名称 返回颜色
    getCategoryColor(category) {
      const colors = [
        "#5A67D8",
        "#17C964",
        "#FFA726",
        "#E53935",
        "#00BFFF",
        "#FF69B4",
        "#8A2BE2" /* 可扩充 */,
      ];
      return colors[category] || "#999999";
    },
  },

  mounted() {
    const userId = sessionStorage.userId;
    const chartDom =
      this.$refs.knowledgeChart ||
      document.querySelector(".compact-knowledge-graph");
    this.fetchRecommendations();

    if (!userId) {
      //未登录重定向到注册
      this.$router.push("/login");
    }

    // 确保在数据加载完成后知识网络初始化
    axios
      .get(`/uis/v1/ui/${userId}`)
      .then((userRes) => {
        this.userInfo = userRes.data;
        return axios.get(`/uis/v1/user/knowledge/${userId}`);
      })
      .then((knowledgeRes) => {
        this.userInfo.knowledgeNetwork = knowledgeRes.data;
        return this.$nextTick();
      })
      .then(() => this.initCompactKnowledgeGraph())
      .catch(console.error);

    axios
      .get(`/uis/v1/ui/${userId}`)
      .then((response) => {
        console.log("User data:", response.data);
        this.userInfo = response.data;
        this.fetchRecommendations(); // 在这里调用推荐方法
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        this.loading = false;
      });

    axios
      .get(`/uis/v1/user/follower/${userId}`)
      .then((response) => {
        console.log("follower data:", response.data);
        this.followersInfo = response.data;
        console.log(this.followersInfo.length);
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        this.loading = false;
      });

    axios
      .get(`/uis/v1/user/fans/${userId}`)
      .then((response) => {
        console.log("fans data:", response.data);
        this.fansInfo = response.data;
        console.log(this.fansInfo.length);
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        this.loading = false;
      });

    axios
      .get(`/v1/posts/post/allview/${userId}`)
      .then((response) => {
        console.log("postview data:", response.data);
        this.postView = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get(`/v1/posts/post/alllike/${userId}`)
      .then((response) => {
        console.log("postlike data:", response.data);
        this.postLike = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    axios
      .get(`/v1/posts/post/allfavorite/${userId}`)
      .then((response) => {
        console.log("postfavorite data:", response.data);
        this.postFavorite = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error("Errorfetching user data:", error);
      });

    axios
      .get(`/v1/posts/post/allcomment/${userId}`)
      .then((response) => {
        console.log("postcomment data:", response.data);
        this.postComment = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    // 在原有mounted中添加知识网数据初始化
    axios
      .get(`/uis/v1/ui/${userId}`)
      .then((response) => {
        console.log("用户基本信息:", response.data);
        this.userInfo = response.data;

        // 用户信息加载完成后再获取知识网
        return axios.get(`/uis/v1/user/knowledge/${this.userInfo.userId}`);
      })
      .then((response) => {
        console.log("知识网初始化数据:", response.data);
        this.userInfo.knowledgeNetwork = response.data || [];
      })
      .catch((error) => {
        console.error("初始化数据获取失败:", error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  components: {
    Plus,
    ElDivider,
  },
};
</script>

<style>
/* 确保复选框选中状态可见 */
.empty-recommend {
  padding: 20px;
  text-align: center;
  color: #909399;
  font-size: 14px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
/* 确保复选框样式正确应用 */
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #409eff !important;
  border-color: #409eff !important;
}

:deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #409eff !important;
}

:deep(.el-checkbox__inner::after) {
  border-color: #fff !important;
}

/* 响应式调整 */
.outer-layout {
  display: flex;
  max-width: 1800px;
  margin: 20px auto;
  gap: 20px;
  align-items: stretch;
  /* 新增：确保子元素等高 */
}

/* 左侧推荐容器 */
/* 悬浮侧边栏 */
.floating-sidebar {
  position: fixed;
  left: 0;
  top: 80px;
  /* 根据导航栏高度调整 */
  width: 500px;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    width: 240px;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.08);
  }
}

.sidebar-card {
  margin: 0 8px 8px;
  border: none;

  :deep(.el-card__body) {
    padding: 12px !important;
  }
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  i {
    font-size: 18px;
    color: #666;
    margin-right: 6px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
  }
}

.compact-list {
  max-height: 60vh;
  overflow-y: auto;
}

.compact-item {
  display: flex;
  margin: 6px 0;
  padding: 6px;
  border-radius: 4px;
  background: #f8f9fa;
  transition: background 0.3s;

  &:hover {
    background: #e9f4ff;
  }
}

.item-index {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: #e1e6eb;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  flex-shrink: 0;
  margin-right: 8px;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.ellipsis-text {
  font-size: 12px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  margin-top: 4px;

  .mini-rate {
    :deep(.el-rate__icon) {
      font-size: 12px;
      margin-right: 2px;
    }
  }

  .mini-icon {
    font-size: 12px;
    color: #999;
    margin-right: 4px;
  }

  .mini-text {
    font-size: 11px;
    color: #888;
  }
}

/* 动态呼吸边框 */
.glowing-border {
  position: fixed;
  left: 0;
  top: 120px;
  width: 90px;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.9),
    rgba(245, 245, 245, 0.9)
  );
  box-shadow: 0 0 12px rgba(0, 102, 255, 0.2);
  border-radius: 0;

  &:hover {
    width: 300px;
    box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    background: #2600ff;

    border-radius: inherit;
    animation: borderGlow 3s linear infinite;
    opacity: 0.5;
  }
}

/* 高亮图标 */
.highlight-icon {
  font-size: 24px !important;
  color: #0066ff !important;
  text-shadow: 0 0 8px rgba(0, 102, 255, 0.3);
  transition: all 0.3s;
}

/* 动态序号 */
.item-index {
  background: linear-gradient(45deg, #0066ff, #00ccff);
  color: white !important;
  font-weight: bold;
  box-shadow: 0 2px 6px rgba(0, 102, 255, 0.2);
  animation: pulse 1.5s infinite;
}

/* 截止时间文字特效 */
.deadline-text {
  color: #ff4500;
  font-weight: 300;
  text-shadow: 0 0 4px rgba(255, 69, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 主体内容适配 */
.main-content {
  margin-left: 56px;
  /* 侧边栏宽度 + 间距 */
  transition: margin 0.3s;

  .floating-sidebar:hover + & {
    margin-left: 256px;
  }
}

/* 主布局样式 */
.main-layout {
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(239, 239, 239, 0.1);
  width: 1300px;
  margin: 20px auto;
}

/* 左侧样式 */
.profile {
  background-color: #f3f3f3;
  border-right: 2px solid #e5e7eb;
  padding: 10px;
  border-radius: 8px 0 0 8px;
}

.profile-container {
  height: auto;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  border-radius: 8px;
  border: none;
}

.profile-header {
  text-align: left;
  margin-bottom: 20px;
}

.user-email {
  font-size: 14px;
  color: #6b7280;
  margin-top: 10px;
}

.stat {
  text-align: center;
  margin-top: 10px;
}

.stat-text {
  font-size: 14px;
  color: #6b7280;
}

.stat-number {
  font-size: 20px;
  font-weight: bold;
  color: #4f46e5;
}

/* 父容器样式 */
.activity-stats {
  margin-top: 5px;
  display: grid;
  /* 使用网格布局，方便调整样式 */
  grid-template-columns: repeat(1, 1fr);
  /* 单列对齐 */

  padding: 3px;
  border-radius: 8px;
  background-color: #f9f9f9;
  /* 背景色 */
}

/* 单个统计项容器样式 */
.activity-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  transition: all 0.3s ease;
  /* 添加动画效果 */
}

/* 鼠标悬停效果 */
.activity-item:hover {
  background-color: #e5f4ff;
  /* 浅蓝背景 */
  border-color: #3b82f6;
  /* 深蓝边框 */
  box-shadow: 0 3px 3px rgba(59, 130, 246, 0.2);
  /* 浮动效果 */
}

/* 图标样式 */
.activity-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

/* 文本样式 */
.activity-text {
  font-size: 16px;
  color: #374151;
  /* 深灰色 */
  font-weight: bold;
}

/* 数字样式 */
.activity-number {
  font-size: 16px;
  font-weight: bold;
  color: #3b82f6;
  /* 深蓝色 */
}

/* 右侧样式 */

.right-box {
  height: auto;
  width: 75%;
  overflow: hidden;
}

.view-content {
  height: 100%;
}

.nav-container {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.nav-item {
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-item:hover {
  background-color: #4f46e5;
  color: #ffffff;
  border-color: #4f46e5;
}

/* 按钮优化 */
.el-button--primary {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.el-button--primary:hover {
  background-color: #4338ca;
  border-color: #4338ca;
}

/* 简介部分 */
.bio-section {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.bio-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  /* 标题字体大小统一为 16px */
  color: #374151;
  margin: 0;
  /* 去掉标题多余的外边距 */
  font-weight: 600;
  /* 半粗字体，增强层次感 */
}

.edit-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 4px 10px;
  /* 减小按钮尺寸 */
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.edit-button:hover {
  background-color: #4338ca;
}

.bio-text {
  margin-top: px;
  /* 控制与标题的间距 */
  font-size: 14px;
  /* 内容字体大小 */
  color: #555;
  /* 内容字体颜色 */
  line-height: 1.5;
  /* 行高，便于计算两行高度 */
  overflow: hidden;
  /* 超出内容隐藏 */
  display: -webkit-box;
  /* 必须设置为弹性盒子 */
  -webkit-line-clamp: 2;
  /* 限制显示两行 */
  -webkit-box-orient: vertical;
  /* 垂直排列 */
  word-break: break-word;
  /* 防止单词溢出 */
}

/* 徽章、技能、动态部分 */
.badge-title,
.skill-title,
.activity-title {
  font-size: 16px;
  /* 标题字体统一为 16px */
  font-weight: 600;
  /* 半粗 */
  color: #374151;
  /* 深灰色 */
  margin-bottom: 3px;
  /* 标题与内容间距适中 */
}

.badge-text,
.skill-text,
.activity-text {
  font-size: 14px;
  /* 内容字体调整为 14px，统一大小 */
  color: #6b7280;
  /* 中灰色 */
  line-height: 1.5;
  /* 行间距适中 */
  margin-bottom: 1px;
  /* 段落间距 */
}

/* 链接样式 */
.badge-link,
.skill-link,
.activity-link {
  color: #4f46e5;
  /* 蓝紫色 */
  text-decoration: none;
  font-weight: 600;
  /* 半粗，突出链接 */
}

.badge-link:hover,
.skill-link:hover,
.activity-link:hover {
  text-decoration: underline;
  color: #4338ca;
  /* 深蓝紫色 */
}

/* 调整段落和模块之间的间距 */
.bio-section,
.badges,
.skills,
.activity {
  margin-bottom: 16px;
  /* 模块之间的间距统一调整为 16px */
}

/* 知识网按钮样式 */
.knowledge-button {
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  margin-top: 10px;
  width: 100%;
}

.knowledge-button:hover {
  background-color: #4338ca;
  transform: translateY(-2px);
}

/* 知识网展示区域 */
.knowledge-network {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.knowledge-item {
  background-color: #e1f0ff;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 14px;
  color: #1a4b8c;
  font-weight: 500;
  /* 中等粗细字体 */
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15px;
  border: 1px solid #b8d4ff;
  /* 添加浅蓝色边框 */
}

.knowledge-item:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #d0e7ff;
}

.empty-knowledge {
  margin-top: 15px;
  padding: 15px;
  text-align: center;
  color: #999;
  font-size: 14px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* 响应式设计 - 小屏幕时改为单列 */
@media (max-width: 768px) {
  .knowledge-network {
    grid-template-columns: 1fr;
  }
}

/* 添加加载动画 */
.graph-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #7c73e6;
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-icon-loading {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 确保图表容器可见 */
.compact-knowledge-graph {
  height: 250px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
