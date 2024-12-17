<template>
    <div class="main-layout">
        <el-container class="profile">
            <el-aside width="25%">
                <el-card class="profile-container">
                    <div class="profile-header">
                        <el-space wrap>
                            <el-popover :width="300"
                                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
                                <template #reference>
                                    <!-- shape：square； border: 1px solid #007bff;-->
                                    <el-avatar :size="80" :src="avatarUrl" style="margin-left: 10; " />
                                </template>
                                <template #default>
                                    <div class="demo-rich-conent"
                                        style="display: flex; gap: 16px; flex-direction: column">
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
                        <p style="font-size: 17px; margin: 10px auto; ">{{ userInfo.userEmail }}</p>

                        <el-row justify="space-evenly" class="follow-fans">
                            <el-col :span="50" class="pointer">
                                <el-space direction="horizonal" size="2">
                                    <div class="stat-text">关注</div>&nbsp;
                                    <div class="stat-number">{{ countFollowers() }}</div>
                                </el-space>
                            </el-col>&nbsp;
                            <el-col :span="50" class="pointer">
                                <el-space direction="horizonal" size="2">
                                    <div class="stat-text">粉丝</div>&nbsp;
                                    <div class="stat-number">{{ countFans() }}</div>
                                </el-space>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="activity-stats">
                        <div class="activity-item">
                            <span class="activity-text">获得浏览:</span>
                            <span class="activity-number">{{ postView }}</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-text">获得点赞:</span>
                            <span class="activity-number">{{ postLike }}</span>

                        </div>
                        <div class="activity-item">
                            <span class="activity-text">获得收藏:</span>
                            <span class="activity-number">{{ postFavorite }}</span>
                        </div>
                        <div class="activity-item">
                            <span class="activity-text">获得评论:</span>
                            <span class="activity-number">{{ postComment }}</span>
                        </div>
                    </div>

                    <div>
                        <h4>简介</h4>
                        <p style="font-size:17px;">{{ userInfo.userBio }}</p>
                        <button class="edit-button" @click="openDialog">编辑资料</button>
                    </div>

                    <div class="badges">
                        <h4>徽章</h4>
                        <p style="font-size:17px;">空空如也, 看看如何<a href="#">解锁徽章></a></p>
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

            <el-main class="right">
                <el-card>
                    <el-row justify="space-evenly" style="text-align: center;">
                        <el-col :span="4" v-for="(item, index) in items" :key="index" @click="goTo(item.path)"
                            class="pointer">
                            <div class="nav-item">{{ item.name }}</div>
                        </el-col>
                    </el-row>
                    <router-view />
                </el-card>
            </el-main>
        </el-container>
    </div>

    <!-- 编辑简介弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="简介编辑" width="500">
        <el-form :model="form" label-position="left" label-width="80px" :rules="rules">

            <el-form-item v-show="false">
                <el-input v-model="form.userId" />
            </el-form-item>

            <el-form-item label="用户名">

                <el-input v-model="form.userName" maxlength="20" type="textarea" placeholder="请输入用户名" show-word-limit />
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
                <el-input v-model="form.userBio" maxlength="50" type="textarea" placeholder="请输入简介" show-word-limit />
            </el-form-item>
        </el-form>

        <template #footer>
            <div>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="editProfile">确定</el-button>
            </div>
        </template>
    </el-dialog>

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

            userInfo: {}, //存储用户数据
            followersInfo: [], //用户关注
            fansInfo: [],  //用户粉丝
            form: {}, //编辑资料表单

            postView: '',
            postLike: '',
            postFavorite: '',
            postComment: '',
            avatarUrl: 'https://via.placeholder.com/80', //默认头像

            loading: true,
            dialogFormVisible: false,

            items: [
                { name: '创作中心', path: '' },
                { name: '我的收藏', path: 'myfavorite' },
                { name: '灵验领航', path: 'lingyanlinghang' },
                { name: '浏览记录', path: 'browsinghistory' },
            ],
        };
    },

    methods: {
        goTo(itemPath) {
            this.$router.push('/home/me/' + itemPath);
        },

        userAvatar() {
            if (this.userInfo.userAvatar === null) {
                console.log(this.avatarUrl)
                return this.avatarUrl;
            } else {
                console.log(this.avatarUrl)
                return this.userInfo.userAvatar;
            }
        },

        openDialog() {
            this.form = {};
            this.form = this.userInfo;
            this.dialogFormVisible = true;
        },

        editProfile(userId) {
            this.$http.put('/uis/v1/ui', this.form)
        },

        closeDialog() {

            return this.dialogFormVisible = false;

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
    },

    mounted() {
        const userId = sessionStorage.userId;
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

        this.$http.get(`/v1/posts/post/allview/${userId}`)
            .then(response => {
                console.log('postview data:', response.data);
                this.postView = response.data;
                this.loading = false;
            }).catch(error => {
                console.error('Error fetching user data:', error);
            })

        this.$http.get(`/v1/posts/post/alllike/${userId}`)
            .then(response => {
                console.log('postlike data:', response.data);
                this.postLike = response.data;
                this.loading = false;
            }).catch(error => {
                console.error('Error fetching user data:', error);
            })

        this.$http.get(`/v1/posts/post/allfavorite/${userId}`)
            .then(response => {
                console.log('postfavorite data:', response.data);
                this.postFavorite = response.data;
                this.loading = false;
            }).catch(error => {
                console.error('Errorfetching user data:', error);
            })

        this.$http.get(`/v1/posts/post/allcomment/${userId}`)
            .then(response => {
                console.log('postcomment data:', response.data);
                this.postComment = response.data;
                this.loading = false;
            }).catch(error => {
                console.error('Error fetching user data:', error);
            })
    },
    components: {

    },
};
</script>

<style scoped>
.boxLength {

    width: 400px;
}

.follow-fans {
    padding: auto;
    background: #e48787;
    border-radius: 7px;
    box-shadow: inset 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
}

.pointer {
    cursor: pointer;
}

h4 {
    margin: 15px 0;
}

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

.profile {
    min-width: 1200px;
    display: flex;
    justify-self: center;
}

.right {
    height: auto;
    padding: 0;
    margin-left: 1%;
}

.profile-container {
    z-index: 99;
    height: auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-header {
    background-color: #ebd1d1;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.profile-header:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.stat-text {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.stat-number {
    font-size: 16px;
    font-weight: bold;
    text-shadow: #000 0 1px;
    color: #ffffff;
}

.stat-separator {
    width: 1px;
    height: 40px;
    background-color: #ccc;
}

.activity-stats {
    margin-top: 10px;
}

.activity-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
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
    padding: 8px 20px;
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
    padding: 10px auto;
    color: #495057;
    border-radius: 3px;
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
