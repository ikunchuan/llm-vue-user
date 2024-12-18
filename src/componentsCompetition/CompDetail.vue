<template>
  <!-- 根模板，包含整个布局 -->
  <div class="container">

    <!-- 主内容区域 -->
    <div class="main">
      <!-- 左侧内容区 -->
      <aside class="left-panel">
        <!-- 左侧标题 -->
        <div class="title">{{ competitionDetail.competitionName }}</div>
        <!-- 左侧内容块 -->
        <div class="box">
          <p>竞赛开始时间：{{ formatDate(competitionDetail.startDate) }}</p>
          <p>竞赛结束时间：{{ formatDate(competitionDetail.endDate) }}</p>
          <p>官方报名链接：{{ competitionDetail.competitionUrl }}</p>
          <el-button type="primary" @click="toggleFavorite">收藏竞赛</el-button>

        </div>
        <div class="box">
          <div class="anchor-nav">
            <a href="#" @click.prevent="scrollTo('schedule')">竞赛日程安排</a>
            <a href="#" @click.prevent="scrollTo('details')">竞赛详情</a>
            <!-- 根据需要添加更多锚点 -->
          </div>
        </div>
      </aside>

      <!-- 右侧内容区 -->
      <section class="right-panel">
        <!-- 右侧顶部内容 -->
        <div class="header"></div>

        <!-- 右侧主内容 -->
        <!--知识树-->
        <div class="tree">
          <div class="left">
            <span class="left-up">{{ competitionDetail.competitionName }}</span>
          </div>
          <div class="right-up">
            <ul class="three-parts">


              <li>
                <a @click="goToCourseDetailb">{{ recommendedCourseNameb || 1 }}</a>
                <a @click="goToCourseDetailc">{{ recommendedCourseNamec || 1 }}</a>
              </li>
              <li>
                <a @click="goToCourseDetaild">{{ recommendedCourseNamed || 1 }}</a>
                <a @click="goToCourseDetaile">{{ recommendedCourseNamee || 1 }}</a>
                <a @click="goToCourseDetailf">{{ recommendedCourseNamef || 1 }}</a>
              </li>
            </ul>
          </div>

          <div class="line">
          </div>


          <div class="right-down">
            <ul class="three-columns">

              <li>

                <a @click="goToCourseDetail">{{ recommendedCourseName || 失败 }}</a>
                <a @click="goToCourseDetaili">{{ recommendedCourseNamei || 1 }}</a>
              </li>

              <li>
                <a @click="goToCourseDetailg">{{ recommendedCourseNameg || 1 }}</a>
                <a @click="goToCourseDetailh">{{ recommendedCourseNameh || 1 }}</a>

              </li>
            </ul>
          </div>
        </div>


        <div class="content">
          <div class="steps-container">
            <el-steps style="max-width: 600px" :active="1">
              <el-step title="未开始" description="摩拳擦掌" />
              <el-step title="进行中" description="火热报名中" />
              <el-step title="已结束" description="来年再战" />
            </el-steps>
          </div>

          <!-- 竞赛名称 -->
          <div class="info-item">竞赛名称：<span class="info-content">{{ competitionDetail.competitionName }}</span></div>

          <!-- 竞赛描述 -->
          <div class="info-item">竞赛描述：<span class="info-content">{{ competitionDetail.competitionDescription }}</span>
          </div>

          <!-- 竞赛主办方 -->
          <div class="info-item">竞赛主办方：<span class="info-content">{{ competitionDetail.competitionOrganizer }}</span>
          </div>

          <!-- 截止日期 -->
          <div class="info-item">截止日期：<span class="info-content">{{ formatDate(competitionDetail.registrationDeadline)
              }}</span>
          </div>

          <!-- 竞赛日程安排 -->
          <div class="info-item" id="schedule">竞赛日程安排：<span class="info-content">{{
            competitionDetail.competitionSchedule }}</span></div>

          <!-- 竞赛详情 -->
          <div class="info-item" id="details">
            <div v-html="competitionDetail.detail"></div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
export default {
  name: 'CompDetail',
  data() {
    return {
      competitionDetail: {}, // 存储竞赛详情数据
      loading: true,        // 加载状态
      error: null,           // 错误信息
      headerImageUrl: '',// 后端传入的图片URL
      recommendedCourseName: '', // 存储推荐课程的名称
      recommendedCourseNameb: '', // 存储推荐课程的名称b
      recommendedCourseNamec: '',
      recommendedCourseNamed: '',
      recommendedCourseNamee: '',
      recommendedCourseNamef: '',
      recommendedCourseNameg: '',
      recommendedCourseNameh: '',
      recommendedCourseNamei: '',
      courseMapping: {           //下方左侧第一个
        '1': 2,  // 竞赛ID 1 对应 课程ID2
        '2': 1,  // 竞赛ID 2 对应 课程ID 1
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '24': 2,  // 竞赛ID 24 对应 课程ID 2
        // 可以继续添加更多映射
      },
      courseMappingb: {     //上方左侧第一个
        '1': 5,  // 竞赛ID 1 对应 课程ID 5
        '2': 2,  // 竞赛ID 2 对应 课程ID 1
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '24': 3,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappingc: {   //上方左侧第二个
        '1': 6,  // 竞赛ID 1 对应 课程ID 5
        '2': 4,  // 竞赛ID 2 对应 课程ID 1
        '3': 4,
        '4': 5,
        '5': 6,
        '6': 7,
        '24': 4,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappingd: {   //上方右侧第一个
        '1': 7,  // 竞赛ID 1 对应 课程ID 5
        '2': 5,  // 竞赛ID 2 对应 课程ID 1
        '3': 5,
        '4': 6,
        '5': 7,
        '6': 8,
        '24': 9,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappinge: {    //上方右侧第二个
        '1': 8,  // 竞赛ID 1 对应 课程ID 5
        '2': 9,  // 竞赛ID 2 对应 课程ID 1
        '3': 1,
        '4': 7,
        '5': 8,
        '6': 9,
        '24': 10,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappingf: {    //上方右侧第三个
        '1': 9,  // 竞赛ID 1 对应 课程ID 5
        '2': 10,  // 竞赛ID 2 对应 课程ID 1
        '3': 8,
        '4': 8,
        '5': 9,
        '6': 10,
        '24': 11,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappingg: {//下方右侧第一个
        '1': 10,  // 竞赛ID 1 对应 课程ID 5
        '2': 11,  // 竞赛ID 2 对应 课程ID 1
        '3': 9,
        '4': 9,
        '5': 10,
        '6': 11,
        '24': 12,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappingh: {//下方右侧第二个
        '1': 11,  // 竞赛ID 1 对应 课程ID 5
        '2': 12,  // 竞赛ID 2 对应 课程ID 1
        '3': 10,
        '4': 10,
        '5': 1,
        '6': 11,
        '24': 13,  // 竞赛ID 24 对应 课程ID 2
      },
      courseMappingi: {//下方左侧第二个
        '1': 11,  // 竞赛ID 1 对应 课程ID 5
        '2': 12,  // 竞赛ID 2 对应 课程ID 1
        '3': 6,
        '4': 4,
        '5': 7,
        '6': 8,
        '24': 14,  // 竞赛ID 24 对应 课程ID 2
      },


    };
  },
  created() {
    this.fetchCompetitionDetail(); // 在组件创建时获取竞赛详情
    this.fetchCourse();
  },
  methods: {


    // 获取课程信息
    fetchCourse() {
      this.$http.get(`http://localhost:10086/crs/v1`)
        .then(response => {
          this.courseinfo = response.data;
          //  courseinfo 是一个数组，每个元素都是一个课程对象
          const course = this.courseinfo.find(course => course.courseId === this.courseMapping[this.$route.params.compId]);
          const courseb = this.courseinfo.find(course => course.courseId === this.courseMappingb[this.$route.params.compId]);
          const coursec = this.courseinfo.find(course => course.courseId === this.courseMappingc[this.$route.params.compId]);
          const coursed = this.courseinfo.find(course => course.courseId === this.courseMappingd[this.$route.params.compId]);
          const coursee = this.courseinfo.find(course => course.courseId === this.courseMappinge[this.$route.params.compId]);
          const coursef = this.courseinfo.find(course => course.courseId === this.courseMappingf[this.$route.params.compId]);
          const courseg = this.courseinfo.find(course => course.courseId === this.courseMappingg[this.$route.params.compId]);
          const courseh = this.courseinfo.find(course => course.courseId === this.courseMappingh[this.$route.params.compId]);
          const coursei = this.courseinfo.find(course => course.courseId === this.courseMappingi[this.$route.params.compId]);
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
        .catch(error => {
          // 处理错误
        });
    },




    //跳转课程详情页
    goToCourseDetail() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMapping[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
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
        this.$message.error('没有找到对应的课程推荐');
      }
    },

    // 跳转推荐课程i
    goToCourseDetaili() {
      const compId = this.$route.params.compId;
      const courseId = this.courseMappingi[compId];
      if (courseId) {
        this.$router.push({ path: `/home/coursedetail/${courseId}` });
      } else {
        // 如果没有找到对应的课程ID，可以给出提示或者跳转到默认课程
        this.$message.error('没有找到对应的课程推荐');
      }
    },


    // 获取竞赛详情
    fetchCompetitionDetail() {
      const compId = this.$route.params.compId;
      this.$http.get(`http://localhost:10086/comdetail/v1/detail/${compId}`)
        .then(response => {
          this.competitionDetail = response.data;
        })
        .catch(error => {
          this.error = error.message;
        });
    },
    scrollTo(anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    //收藏竞赛
    toggleFavorite() {
      const userId = this.getCurrentUserId(); // 假设这个方法返回当前登录用户的ID
      const compId = this.$route.params.compId; // 从路由参数中获取竞赛ID

      if (!userId) {
        this.$message.error('请先登录');
        return;
      }
      this.$http.post(`http://localhost:10086/comp/v1/compe/favorite?userId=${userId}&competitionId=${compId}`)
        .then(response => {
          // 假设后端返回 表示收藏成功
          if (response.data == 1) {
            ElMessage({ message: '收藏成功！', type: "success" });
          } else {
            ElMessage({ message: '收藏失败！', type: "error" });
          }
        })
        .catch((err) => {
          ElMessage({ message: '请求失败，请重试', type: "error" });
        });
    },

    //

    // 假设你有一个获取当前用户ID的方法
    getCurrentUserId() {
      console.log('sessionStorage.userId:', sessionStorage.userId);
      return sessionStorage.userId;
    },
    // 时间格式化方法
    formatDate(date) {
      if (!date) return '-';
      const d = new Date(date);
      return d.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  },

};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

body {
  margin: 0;
  font-family: 'Roboto', Arial, sans-serif;
  background-color: #F4F6F8;
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

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2em;
  color: #c4c1e0;
}

.header p {
  color: #666;
}

.main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* 竞赛信息知识图谱样式 */
.tree {
  position: relative;
  /* 设置相对定位，以便子元素可以相对于此定位 */
  width: 100%;
  width: 720px;
  height: 200px;
}

.left {
  position: absolute;
  /* 设置绝对定位 */
  top: 0;
  /* 靠上 */
  left: 0;
  /* 靠右 */
  width: 100px;
  height: 200px;
}

.left-up {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 200px;

  /* 将span转换为块级元素 */
  display: flex;

  /* 水平和垂直居中 */
  align-items: center;
  justify-content: center;
}

.right-up {
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  /* 设置容器的宽度 */
  height: 100px;
  /* 设置容器的高度 */
  display: flex;
  align-items: center;
  /* 垂直居中整个内容（包括ul），但实际上这里主要是确保ul垂直居中 */
  /* justify-content: center; 不需要，因为ul会占满整个right-up的宽度 */
}

.three-parts {
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* 均分三份 */
  list-style: none;
  /* 去掉列表的默认样式 */
  padding: 0;
  margin: 0;
  height: 100%;
  /* 继承父容器的高度 */
}

.three-parts li {
  display: flex;
  flex-direction: column;
  /* 垂直排列span */
  align-items: center;
  /* 垂直居中span */
  justify-content: space-around;
  /* 均匀分布span，留一些间距 */
  flex: 1;
  /* 让每个li占据相同的空间 */
  text-align: center;
  /* 确保文本居中 */
}

.three-parts span {
  display: inline-block;
  /* 让span可以作为flex项 */
}



.line {
  position: absolute;
  /* 设置绝对定位 */
  top: 100px;
  /* 靠上 */
  right: 0;
  /* 靠右 */
  height: 5px;
  /* 设置高度为1像素 */
  width: 620px;
  /* 设置宽度为100%，即占满父容器的宽度 */
  background-color: black;
  /* 设置背景色为黑色，这样看起来就像一条线 */
}

.right-down {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 680px;
  height: 100px;
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中，用于整个.right-down的内容 */
}

.three-columns {
  display: flex;
  width: 100%;
  justify-content: space-between;
  /* 均分三份 */
  list-style: none;
  /* 去掉列表的默认样式 */
  padding: 0;
  margin: 0;
  height: 100%;
  /* 继承父容器的高度 */
}

.three-columns li {
  display: flex;
  flex-direction: column;
  /* 垂直排列span */
  align-items: center;
  /* 垂直居中span */
  justify-content: space-around;
  /* 均匀分布span，留一些间距 */
  flex: 1;
  /* 让每个li占据相同的空间 */
  text-align: center;
  /* 确保文本居中 */
}

.three-columns span {
  display: inline-block;
  /* 让span可以作为flex项 */
}



/* 左侧内容区样式 */
.left-panel {
  flex: 0 0 35%;
  /* 不增长不缩小，基础宽度为30% */
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  /* 增加内边距 */
  box-sizing: border-box;
  /* 确保padding和border包含在宽度内 */
}

/* 右侧内容区样式 */
.right-panel {
  flex: 1;
  /* 占据剩余空间 */
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  /* 增加内边距 */
  box-sizing: border-box;
  /* 确保padding和border包含在宽度内 */
}

/* 右侧主内容样式 */
.content {
  display: flex;
  /* 启用 Flexbox 布局 */
  flex-direction: column;
  /* 子元素垂直排列 */
  align-items: flex-start;
  /* 默认靠左对齐所有子元素 */
  padding: 20px;
  /* 内边距 */
}

/* 步骤容器样式，确保它居中 */
.steps-container {
  max-width: 600px;
  /* 最大宽度 */
  width: 100%;
  /* 充满父容器宽度 */
  margin: 20px auto;
  /* 上下边距，左右自动，实现水平居中 */
}

/* 信息项样式，确保它们靠左对齐 */
.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  white-space: nowrap;
  /* 禁止换行 */
}

.info-content {
  font-size: 14px;
  color: #666;
  white-space: normal;
  /* 允许内容换行，但不影响标题 */
}

/* 特定信息项的样式，如果需要特殊对齐 */
.special-item {
  text-align: center;
  /* 居中对齐 */
}

.left-panel .title,
.right-panel .header {
  background-color: #c4c1e0;
  color: #fff;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.box {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.anchor-nav a {
  display: block;
  padding: 10px;
  color: #7c73e6;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
}

.anchor-nav a:hover {
  background-color: #e0e0e0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.info-content {
  font-size: 1em;
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
</style>