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
          <select class="form-input">
            <option>开始之初</option>
          </select>
        </div>
        <div class="input-group">
          <span class="icon">📍</span>
          <select class="form-input">
            <option>目标人物</option>
          </select>
        </div>
        <div class="input-group">
          <span class="icon">📅</span>
          <input type="date" class="form-input" />
        </div>
        <div class="input-group">
          <span class="icon">📅</span>
          <input type="date" class="form-input" />
        </div>
        <button class="primary-button">进入旅途</button>
      </div>
    </div>

    <!-- 右侧图片部分 -->
    <div class="header-right">
      <img src="../assets/img/1.png" alt="右侧示例图片" class="animated-image" />
    </div>
    </div>
  
      <!-- 卡片区域 -->
      <div class="cards-section">
        <h2>建议</h2>
        <div class="cards">
          <div class="card">
            <img src="../assets/img/1.png" alt="行程图标" />
            <h3>竞赛</h3>
            <p>优步伴您合理规划，练习、评估，然后出发。</p>
            <button class="secondary-button">详细信息</button>
          </div>
          <div class="card">
            <img src="../assets/img/1.png" alt="预约图标" />
            <h3>特选资源</h3>
            <p>提前规划行程，让自己的学习之路更加轻松。</p>
            <button class="secondary-button">详细信息</button>
          </div>
          <div class="card">
            <img src="../assets/img/1.png" alt="食品杂货图标" />
            <h3>交流互助</h3>
            <p>社区大佬助力,轻松入门。</p>
            <button class="secondary-button">详细信息</button>
          </div>
        </div>
      </div>
  
      <!-- 统计信息区域 -->
      <div class="stats-section">
        <div class="stats-container">
          <h2>Teams across the globe run on Atlassian</h2>
          <el-row>
    <el-col :span="6">
      <el-statistic title="Daily active users" :value="268500" />+
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            Ratio of men to women
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


          <p>300,000+ companies power team collaboration with Atlassian</p>
          <ul>
            <li><strong>200+</strong> countries have companies that use Atlassian</li>
            <li><strong>80%</strong> of Fortune 500 companies use Atlassian products</li>
          </ul>
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
          <h2>Teamwork solutions for high-performing teams</h2>
          <div class="text-item">
            <h3>Jira</h3>
            <h4>Dream it, plan it, launch it</h4>
            <p>
              The #1 tool for agile teams is now for all teams. Plan, track, and deliver your biggest ideas together.
            </p>
            <button class="primary-button">Get it free</button>
            <a href="#" class="link">Explore Jira ➔</a>
          </div>
          <div class="text-item">
            <h3>Confluence</h3>
            <h4>Scale your knowledge</h4>
            <p>
              Connect and consolidate scattered docs and information into a single source of truth for your team.
            </p>
            <button class="primary-button">Try for free</button>
            <a href="#" class="link">Learn more ➔</a>
          </div>
        </div>
      </div>
      <div class="image-container">
        <img src="../assets/img/1.png" alt="示例图片" />
      </div>
    </div>

    <div class="image-text-section-reverse">
      <div class="image-container">
        <img src="../assets/img/1.png" alt="示例图片" />
      </div>
      <div class="text-container">
        <div class="text-content">
          <h2>Discover more possibilities</h2>
          <div class="text-item">
            <h3>Efficient Collaboration</h3>
            <p>
              Work seamlessly with your team by exploring tools that enhance productivity and bring people closer together.
            </p>
            <button class="primary-button">Learn More</button>
            <a href="#" class="link">Get Started ➔</a>
          </div>
          <div class="text-item">
            <h3>Integrated Systems</h3>
            <p>
              Create a unified workflow by connecting your favorite tools, ensuring everything works in harmony.
            </p>
            <button class="primary-button">Explore Now</button>
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

import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
const source = ref(0)
const outputValue = useTransition(source, {
  duration: 1500,
})
source.value = 172000
  export default {
    name: "HomePage",
  };
  </script>
  
  <style scoped>
  .container {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f6f8;
    padding: 20px;
    text-align: center;
  }
  
  /* 顶部区域 */
  
  /* .header-section h1 {
  font-size: 64px;
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
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px 15px;
  width: 400px;
  height: 40px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.icon {
  margin-right: 20px;
  color: #5a67d8;
}

.form-input {
  border: none;
  background: none;
  outline: none;
  font-size: 18px;
  flex-grow: 1;
}

.primary-button {
  background-color: #333;
  width: 300px;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #444;
} */

/* Header 主容器 */
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f4f6f8;
  padding: 40px 20px;
  
 
}

/* 左侧文字和表单 */
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
    transition: all 0.3s ease;
  }
  
  .card img {
    max-width: 100px;
    height: 80px;
    margin-bottom: 10px;
  }
  
  .card h3 {
    font-size: 18px;
    margin-bottom: 10px;
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
  }
  
  .secondary-button:hover {
    background: #cbd5f7;
  }
  
  /* 统计信息 */
  .stats-section {
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
  }
  
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
  gap: 20px;
  margin: 50px 0;
  align-items: flex-start;
}

.text-container {
  flex: 1;
  max-height: 400px; /* 限制文字区域高度 */
  overflow-y: auto; /* 开启垂直滚动条 */
  padding: 20px;
  border-right: 2px solid #eaeaea;
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
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  