<template>
    <div class="container">
      <!-- 顶部区域 -->
     
      <!-- <div class="header-section">
      <h1>灵验伴您一路学习成长</h1>
      <div class="form-section">
        <div class="input-group">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c0 2.302-1.533 4.38-3.84 5.44C6.727 13.32 5.194 11.243 5.194 8.94c0-1.603 1.123-2.94 2.532-2.94 1.408 0 2.44 1.337 2.44 2.94Z"/>
              <path d="M6.558 0c-3.22 0-5.84 2.403-5.84 5.385C.718 10.13 6.558 16 6.558 16s5.84-5.87 5.84-10.615C12.398 2.402 9.778 0 6.558 0Zm0 8.802c-1.225 0-2.22-.972-2.22-2.167 0-1.194.995-2.167 2.22-2.167 1.225 0 2.22.973 2.22 2.167 0 1.195-.995 2.167-2.22 2.167Z"/>
            </svg>
          </span>
          <select class="form-input">
            <option>开始之初</option>
          </select>
        </div>

        <div class="input-group">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c0 2.302-1.533 4.38-3.84 5.44C6.727 13.32 5.194 11.243 5.194 8.94c0-1.603 1.123-2.94 2.532-2.94 1.408 0 2.44 1.337 2.44 2.94Z"/>
              <path d="M6.558 0c-3.22 0-5.84 2.403-5.84 5.385C.718 10.13 6.558 16 6.558 16s5.84-5.87 5.84-10.615C12.398 2.402 9.778 0 6.558 0Zm0 8.802c-1.225 0-2.22-.972-2.22-2.167 0-1.194.995-2.167 2.22-2.167 1.225 0 2.22.973 2.22 2.167 0 1.195-.995 2.167-2.22 2.167Z"/>
            </svg>
          </span>
          <select class="form-input">
            <option>目标人物</option>
          </select>
        </div>

        <div class="input-group">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5ZM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1Z"/>
            </svg>
          </span>
          <input type="date" class="form-input" />
        
        </div>
        <div class="input-group">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5ZM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1Z"/>
            </svg>
          </span>
          <input type="date" class="form-input" />
        
        </div>
        


        <button class="primary-button">进入旅途</button>
      </div> -->
      <div class="header-container">
    <!-- 左侧文字和表单部分 -->
    <div class="header-left">
      <h1>灵验伴您一路学习成长</h1>
      <div class="form-section">
        <div class="input-group">
          <span class="icon">📍</span>
          <input class="form-input" placeholder="请输入开始之初" >
            
        </input>
        </div>
        <div class="input-group">
          <span class="icon">📍</span>
          <input class="form-input" placeholder="请输入目标人物" >
            <!-- <option>目标人物</option> -->
        </input>
        </div>
        <div class="input-group">
          <span class="icon">📅</span>
          <input type="date" class="form-input" />
        </div>
        <div class="input-group">
          <span class="icon">📅</span>
          <input type="date" class="form-input" />
        </div>
        <button class="primary-button" @click="goToLogin">进入旅途</button>
      </div>
    </div>

    <!-- 右侧图片部分 -->
    <div class="header-right">
      <img style="width:800px;height: 350px"src="../assets/img/45.png" alt="右侧示例图片" class="animated-image" />
    </div>
    </div>
  
      <!-- 卡片区域 -->
      <div class="cards-section">
        <h2>建议</h2>
        <div class="cards">
          <div class="card" @click="goToComp">
            <img src="../assets/img/37.png" alt="行程图标" />
            <h3>竞赛</h3>
            <p>优步伴您合理规划，练习、评估，然后出发。</p>
            <button class="secondary-button">详细信息</button>
          </div>
          <div class="card" @click="goToResource">
            <img src="../assets/img/38.png" alt="预约图标" />
            <h3>特选资源</h3>
            <p>提前规划行程，让自己的学习之路更加轻松。</p>
            <button class="secondary-button">详细信息</button>
          </div>
          <div class="card" @click="goToCommunity">
            <img src="../assets/img/39.png" alt="食品杂货图标" />
            <h3>交流互助</h3>
            <p>社区大佬助力,轻松入门。</p>
            <button class="secondary-button">详细信息</button>
          </div>
        </div>
      </div>
  
      <!-- 统计信息区域 -->
      <!-- <div class="stats-section">
        <div class="stats-container">
          <h2>专为大学生研发的学习网站</h2>
          <el-row>
    <el-col :span="6">
      <el-statistic title="Daily active users" :value="268500" />+
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Proportion of  students 
            <el-icon style="margin-left: 4px" :size="12">
              <Male />
            </el-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="Total Transactions" :value="outputValue" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="Feedback number" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>     


          <p>300,000 + 大学生的选择——集成学科竞赛，一站式服务 </p>
          <ul>
            <li><strong>500+</strong> 精选赛事，尽在掌握,专业竞赛，一键直达 </li>
            <li><strong>200+</strong> 专业课程，为你的竞赛加码, </li>
            <li><strong>100,000+</strong> 题目，助力你的每一次进步 </li>
            <li><strong>80%</strong> of Fortune 500 companies use Atlassian products</li>
          </ul>
        </div>
      </div> -->
  
      <div class="statistics-container">
    <!-- 标题 -->
    <h2 class="statistics-title">专为大学生研发的学习网站</h2>

    <!-- 统计信息区域 -->
    <div class="statistics">
      <div class="stat-item">
        <span class="stat-number" ref="dailyUsers">{{ dailyUsers }}</span>
        <span class="stat-label">Daily active users</span>
      </div>

      <div class="stat-item">
        <span class="stat-number" ref="proportion">{{ proportion }}</span>
        <span class="stat-label">Proportion of students</span>
      </div>

      <div class="stat-item">
        <span class="stat-number">{{ transactions }}</span>
        <span class="stat-label">Total Transactions</span>
      </div>

      <div class="stat-item">
        <span class="stat-number" ref="feedback">{{ feedback }}</span>
        <span class="stat-label">Feedback number</span>
      </div>
    </div>

    <!-- 描述文本 -->
    <div class="description">
      <p>300,000+ 大学生的选择——集成学科竞赛，一站式服务</p>
      <p>
        <strong>500+</strong> 精选赛事，尽在掌握，专业竞赛，一键直达<br />
        <strong>200+</strong> 专业课程，为你的竞赛加码，<br />
        <strong>100,000+</strong> 题目，助力你的每一次进步<br />
        <strong>80%</strong> of Fortune 500 companies use Atlassian products
      </p>
    </div>
  </div>






      <!-- 底部模块 -->
      <!-- <div class="features-section">
        <div class="feature">
          <img src="../assets/img/1.png" alt="特色图片1" />
          <div class="feature-text">
            <h2>Uber Taxi/高级轿车</h2>
            <p>我们利用先进技术实现全新的乘坐方式。</p>
            <button class="primary-button">马上开始</button>
            <p><a href="#">已经有账号？登录</a></p>
          </div>
        </div>
      </div> -->

       <!-- 新增图片样式部分 -->
    <div class="image-text-section">
      <div class="text-container">
        <div class="text-content">
          <h2>连接相关网站的精品资源</h2>
          <div class="text-item" ref="textItems"
          @mouseenter="setActiveImage(0)">
            <h3 class="section-title">RAG大语言模型</h3>
            <h4 class="section-subtitle">AI领航 —— 智能推荐，让每一次选择都精准</h4>
            <p class="section-description">
              我们利用前沿的RAG技术，为你提供无与伦比的大语言模型智能对话体验。无论你是寻求知识、解决疑惑还是探索新思路，我们的AI大语言模型都能为你提供精准、深入的答案。开启你的智能探索之旅，让AI成为你智慧的伙伴。
            </p>
            <div class="buttons">
            <button class="primary-button" @click=goTocourse>Get it free</button>
            <a href="#" class="link">Explore Jira ➔</a>
          </div>
          </div>


          <div class="text-item" ref="textItems"
          @mouseenter="setActiveImage(1)">
            <h3 class="section-title">课程</h3>
            <!-- <h4 >Dream it, plan it, launch it</h4> -->
            <h4 class="section-subtitle">探索知识，启迪未来 —— 欢迎来到课程</h4>
 
            <p class="section-description">
              在这里，每一节课都是一次智慧的旅程。我们汇聚全球顶尖教育资源，为你提供最前沿的知识与技能。无论你是渴望提升专业技能的职场人士，还是对世界充满好奇的学习者，[你的课程网站名称]都是你理想的学习伙伴。让我们一起启程，用知识的力量，点亮你的未来！
            </p>
            <div class="buttons">
            <button class="primary-button" @click=goTocourse>Get it free</button>
            <a href="#" class="link">Explore Jira ➔</a>
          </div>
        </div>


          <div class="text-item" ref="textItems"
          @mouseenter="setActiveImage(2)">
            <h3 class="section-title">题库</h3>
            <!-- <h4 class="section-subtitle">Scale your knowledge</h4> -->
            <h4 class="section-subtitle">掌握知识，成就卓越 —— 尽在题库</h4>
           
            <p class="section-description">
              我们相信每一次练习都是通往成功的一步。我们提供海量题库，覆盖各个学科和领域，旨在帮助你巩固知识、提升技能。无论你是准备考试的学生，还是寻求自我提升的专业人士，这里都有适合你的练习题。加入我们，让每一次点击都成为你成长的动力。
            </p>
            <div class="buttons">
            <button class="primary-button" @click=goToquestion>Try for free</button>
            <a href="#" class="link">Learn more ➔</a>
          </div>
          </div>
        </div>
      </div>
      <div class="image-container">
        <img style="width:700px;height: 350px":src="activeImage" alt="示例图片" />
      </div>
    </div>





    <div class="image-text-section-reverse">
      <div class="image-container">
        <img style="width:600px;height: 350px":src="activeImage1" alt="示例图片" />
      </div>
      <div class="text-container">
        <div class="text-content">
          <h2>在互助中成长，在追踪中精进 —— 你的全方位学习伙伴</h2>
          <div class="text-item" ref="textItems"
          @mouseenter="setActiveImage1(0)">
            <h3>交流分享区</h3>
            <h4>携手共进，智慧共享 —— 让每一次互助都充满力量</h4>
            <p class="section-description">
              我们相信知识的力量在于分享。这里，每个人都是学习者，也是老师。我们提供一个平台，让思想碰撞，让经验传承，让互助成为习惯。加入我们，一起构建一个更加智慧、更加温暖的学习社区。
            </p>
            <button class="primary-button" @click="goToCommunity">Learn More</button>
            <a href="#" class="link">Get Started ➔</a>
          </div>
          <div class="text-item" ref="textItems"
          @mouseenter="setActiveImage1(1)">
            <h3>个人成长路</h3>
            <h4>追踪你的每一步，优化你的每一次学习</h4>
            <p class="section-description">
              我们致力于将您的学习之旅变得更加智能和个性化。通过精确追踪和分析您的学习行为，我们帮助您发现习惯中的盲点，优化学习策略，让进步看得见。开启您的个性化学习之旅，让每一次努力都更加精准有效。
            </p>
            <button class="primary-button" @click="goToLogin">Explore Now</button>
            <a href="#" class="link">See More ➔</a>
          </div>
        </div>
      </div>
    </div>

      <!-- Footer -->
      <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>合作商</h3>
          <ul>
            <li><a href="#">Uber</a></li>
            <li><a href="#">Jira</a></li>
            <li><a href="#">Confluence</a></li>
            <li><a href="#">Element Plus</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>关于我们</h3>
          <p>本网站旨在为用户提供便利服务，结合优质合作商提供多样化的解决方案。</p>
        </div>
        <div class="footer-section">
          <h3>版权信息</h3>
          <p>© 2024 灵验领航. 版权所有.</p>
          <p>Powered by Vue.js & Element Plus</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>如有任何疑问，请联系我们：<a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a></p>
      </div>
    </footer>

    </div>
  </template>
  
  <script>
  import image1 from "../assets/img/41.png";
import image2 from "../assets/img/42.png";
import image3 from "../assets/img/40.png";
import image4 from "../assets/img/43.png";
import image5 from "../assets/img/44.png";

import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 172000
  export default {
    data() {
    return {
      activeIndex: 0, // 当前激活的内容索引
      images: [image1, image2, image3, ],
      images1: [image4, image5],
      dailyUsers: 0,
      proportion: 0,
      transactions: 0,
      feedback: 0,
    };
  },
    name: "HomePage",
    mounted() {
    this.animateNumber("dailyUsers", 268500);
    this.animateNumber("proportion", 138);
    this.animateNumber("feedback", 562);
    this.animateNumber("transactions", 100000);
    // this.transactions = 100000; // 固定值
  },

  computed: {
    activeImage() {
      return this.images[this.activeIndex];
    },
    activeImage1() {
      return this.images1[this.activeIndex];
    },
  },
    methods: {
      setActiveImage(index) {
      this.activeIndex = index;
    },
    setActiveImage1(index) {
      this.activeIndex = index;
    },
    goToLogin() {
      // 使用 Vue Router 跳转到 login 页面
      this.$router.push('/login');
    },
    goToComp() {
     
      this.$router.push('/home/comp');
    },
    goToResource() {
      
      this.$router.push('/home/course');
    },
    goTocourse() {
      
      this.$router.push('/home/course');
    },
    goToquestion() {
      
      this.$router.push('/home/question');
    },

    goToCommunity() {
     
      this.$router.push('/home/community');
    },
    animateNumber(refName, target) {
      let current = 0;
      const step = Math.ceil(target / 100); // 分成 100 步
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        this[refName] = current.toLocaleString(); // 格式化数字
      }, 20); // 每 20 毫秒更新一次
    },

  },
 
  };





  </script>
  
  <style scoped>
  .container {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f6f8;
    padding: 20px;
    text-align: center;
  }
  
 /* 统计信息容器 */
.statistics-container {
  text-align: center;
  padding: 40px 20px;
  background-color: #f9fafb;
  font-family: 'Arial', sans-serif;
}

/* 标题 */
.statistics-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* 统计信息 */
.statistics {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  color: #5a67d8;
  animation: fadeIn 1s ease-in-out;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 描述文本 */
.description {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.description strong {
  color: #5a67d8;
  font-weight: bold;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  


/* Header 主容器 */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f6f8;
  padding: 20px 30px;
  
 
}

/* 左侧文字和表单 */
.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #5a67d8;
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.section-description {
  font-size: 14px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 20px;
  max-width: 500px; /* 限制段落的最大宽度 */
  text-align: left; /* 左对齐 */
  margin-left: auto; /* 居中时与 margin-right 配合 */
  margin-right: auto;
  word-wrap: break-word; /* 自动换行 */
}
.header-left {
  flex: 1;
}

.header-left h1 {
  font-size: 50px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding: 30px 45px;
}

.form-section {
 
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: right;
  padding: 30px 120px;
}

.input-group {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.icon {
  margin-right: 10px;
  color: #5a67d8;
  font-size: 18px;
}

.form-input {
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  flex-grow: 1;
}

.primary-button {
  background-color: #5a67d8;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  background-color: #6b74e2;
}

/* 右侧图片部分 */
.header-right {
  flex: 1;
  text-align: center;
  position: relative;
}

.header-right img {
  max-width: 80%;
  height: auto;
  border-radius: 10px;
  animation: float 3s ease-in-out infinite;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 图片动画 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
  
  /* 卡片区域 */
  .cards-section {
    text-align: center;
    margin: 40px 0;
  }
  
  .cards {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
  }
  
  .card {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 350px;
    height: 230px;
    transition: all 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  .card:hover {
  transform: translateY(-10px) scale(1.03); /* 上浮并稍微放大 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 阴影增加 */
}
  
  .card img {
    max-width: 200px;
    height: 90px;
    margin-bottom: 10px;
    transition: transform 0.3s ease; /* 图片动画 */
  }
  .card:hover img {
  transform: scale(1.1); /* 悬停时图片放大 */
}
  
  .card h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .card p {
    color: #666;
    margin-bottom: 20px;
  }
  
  .secondary-button {
    background: #e0e7ff;
    color: #5a67d8;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease; /* 平滑按钮动画 */
  }
  
  .secondary-button:hover {
    background: #cbd5f7;
    transform: scale(1.05); /* 按钮稍微放大 */
  }
  
  /* 统计信息 */
  /* .stats-section {
    background-color: #f9f9f9;
    padding: 30px 20px;
    margin: 40px 0;
  }
  
  .stats-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .stats-container h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .stats-container p {
    margin-bottom: 20px;
  } */
  
  /* 底部特色模块 */
  .features-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 40px 0;
  }
  
  .feature img {
    max-width: 300px;
    border-radius: 10px;
  }
  
  .feature-text {
    max-width: 500px;
  }
  
  .feature-text h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .primary-button {
    background: #5a67d8;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .primary-button:hover {
    background: #6b74e2;
  }

  /* 图片和文字布局 */
.image-text-section {
  display: flex;
  gap: 40px;
  padding: 40px;
  margin: 50px 50px;
  
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden; /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
}

.text-container {
  flex: 1;
  max-height: 400px; /* 限制文字区域高度 */
  overflow-y: auto; /* 开启垂直滚动条 */
  padding: 20px;
  border-right: 2px solid #eaeaea;
  scrollbar-width: none; /* Firefox 隐藏滚动条 */
  
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.text-item h3 {
  font-size: 24px;
  color: #5a67d8;
  margin-bottom: 5px;
}

.text-item h4 {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}

.text-item p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}



.link {
  font-size: 14px;
  color: #5a67d8;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.image-container {
  flex: 1;
  text-align: center;
}

.image-container img {
  width: 300px;
  height: auto;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: opacity 0.65s ease-in-out;
}


/* 左图右文布局 */
.image-text-section-reverse {
  display: flex;
  gap: 20px;
  margin: 50px 0;
  align-items: flex-start;
}



.text-container {
  flex: 1;
  padding: 20px;
  border-left: 2px solid #eaeaea;
}





.primary-button {
  background-color: #5a67d8;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
}

.primary-button:hover {
  background-color: #6b74e2;
}


/* Footer 样式 */
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
  margin-top: 50px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #f4f6f8;
}

.footer-section p,
.footer-section ul {
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 5px;
}

.footer-section ul li a {
  color: #5a67d8;
  text-decoration: none;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.footer-bottom a {
  color: #5a67d8;
  text-decoration: none;
}

.footer-bottom a:hover {
  text-decoration: underline;
}

  </style>
  