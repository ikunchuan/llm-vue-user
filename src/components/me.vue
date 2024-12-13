<template>
    <el-container class="profile">
        <el-aside width="20%" class="profile-container">
            <el-card>
                <div class="profile-header" size="10">
                    <el-space wrap>
                        <el-popover :width="300"
                            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
                            <template #reference>
                                <!-- shape：square； border: 1px solid #007bff;-->
                                <el-avatar :size="80" :src="avatarUrl" style="margin-left: 10; " />
                            </template>
                            <template #default>
                                <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                                    <el-avatar :size="80" :src="avatarUrl" style="margin-bottom: 5px" />
                                    <div>
                                        <p style="margin: 0; font-weight: 500">
                                            {{ userInfo.username }}
                                        </p>
                                        <p style="margin: 0; font-size: 14px; color: var(--el-color-info)">
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
                    <p style="font-size: 17px;">{{ userInfo.userEmail }}</p>
                </div>

                <el-row justify="center">
                    <el-col :span="10">
                        <el-space :size="20" :spacer="spacer" alignment="center" direction="horizontal">
                            <el-space direction="vertical" size="10">
                                <span class="stat-text">关注</span>
                                <span class="stat-number">{{ countFollowers() }}</span>
                            </el-space>
                            <el-space direction="vertical" size="10">
                                <span class="stat-text">粉丝</span>
                                <span class="stat-number">{{ countFans() }}</span>
                            </el-space>
                        </el-space>
                    </el-col>
                </el-row>

                <div class="activity-stats">
                    <div class="activity-item">
                        <span class="activity-text">获得浏览:</span>
                        <span class="activity-number"></span>
                        <!-- {{ countPostViews() }} -->
                    </div>
                    <div class="activity-item">
                        <span class="activity-text">获得点赞:</span>
                        <span class="activity-number"></span>
                        <!-- {{ countPostLikes() }} -->
                    </div>
                    <div class="activity-item">
                        <span class="activity-text">项目被 Fork:</span>
                        <span class="activity-number">0</span>
                    </div>
                    <div class="activity-item">
                        <span class="activity-text">获得评论:</span>
                        <span class="activity-number"></span>
                        <!-- {{ countPostComments() }} -->
                    </div>
                </div>

                <div>
                    <h4>简介</h4>
                    <p style="font-size:17px;">{{ userInfo.userBio }}</p>
                    <button class="edit-button">编辑简介</button>
                </div>

                <div class="badges">
                    <h4>徽章</h4>
                    <p style="font-size:17px;">空空如也, 看看如何 <a href="#">解锁徽章></a></p>
                </div>

                <div class="skills">
                    <h4>技能</h4>
                    <a href="#" style="font-size: 17px;">技能树</a>
                    <div style="font-size: 17px;">理论 <span>0</span></div>
                    <div style="font-size: 17px;">应用 <span>0</span></div>
                </div>

                <div class="activity">
                    <p style="font-size: 17px;">嚯，这个人还没有动静呢</p>
                </div>
            </el-card>
        </el-aside>

        <el-main>
            <el-card style="width: 99%" class="right">

                <el-row justify="center">
                    <el-col :span="2">
                        <el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#overview" class="nav-item">概览</a>
                        </el-space>
                    </el-col>
                    <el-col :span="2">
                        <el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#activity" class="nav-item">动态</a></el-space>
                    </el-col>
                    <el-col :span="2">
                        <el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#projects" class="nav-item">项目</a></el-space>
                    </el-col>
                    <el-col :span="2"><el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#data" class="nav-item">数据</a></el-space>
                    </el-col>
                    <el-col :span="2"><el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#columns" class="nav-item">专栏</a></el-space>
                    </el-col>
                    <el-col :span="2"><el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#contests" class="nav-item">比赛</a></el-space>
                    </el-col>
                    <el-col :span="2"><el-space :size="5" :spacer="spacer" alignment="center" direction="horizontal">
                            <a href="#events" class="nav-item">活动</a></el-space>
                    </el-col>
                </el-row>

                <h3>侧边框</h3>
                <p>一些额外的信息</p>
                <RouterView></RouterView>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
import { h } from 'vue'
import { ElDivider } from 'element-plus';
import { RouterView } from 'vue-router';

export default {
    data() {
        return {
            name: 'ProfilePage',
            spacer: h(ElDivider, { direction: 'vertical' }),
            // avatarUrl: this.userInfo.userProfilePicture,
            loading: true,
            userInfo: {}, //存储用户数据
            followersInfo: [], //用户关注
            fansInfo: [],  //用户粉丝
        };
    },

    methods: {
        countFollowers() {
            return this.followersInfo.length;
        },

        countFans() {
            return this.fansInfo.length;
        },

        // countPostViews() {
        //     return this.postInfo.postView.length;
        // },

        // countPostLikes() {
        //     return this.postInfo.postLike.length;
        // },

        // countPostComments() {
        //     return this.postInfo.postComment.length;
        // },
    },
    mounted() {
        const userId = localStorage.getItem('userid');
        this.$http.get(`/uis/v1/ui/${userId}`)
            .then(response => {
                console.log('User data:', response.data);
                this.userInfo = response.data;
                this.loading = false;
            }).catch(error => {
                console.error('Error fetching user data:', error);
            }).finally(() => {
                this.loading = false;
            });

        this.$http.get(`/uis/v1/user/follower/${userId}`)
            .then(response => {
                console.log('follower data:', response.data);
                this.followersInfo = response.data;
                console.log(this.followersInfo.length);
                this.loading = false;
            }).catch(error => {
                console.error('Error fetching user data:', error);
            }).finally(() => {
                this.loading = false;
            })

        this.$http.get(`/uis/v1/user/fans/${userId}`)
            .then(response => {
                console.log('fans data:', response.data);
                this.fansInfo = response.data;
                console.log(this.fansInfo.length);
                this.loading = false;
            }).catch(error => {
                console.error('Error fetching user data:', error);
            }).finally(() => {
                this.loading = false;
            })


    },
    components: {

    },
};
</script>

<style scoped>
.profile {
    width: 90%;
    margin-left: 1%;
    display: flex;
    justify-self: start;
}

.right {
    height: auto;
}

.profile-container {
    display: fixed;
    z-index: 99;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-header {
    background-color: #ebd1d1;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
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
    font-size: 17px;
}

.activity-number {
    font-size: 17px;
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

.side-box {
    border: 1px solid #ccc;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.side-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-item {
    display: block;
    padding: 10px 20px;
    color: #495057;
    text-decoration: none;
    font-size: 17px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.nav-item:hover,
.nav-item.active {
    background-color: #007bff;
    text-decoration: none;
    color: #fff;
}

.side-box h3 {
    margin: 20px 0 10px;
}

.side-box p {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
}
</style>
