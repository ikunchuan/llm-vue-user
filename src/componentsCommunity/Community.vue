<template>
    <el-container class="main-page">
        <!-- 主内容区域 -->
        <el-main>
            <el-row :gutter="20">
                <!-- 左侧主内容 -->
                <el-col :span="18">
                    <div class="stats-overview">
                        <el-row>
                            <el-col :span="6">
                                <div class="stat-card">
                                    <h3>今日新增社区：{{ newCommunitiesToday || 1 }}</h3>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="stat-card">
                                    <h3>今日新增帖子：{{ newPostsToday || 5 }}</h3>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 新增：同宽的长方形框放一张图片 -->
                    <!-- <div class="image-banner mb-3">
                        <el-image style="width: 300px; height: 100px" :src="logoImage" fit="cover" />

                    </div> -->
                    <el-carousel height="260px" direction="vertical" motion-blur :autoplay="false">

                        <el-carousel-item v-for="(image, index) in images" :key="index">
                            <img :src="image" alt="carousel image" class="carousel-image" />
                        </el-carousel-item>
                    </el-carousel>


                    <!-- 搜索与分类筛选 -->
                    <div class="search-filter bg-white p-3 rounded shadow-sm">
                        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                            <el-input v-model="searchQuery" placeholder="搜索帖子关键字" class="mt-3"
                                prefix-icon="el-icon-search" />
                            <el-tab-pane label="最热" name="hot">
                                <!-- 其他内容 -->
                            </el-tab-pane>
                            <el-tab-pane label="推荐" name="recommend">
                                <!-- 其他内容 -->
                            </el-tab-pane>
                            <el-tab-pane label="最新" name="latest">
                                <!-- 其他内容 -->
                            </el-tab-pane>
                        </el-tabs>
                    </div>

                    <!-- 内容列表 -->
                    <div class="content-list">
                        <el-card v-for="(item, index) in filteredContentItems" :key="index" shadow="hover"
                            class="post-card" @click="navigateToPostDetail(item)">
                            <div class="post-content">
                                <div class="post-header">
                                    <!-- 左侧标签 -->
                                    <el-tag type="success" class="post-tag">{{ item.communityName }}</el-tag>
                                </div>

                                <!-- 帖子标题 -->
                                <h3 class="post-title">{{ item.postTitle }}</h3>

                                <!-- 帖子摘要 -->
                                <p class="post-summary">{{ stripHtmlTags(item.postContent) }}</p>

                                <!-- 帖子互动信息 -->
                                <div class="post-info">
                                    <span title="点赞数"><i class="el-icon-thumb" />👍 {{ item.likeCount || 0 }}</span>
                                    <span title="收藏数"><i class="el-icon-star-off" />🌟 {{ item.favoriteCount || 0
                                        }}</span>
                                    <span title="评论数"><i class="el-icon-chat-line-round" />💬 {{ item.commentCount || 0
                                        }}</span>
                                    <span title="浏览量"><i class="el-icon-view" />👁️ {{ item.viewCount || 0 }}</span>
                                </div>
                            </div>
                        </el-card>
                    </div>


                    <!-- 分页区域 -->
                    <div class="pagination mt-3">
                        <el-pagination background layout="prev, pager, next" :total="filteredContentItems.length"
                            :page-size="5" />
                    </div>
                </el-col>

                <!-- 右侧推荐栏 -->
                <el-col :span="6">
                    <h3 class="section-title">
                        <span class="update-dot"></span>
                        <span>你关注的社区更新了</span>
                    </h3>
                    <div class="function-buttocardns">
                        <el-card shadow="hover" class="create-community-card" @click="openAddDialog">
                            <div class="create-community-content">
                                <i class="el-icon-plus create-icon"></i>
                                <h3>创建社区</h3>
                                <p>点击这里，创建属于你的社区！</p>
                            </div>
                        </el-card>
                    </div>




                    <!-- 新增：与xx竞赛相关的社区 -->
                    <div class="related-communities mb-3">
                        <el-card shadow="hover" class="related-card">
                            <h3>与{{ competitionName }}相关的社区</h3>
                            <div class="recommend-item" v-for="(community, index) in guessLikeItems" :key="index"
                                @click="navigateToCommuDetail(community)">
                                <el-avatar :src="community.avatar" size="medium" class="recommend-avatar" />
                                <div class="recommend-info">
                                    <p class="recommend-name">{{ community.communityName }}</p>
                                    <p class="recommend-desc">活跃用户: {{ community.activeUsers || '未知' }}</p>
                                </div>
                            </div>
                        </el-card>
                    </div>


                    <div class="sidebar">
                        <el-card shadow="hover" class="recommend-card">
                            <div class="recommend-header">
                                <h3>推荐社区</h3>
                                <div class="community-search-button-container">
                                    <el-button type="primary" size="small" @click="goToCommuSearch">全部社区</el-button>
                                </div>
                            </div>
                            <div class="recommend-item" v-for="(community, index) in popularCommunities" :key="index"
                                @click="navigateToCommuDetail(community)">
                                <el-avatar :src="'../assets/img/58.png'" size="medium" class="recommend-avatar" />
                                <div class="recommend-info">
                                    <p class="recommend-name">{{ community.communityName }}</p>
                                    <p class="recommend-desc">活跃用户: {{ community.activeUsers || '未知' }}</p>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>

    <!-- 创建社区表单 -->
    <el-dialog v-model="dialogFormVisible" title="创建社区" class="create-community-dialog">
        <div class="form-container">
            <el-form :model="form" ref="form" label-position="top" class="modern-form">
                <el-form-item label="社区名称">
                    <el-input v-model="form.communityName" placeholder="请输入社区名称" clearable />
                </el-form-item>

                <el-form-item label="社区描述">
                    <el-input v-model="form.communityDescription" type="textarea" placeholder="简要描述社区内容" autosize />
                </el-form-item>

                <el-form-item label="所属类别">
                    <el-select v-model="form.categoryId" placeholder="请选择社区类别" clearable>
                        <el-option v-for="cat in filteredCatIdAndName" :key="cat.categoryId" :label="cat.categoryName"
                            :value="cat.categoryId" />
                    </el-select>
                </el-form-item>
            </el-form>

            <!-- 底部按钮区域 -->
            <div class="form-footer">
                <el-button @click="dialogFormVisible = false" class="btn-cancel">取消</el-button>
                <el-button type="primary" @click="createCommunity" class="btn-submit">创建社区</el-button>
            </div>
        </div>
    </el-dialog>

</template>

<script>
import image54 from "../assets/img/54.png";
import image55 from "../assets/img/55.png";
import image56 from "../assets/img/56.png";

import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
    name: "CompetitionCommunity",
    data() {
        return {
            images: [image54, image55, image56],

            guessLikeItems: [ // 猜你喜欢的内容
                { title: "前端开发学习指南" },
                { title: "Vue3最佳实践" },
                { title: "竞赛资源分享平台" }
            ],
            relatedCommunities: [ // 与竞赛相关的社区

            ],
            competitionName: '算法设计大赛', // 动态竞赛名称
            popularCommunities: [], // 推荐关注的社区

            // 搜索与分类,默认展示最热帖子
            activeTab: "hot",
            searchQuery: "",

            // 内容列表
            contentItems: [],

            // 推荐关注
            popularCommunities: [], // 存储推荐社区的数据
            //猜你喜欢
            guessLikeItems: [],
            // 关注更新
            followUpdatePosts: [],

            //创建社区返回的表单数据
            form: {
                communityName: '',
                communityDescription: '',
                categoryId: "",
                communityLevel: '',
                communityUnderview: 0, // 默认值
            },
            formLabelWidth: '150px',  //添加修改对话框label宽度
            dialogFormVisible: false,
            title: '创建社区',
            formLabelWidth: '100px',
            filteredCatIdAndName: [], // 过滤后的类别数据
            catInfoData: [], //表格的类别信息
            catIdAndName: [], //全部类别id和名称
        };
    },
    created() {
        this.fetchHotPosts(); // 在组件创建时获取最热帖子
        this.fetchPopularCommunities(); // 获取推荐社区
        this.contentItems.forEach(item => {
            this.getPostCounts(item.postId); // 为每个帖子获取统计信息
        });
    },
    computed: {
        // 根据搜索关键字过滤帖子
        filteredContentItems() {
            if (!this.searchQuery) return this.contentItems;
            return this.contentItems.filter((item) =>
                item.postTitle ? item.postTitle.includes(this.searchQuery) : false
            );
        },
        // 添加一个计算属性，用于过滤掉没有父级的类别
        filteredCatIdAndName() {
            return this.catIdAndName.filter(item => item.parentId != null);
        },
    },
    methods: {
        //类别筛选
        isCorrectId() {
            return this.catIdAndName.filter(item => item.categoryId === this.form.categoryId)[0].categoryName
        },
        navigateToPostDetail(item) {
            console.log('跳转到详情页面:', item); // 检查 item 数据
            // 跳转到 PostDetail 页面，传递 postId
            this.$router.push({ name: "PostDetail", params: { postId: item.id } });
        },
        goToCommuSearch() {
            // 跳转到 CommuSearch 页面
            this.$router.push({ name: 'CommuSearch' });
        },

        // 点击进入社区详情页面
        navigateToCommuDetail(community) {

            console.log('点击的社区ID:', community.communityId);  // 确保社区ID能够正确获取
            this.$router.push({
                name: 'CommuDetail',
                params: {
                    communityId: community.communityId,
                    communityName: community.communityName
                }
            });
        },
        // 点击进入帖子详情页面
        navigateToPostDetail(item) {

            console.log('点击的帖子ID:', item.postId);  // 确保社区ID能够正确获取
            this.$router.push({
                name: 'PostDetail',
                params: {
                    postId: item.postId,
                }
            });
        },
        // 点击标签页时触发的事件
        handleTabClick(tab) {
            console.log('Tab 数据:', tab.props.name); // 输出事件参数
            if (!tab || !tab.props || !tab.props.name) {
                console.error('Tab 数据无效，未能读取 name 属性');
                return;
            }
            const tabName = tab.props.name;
            switch (tabName) {
                case 'hot':
                    this.fetchHotPosts();
                    break;
                case 'recommend':
                    this.fetchRecommendPosts();
                    break;
                case 'latest':
                    this.fetchLatestPosts();
                    break;
                default:
                    console.error('未知的标签:', tabName);
            }
        },
        // 获取最热帖子数据
        fetchHotPosts() {
            console.log('获取最热帖子...');
            axios.get('v1/posts/post/mostlike')
                .then(response => {
                    console.log('最热帖子数据:', response.data); // 打印数据到控制台
                    this.contentItems = response.data;

                    // 在这里调用 getPostCounts
                    this.contentItems.forEach(item => {
                        this.getPostCounts(item.postId);
                    });
                })
                .catch(error => {
                    console.error('获取最热帖子失败:', error);
                });
        },
        // 获取最新帖子数据
        fetchLatestPosts() {
            console.log('获取最新帖子...');
            axios.get('v1/posts/post/earlytime')
                .then(response => {
                    this.contentItems = response.data;
                })
                .catch(error => {
                    console.error('获取最新帖子失败:', error);
                });
        },
        // 获取推荐帖子数据
        fetchRecommendPosts() {
            console.log('获取推荐帖子...');
            axios.get('v1/posts/post/recommend')
                .then(response => {
                    this.contentItems = response.data;
                })
                .catch(error => {
                    console.error('获取推荐帖子失败:', error);
                });
        },
        // 搜索帖子
        searchPosts() {
            console.log('搜索帖子关键字:', this.searchQuery);
            axios.post('v1/posts/search', { keyword: this.searchQuery })
                .then(response => {
                    console.log('搜索结果:', response.data); // 打印数据到控制台
                    this.contentItems = response.data.list; // 假设返回的数据结构中有 list 字段
                })
                .catch(error => {
                    console.error('搜索帖子失败:', error);
                });
        },

        // 获取帖子的点赞数、评论数和收藏数
        getPostCounts(postId) {
            console.log('获取帖子统计信息...');
            axios.get(`v1/posts/post/allcount/${postId}`)
                .then(response => {
                    const postDTO = response.data;
                    this.updatePostCounts(postDTO); // 传递整个 postDTO 对象
                })
                .catch(error => {
                    console.error('获取帖子统计信息失败:', error);
                });
        },

        // 更新帖子统计信息的方法
        updatePostCounts(postDTO) {
            const index = this.contentItems.findIndex(item => item.postId === postDTO.postId);
            if (index !== -1) {
                this.contentItems[index] = {
                    ...this.contentItems[index],
                    likeCount: postDTO.likeCount,
                    commentCount: postDTO.commentCount,
                    favoriteCount: postDTO.favoriteCount,
                    viewCount: postDTO.viewCount,
                };
            }
        },


        // 打开添加社区的对话框
        openAddDialog() {
            console.log('打开社区对话框');
            this.form = {
                communityName: '',
                communityDescription: '',
                categoryId: null,
                communityLevel: '',
                communityUnderview: 0, // 设置默认值
            };
            this.dialogFormVisible = true;
        },

        // 创建社区的方法
        createCommunity() {
            console.log("创建社区按钮被点击了");
            if (!this.form.communityName || !this.form.communityDescription || !this.form.categoryId) {
                ElMessage({ message: '请填写完整的社区信息！', type: 'warning' });
                return;
            }
            console.log(this.form); // 输出表单数据
            // 向后端发送请求
            axios.post('v1/cmns/cmn', this.form).then((response) => {
                console.log("后端返回数据：", response.data);
                if (response.data === 1) {
                    // 确认后关闭对话框
                    this.dialogFormVisible = false;
                    ).then(() => {
                        // 使用 ElMessageBox 弹窗提示用户
                        ElMessageBox.confirm(
                            '社区创建成功！管理员正在审核，预计1个工作日完成审核，请耐心等待。',
                            '社区创建成功',
                            {
                                confirmButtonText: '确认',
                                cancelButtonText: '取消',
                                type: 'success'
                            }
                    }).catch(() => {
                                // 用户点击取消或关闭弹窗时的处理
                                console.log('用户取消了');
                            });
                } else {
                    ElMessage({ message: '社区创建失败！', type: 'error' });
                }
            }).catch((err) => {
                console.log("请求失败", err);
                ElMessage({ message: '请求失败，请重试', type: 'error' });
            });
        },



        // 获取社区列表
        getCommunityList() {
            this.$http.get('/community/v1/list').then((response) => {
                if (response.data) {
                    // 更新社区列表
                }
            }).catch((err) => {
                ElMessage({ message: '获取社区列表失败', type: 'error' });
            });
        },
        // 获取热门社区
        fetchPopularCommunities() {
            console.log('获取热门社区...');
            const communitySearch = {
                popular: 1
            };
            axios.post('/v1/cmns/search', communitySearch)
                .then(response => {
                    console.log('热门社区数据:', response.data);

                    this.popularCommunities = response.data.list;
                    this.guessLikeItems = (response.data.list || []).filter((_, index) => index >= 3 && index < 5);

                    console.log('截取后的数据:', this.guessLikeItems);

                    // const communityIds = this.popularCommunities.map(community => community.communityId);
                    // console.log('热门社区 ID 列表:', communityIds); // 输出每个社区的 ID
                    // // 如果需要，你可以将 communityIds 存储在数据中
                    // this.communityIds = communityIds;
                })
                .catch(error => {
                    console.error('获取推荐社区失败:', error);
                    ElMessage.error('获取推荐社区失败');
                });
        },
        stripHtmlTags(content) {
            return content.replace(/<\/?[^>]+(>|$)/g, ""); // 使用正则表达式去除HTML标签
        }

    },
    mounted() {
        //在页面加载时获取所有分类，给到添加和编辑题目的分类下拉框
        this.$http.get('/cat/v1/all').then((response) => {
            this.catIdAndName = response.data;
            console.log(this.catIdAndName);
        });
    },
};
</script>

<style scoped>
.carousel-image {
    width: 100%;
    height: 260px;
}

.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

/* 页面整体布局 */
.main-page {
    font-size: 14px;
    /* 调整全局字体大小 */
    margin: 0 auto;
    max-width: 1200px;
    padding: 10px 15px;
    /* 减少内边距 */
    background-color: #f4f6f8;
    /* 背景色 */
    margin-top: 20px;
    /* 添加顶部外边距，防止内容紧贴导航栏 */
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    /* 轻微阴影增强层次感 */
}

/* 调整右侧区域整体布局 */
.el-col {
    padding-right: 10px;
    /* 减小左右间隔 */
}

.sidebar {
    margin-top: 10px;
    /* 减小顶部间隔 */
}

/* 搜索与分类筛选区域 */
.search-filter {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    /* 减少组件内边距 */
    margin-bottom: 10px;
    /* 减少下方间距 */

}

/* 搜索框 */
.search-input {
    border-radius: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.search-input:hover,
.search-input:focus {
    border-color: #5a67d8;
    box-shadow: 0 0 6px rgba(90, 103, 216, 0.4);
}

/* 内容卡片样式 */
.post-card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    padding: 3px;
    /* 减少卡片内边距 */
    margin-bottom: 5px;
    /* 调整卡片之间的间距 */
    border-left: 5px solid #5a67d8;
    /* 加入左侧配色条，增加视觉层次 */
}

.post-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.post-header {
    display: flex;
    justify-content: flex-end;
    /* 使内容靠右对齐 */
}

.post-tag {
    font-size: 12px;
    color: #ffffff;
    background-color: #5a67d8;
    padding: 5px 5px;
    border-radius: 5px;
}

.post-title {
    font-size: 18px;
    /* 标题字体稍微缩小 */
    margin: 0;
    /* 标题上下留白0 */
    font-weight: 600;
    color: #333;
    transition: color 0.3s ease;
}

.post-title:hover {
    color: #5a67d8;
}

.post-summary {
    color: #666;
    overflow: hidden;
    /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
    /* 显示省略号 */
    white-space: nowrap;
    /* 防止文本自动换行 */
    font-size: 13px;
    /* 摘要文字更小 */
    line-height: 1.4;
    /* 减小行高 */
    max-height: 3.6em;
    /* 控制显示最多2-3行 */
}

.post-info {
    display: flex;
    gap: 20px;
    color: #999;
    font-size: 13px;
    margin-top: 10px;
}

.post-info span {
    display: flex;
    align-items: center;
    gap: 5px;
}

.post-info i {
    color: #5a67d8;
}

/* 侧边栏推荐社区 */
/* 卡片整体样式 */
.recommend-card,
.related-card,
.guess-card {
    margin-bottom: 10px;
    /* 减小卡片之间的间距 */
    border-radius: 8px;
    /* 稍微减小圆角 */
    background-color: #fff;
    /* 白色背景 */
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
    /* 轻微阴影增强立体感 */
    transition: all 0.3s ease;
}

/* 卡片标题样式 */
.recommend-header h3,
.guess-card h3,
.related-card h3 {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.community-search-button-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    /* 确保容器占满整个宽度 */
    margin-top: 10px;
    /* 根据需要调整上边距 */
}

.recommend-item {
    padding: 3px 3px;
    /* 减少推荐社区的内边距 */
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.recommend-item:hover {
    background-color: #f0f4ff;
}

.recommend-avatar {
    margin-right: 10px;
    transition: transform 0.3s ease;
}

.recommend-item:hover .recommend-avatar {
    transform: scale(1.1);
}

.recommend-info {
    display: flex;
    flex-direction: column;
}

.recommend-name {
    font-size: 15px;
    /* 社区名称字体稍小 */
    font-weight: 600;
    color: #333;
}

.recommend-desc {
    font-size: 12px;
    color: #888;
}

/* 创建社区板块 */
.create-community-card {
    padding: 5px;
    /* 调整内边距 */
    border-radius: 8px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #f9fafb;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}

.create-community-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    background-color: #f0f4ff;
}

.create-community-content h3 {
    font-size: 18px;
    color: #333;
    margin: 10px 0 5px;
}

.create-community-content p {
    font-size: 14px;
    color: #666;
}

.create-icon {
    font-size: 30px;
    color: #5a67d8;
}

/* 创建社区表单整体样式 */
.create-community-dialog {
    width: 600px;
}

.form-container {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.modern-form .el-form-item {
    margin-bottom: 20px;
}

/* 输入框样式 */
.el-input,
.el-textarea,
.el-select {
    border-radius: 15px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
}

.el-input:focus,
.el-textarea:focus,
.el-select:hover {
    border-color: #5a67d8;
    box-shadow: 0 0 5px rgba(90, 103, 216, 0.3);
}

.el-form-item__label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
}

/* 底部按钮区域 */
.form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 3px;
    /* 减小表单底部按钮区域的留白 */
}

.btn-cancel {
    border-radius: 20px;
    color: #333;
    background-color: #f4f4f4;
    border: none;
    transition: all 0.3s ease;
}

.btn-cancel:hover {
    background-color: #e0e0e0;
}

.btn-submit {
    border-radius: 20px;
    background-color: #5a67d8;
    border-color: #5a67d8;
    color: #fff;
    font-weight: bold;
    transition: all 0.3s ease;
}

.btn-submit:hover {
    background-color: #434190;
    border-color: #434190;
}

.image-banner {
    width: 100%;
    height: 180px;
    /* 可根据需要调整高度 */
    overflow: hidden;
}

.image-banner-content {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 确保图片铺满 */
    border-radius: 8px;
}

.section-title {
    font-size: 20px;
    font-weight: bold;
    color: #5a67d8;
    margin-bottom: 5px;
    position: relative;
}

.section-title span {
    display: inline-block;
    padding: 5px 5px;
    background: #eef2ff;
    border-radius: 5px;
}

.section-title .update-dot {
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: -20px;
}

.guess-item,
.related-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

}

.related-item span {
    margin-left: 10px;
}

.guess-item p {
    margin: 0;
    font-size: 14px;
}


</style>