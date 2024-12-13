<template>
    <div class="home-page">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <h2>优步伴您自由出行</h2>
            <el-select v-model="pickupLocation" placeholder="取车地点">
              <el-option label="地点1" value="location1"></el-option>
              <el-option label="地点2" value="location2"></el-option>
            </el-select>
            <el-select v-model="dropoffLocation" placeholder="下车地点">
              <el-option label="地点1" value="location1"></el-option>
              <el-option label="地点2" value="location2"></el-option>
            </el-select>
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
            <el-button type="primary">查看价格</el-button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <img src="path/to/your/map/image.jpg" alt="地图" class="map-image"/>
        </el-col>
      </el-row>
  
      <el-row :gutter="20" class="suggestions">
        <el-col :span="8">
          <el-card>
            <h3>行程</h3>
            <p>优步伴您自由出行，叫车、上车、然后出发。</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <h3>特选预约</h3>
            <p>提前预约行程，让自己的行程更加轻松。</p>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <h3>食品杂货</h3>
            <p>使用 Uber Eats 优食，生鲜杂货送上门。</p>
          </el-card>
        </el-col>
      </el-row>
  
      <el-row class="atlassian-section">
        <el-col :span="24">
          <h2>Teams across the globe run on Atlassian</h2>
          <p>300,000+ companies power team collaboration with Atlassian</p>
          <p>200+ countries have companies that use Atlassian</p>
          <p>80% of Fortune 500 companies use Atlassian products</p>
        </el-col>
      </el-row>
  
      <el-row class="uber-section">
        <el-col :span="24">
          <h2>Uber Taxi/高级轿车</h2>
          <p>我们利用先进技术实现全新的接单方式。</p>
          <el-button type="primary">马上开始</el-button>
        </el-col>
      </el-row>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pickupLocation: '',
        dropoffLocation: '',
        date: ''
      };
    }
  };
  </script>
  
  <style scoped>
  .home-page {
    padding: 20px;
  }
  .map-image {
    width: 100%;
    height: auto;
  }
  .suggestions {
    margin-top: 20px;
  }
  .atlassian-section, .uber-section {
    margin-top: 40px;
  }
  </style>