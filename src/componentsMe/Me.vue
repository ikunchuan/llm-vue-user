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
                                            <p style="margin: 0;font-size: 14px;color: var(--el-color-info);">
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
                            <button class="edit-button" @click="openDialog">编辑资料</button>
                        </h4>
                        <p class="bio-text">{{ userInfo.userBio }}</p>
                        <button class="knowledge-button" @click="openKnowledgeDialog">个人知识网</button>
                        <div class="knowledge-network"
                            v-if="userInfo.knowledgeNetwork && userInfo.knowledgeNetwork.length > 0">
                            <div v-for="(item, index) in userInfo.knowledgeNetwork" :key="index" class="knowledge-item">
                                {{ item }}
                            </div>
                        </div>
                        <div v-else class="empty-knowledge">
                            暂无知识网信息，点击上方按钮添加
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
    <el-dialog v-model="knowledgeDialogVisible" title="个人知识网" width="500px" :close-on-click-modal="false"
        append-to-body>

        <el-form>
            <el-row :gutter="20">
                <el-col :span="12" v-for="(item, index) in knowledgeItems" :key="index">
                    <el-checkbox v-model="item.checked">
                        {{ item.name }}
                    </el-checkbox>
                </el-col>
            </el-row>
        </el-form>

        <template #footer>
            <el-button @click="closeKnowledgeDialog">取消</el-button>
            <el-button type="primary" @click="saveKnowledge">保存</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { h } from "vue";
import { ElDivider } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { RouterView } from "vue-router";
import axios from 'axios';

export default {
    data() {
        return {
            name: "ProfilePage",
            spacer: h(ElDivider, { direction: "vertical" }),
            // avatarUrl: this.userInfo.userProfilePicture,

            userInfo: {}, //存储用户数据
            followersInfo: [], //用户关注
            fansInfo: [], //用户粉丝
            form: {}, //编辑资料表单

            postView: "",
            postLike: "",
            postFavorite: "",
            postComment: "",
            avatarUrl: "https://api.dicebear.com/9.x/fun-emoji/svg", //默认头像

            loading: true,
            dialogFormVisible: false,

            knowledgeDialogVisible: false,
            knowledgeItems: [
                { name: 'Python', checked: false },
                { name: 'SQL', checked: false },
                { name: '机器学习', checked: false },
                { name: '高数', checked: false },
                { name: 'Java', checked: false },
                { name: 'Axure', checked: false }
            ],
            items: [
                { name: "创作中心", path: "" },
                { name: "我的收藏", path: "myfavorite" },
                { name: "灵验领航", path: "lingyanlinghang" },
                { name: "浏览记录", path: "browsinghistory" },
            ],
        };
    },

    methods: {
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
        // 打开知识网弹窗
        async openKnowledgeDialog() {
            console.log('知识网按钮点击'); // 调试日志

            if (!this.userInfo?.userId) {
                console.warn('用户ID不存在:', this.userInfo);
                this.$message.warning('用户信息未加载完成，请稍候');
                return;
            }

            try {
                this.loading = true;
                console.log('正在请求知识网数据，userId:', this.userInfo.userId); // 调试日志

                const response = await axios.get(`/uis/v1/user/knowledge/${this.userInfo.userId}`);
                console.log('知识网数据响应:', response); // 调试日志

                const savedKnowledge = response.data || [];
                this.knowledgeItems.forEach(item => {
                    item.checked = savedKnowledge.includes(item.name);
                });

                this.knowledgeDialogVisible = true;
                console.log('弹窗状态设置为true'); // 调试日志
            } catch (error) {
                console.error('获取知识网失败:', error);
                this.$message.error('加载知识网失败: ' + (error.response?.data?.message || error.message));
            } finally {
                this.loading = false;
            }
        },

        // 修改后的saveKnowledge方法
        async saveKnowledge() {
            try {
                const selectedKnowledge = this.knowledgeItems
                    .filter(item => item.checked)
                    .map(item => item.name);

                console.log('准备保存的知识网数据:', selectedKnowledge); // 调试日志

                await axios.put('/uis/v1/user/knowledge', {
                    userId: this.userInfo.userId,
                    knowledge: selectedKnowledge
                });

                // 更新本地数据
                this.userInfo.knowledgeNetwork = selectedKnowledge;
                this.$message.success('知识网更新成功');
                this.closeKnowledgeDialog();
            } catch (error) {
                console.error('保存知识网失败:', error);
                this.$message.error('保存失败: ' + (error.response?.data?.message || error.message));
            }
        },

        closeKnowledgeDialog() {
            this.knowledgeDialogVisible = false
        }
    },
    components: {
        Plus,
    },
    mounted() {
        const userId = sessionStorage.userId;

        if (!userId) {
            //未登录重定向到注册
            this.$router.push("/login");
        }

        axios.get(`/uis/v1/ui/${userId}`)
            .then((response) => {
                console.log("User data:", response.data);
                this.userInfo = response.data;
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
        axios.get(`/uis/v1/ui/${userId}`)
            .then((response) => {
                console.log("用户基本信息:", response.data);
                this.userInfo = response.data;

                // 用户信息加载完成后再获取知识网
                return axios.get(`/uis/v1/user/knowledge/${this.userInfo.userId}`);
            })
            .then(response => {
                console.log("知识网初始化数据:", response.data);
                this.userInfo.knowledgeNetwork = response.data || [];
            })
            .catch(error => {
                console.error('初始化数据获取失败:', error);
            })
            .finally(() => {
                this.loading = false;
            });


    },
    components: {},
};
</script>

<style>
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
/* 主布局样式 */
.main-layout {
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(239, 239, 239, 0.1);
    max-width: 1200px;
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
    line-clamp: 2;
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
</style>
