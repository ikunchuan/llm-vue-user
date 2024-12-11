<template>
    <div class="profile-container-wrapper">
        <div class="profile-container">
            <div class="profile-header">
                <div class="avatar-container">
                    <img class="avatar" src="https://via.placeholder.com/80" alt="头像">
                </div>
                <div class="profile-info">
                    <div class="profile-details">
                        <h2>Windir</h2>
                        <p>一枚热爱插画的视觉设计师</p>
                    </div>
                </div>
            </div>
            <div class="stats">
                <div class="stat-item">
                    <span class="stat-text">关注</span>
                    <span class="stat-number">1</span>
                </div>
                <div class="stat-separator"></div>
                <div class="stat-item">
                    <span class="stat-text">粉丝</span>
                    <span class="stat-number">0</span>
                </div>
            </div>
            <div class="activity-stats">
                <div class="activity-item">
                    <span class="activity-text">获得浏览:</span>
                    <span class="activity-number">0</span>
                </div>
                <div class="activity-item">
                    <span class="activity-text">获得点赞:</span>
                    <span class="activity-number">0</span>
                </div>
                <div class="activity-item">
                    <span class="activity-text">项目被 Fork:</span>
                    <span class="activity-number">0</span>
                </div>
                <div class="activity-item">
                    <span class="activity-text">获得评论:</span>
                    <span class="activity-number">0</span>
                </div>
            </div>
            <div class="introduction">
                <h3>简介</h3>
                <button class="edit-button">编辑简介</button>
            </div>
            <div class="badges">
                <h3>徽章</h3>
                <p>空空如也, 看看如何 <a href="#">解锁徽章></a></p>
            </div>
            <div class="skills">
                <h3>技能</h3><a href="#">技能树</a>
                <div class="skill-item">理论 <span>0</span></div>
                <div class="skill-item">应用 <span>0</span></div>
            </div>
            <div class="activity">
                <p>嚯，这个人还没有动静呢</p>
            </div>
        </div>

        <!-- 新增的框，放在最大的框右边 -->
        <div class="side-box">
            <div class="side-nav">
                <a href="#overview" class="nav-item">概览</a>
                <a href="#activity" class="nav-item">动态</a>
                <a href="#projects" class="nav-item">项目</a>
                <a href="#data" class="nav-item">数据</a>
                <a href="#columns" class="nav-item">专栏</a>
                <a href="#contests" class="nav-item">比赛</a>
                <a href="#events" class="nav-item">活动</a>
            </div>
            <h3>侧边框</h3>
            <p>一些额外的信息</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfilePage',
};
</script>

<style scoped>
.profile-container-wrapper {
    display: flex; /* 使用flex布局 */
    justify-content: space-between; /* 内容分布 */
    gap: 1px; /* 设置子元素之间的间距，调整为较小的值 */
}

.profile-container {
    width: 350px;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 60px;
    position: relative;
    background: #fff;
    border-radius: 8px;   /* 边框圆角 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);/* 边框阴影 */
}

.profile-header {
    display: flex;
    align-items: center;
    background-color: #ebd1d1;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
}

.avatar-container {
    display: flex;
    align-items: center;
    margin-right: 30px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #007bff;
}

.profile-info {
    flex-grow: 1;
}

.stats {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-text {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.stat-number {
    font-size: 20px;
    font-weight: bold;
    color: #007bff;
}

.stat-separator {
    width: 1px;
    height: 40px;
    background-color: #ccc;
}

.activity-stats {
    margin-top: 20px;
}

.activity-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
}

.activity-text {
    margin-right: 5px;
}

.activity-number {
    font-weight: bold;
    color: #007bff;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.edit-button {
    padding: 8px 100px;
    font-size: 14px;
    color: #007bff;
    background-color: #fff;
    border: 1px solid #007bff;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.edit-button:hover {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
}

/* 侧边框的样式 */
.side-box {
    width: 1000px; /* 侧边框宽度 */
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 60px; /* 上边距与主框相等 */
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.side-nav {
    display: flex; /* 使用 flex 布局 */
    justify-content: space-around; /* 平均分配各导航项之间的距离 */
    align-items: center; /* 垂直居中对齐 */
    list-style: none; /* 移除默认的列表样式 */
    padding: 0;
    margin: 0;
}

.nav-item {
    display: block; /* 使链接成为块级元素 */
    padding: 10px 20px;
    color: #495057;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
    background-color: #f8f9fa;
    color: #007bff;
}

/* 侧边框的其他样式 */
.side-box h3 {
  margin: 20px 0 10px; /* 调整标题的上下边距 */
}
.side-box p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
}
</style>
