<template>
    <el-container class="main-page">
        <!-- 主内容区域 -->
        <el-main>
            <el-row :gutter="20">
                <!-- 左侧主内容 -->
                <el-col :span="18">
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
                                <!-- 左侧标签 -->
                                <el-tag type="success" class="post-tag">{{ item.communityName }}</el-tag>

                                <!-- 帖子标题 -->
                                <h3 class="post-title">{{ item.postTitle }}</h3>

                                <!-- 帖子摘要 -->
                                <p class="post-summary">{{ item.postContent }}</p>

                                <!-- 帖子互动信息 -->
                                <div class="post-info">
                                    <span><i class="el-icon-thumb" /> 👍{{ item.likeCount || 0 }}</span>
                                    <span><i class="el-icon-star-off" /> 🌟{{ item.favoriteCount || 0 }}</span>
                                    <span><i class="el-icon-chat-line-round" /> ▭{{ item.commentCount || 0 }}</span>
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
                    <!-- 功能分类区域 -->

                    <!-- 创建社区板块 -->
                    <div class="function-buttocardns">
                        <el-card shadow="hover" class="create-community-card" @click="openAddDialog">
                            <div class="create-community-content">
                                <i class="el-icon-plus create-icon"></i>
                                <h3>创建社区</h3>
                                <p>点击这里，开启你的社区之旅！</p>
                            </div>
                        </el-card>
                    </div>
                    <br />

                    <div class="sidebar">
                        <el-card shadow="hover" class="recommend-card">
                            <div class="recommend-header">
                                <h3>推荐关注</h3>
                                <el-button type="primary" size="small" @click="goToCommuSearch"
                                    class="all-communities-btn">全部社区</el-button>
                            </div>
                            <div class="recommend-item" v-for="(community, index) in popularCommunities" :key="index"
                                @click="navigateToCommuDetail(community)">
                                <el-avatar :src="community.avatar" size="medium" class="recommend-avatar" />
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
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "CompetitionCommunity",

    data() {
        return {

            // 搜索与分类,默认展示最热帖子
            activeTab: "hot",
            searchQuery: "",

            // 内容列表
            contentItems: [],

            // 推荐关注
            popularCommunities: [], // 存储推荐社区的数据

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
                    console.log('帖子统计信息:', response.data);
                    const postDTO = response.data;
                    this.updatePostCounts(postDTO); // 传递整个 postDTO 对象
                })
                .catch(error => {
                    console.error('获取帖子统计信息失败:', error);
                    ElMessage.error('获取帖子统计信息失败');
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
                    favoriteCount: postDTO.favoriteCount
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
            // 向后端发送请求n
            axios.post('v1/cmns/cmn', this.form).then((response) => {
                console.log("后端返回数据：", response.data);
                if (response.data === 1) {
                    ElMessage({ message: '社区创建成功！', type: 'success' });
                    this.dialogFormVisible = false; // 关闭对话框
                    this.getCommunityList(); // 刷新社区列表
                } else {
                    ElMessage({ message: '社区创建失败！', type: 'error' });
                }
            }).catch((err) => {
                console.log("请求失败", err);
                ElMessage({ message: '请求失败，请重试', type: 'error' });
            });
        },


        // 获取社区列表（根据你的需求定制）
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

                    // 假设后端返回的数据是一个数组
                    this.popularCommunities = response.data.list; // 这里直接取出数组

                    // // 使用 map 提取每个社区的 communityId
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
/* 页面整体布局 */
.main-page {
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    background-color: #f4f6f8;
    /* 背景色 */
    margin-top: 20px;
    /* 添加顶部外边距，防止内容紧贴导航栏 */
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    /* 轻微阴影增强层次感 */
}

/* 搜索与分类筛选区域 */
.search-filter {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
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
    padding: 20px;
    transition: all 0.3s ease;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.post-tag {
    font-size: 12px;
    color: #ffffff;
    background-color: #5a67d8;
    padding: 3px 8px;
    border-radius: 5px;
}

.post-title {
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
    color: #333;
    transition: color 0.3s ease;
}

.post-title:hover {
    color: #5a67d8;
}

.post-summary {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    overflow: hidden;
    /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
    /* 显示省略号 */
    white-space: nowrap;
    /* 防止文本自动换行 */
    max-height: 4.8em;
    /* 设置最大高度，根据行高调整 */
}

.post-info {
    display: flex;
    gap: 15px;
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
.recommend-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.recommend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.recommend-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 6px;
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
    font-size: 14px;
    font-weight: bold;
    color: #333;
}

.recommend-desc {
    font-size: 12px;
    color: #888;
}

/* 创建社区板块 */
.create-community-card {
    border-radius: 12px;
    text-align: center;
    padding: 30px;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #f9fafb;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.modern-form .el-form-item {
    margin-bottom: 20px;
}

/* 输入框样式 */
.el-input,
.el-textarea,
.el-select {
    border-radius: 8px;
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
    margin-top: 10px;
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

/* 按钮统一样式
.el-button {
    border-radius: 20px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.el-button--primary {
    background-color: #5a67d8;
    border-color: #5a67d8;
    color: #ffffff;
}

.el-button--primary:hover {
    background-color: #434190;
    border-color: #434190;
} */

</style>