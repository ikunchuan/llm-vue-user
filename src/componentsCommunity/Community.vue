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
                        <el-card v-for="(item, index) in filteredContentItems" :key="index" shadow="hover" class="mb-3"
                            @click="navigateToPostDetail(item)">
                            <div>
                                <!-- 使用 communityName 作为分类 -->
                                <el-tag type="info" class="mb-2">{{ item.communityName }}</el-tag>
                                <!-- 使用 postTitle 作为标题 -->
                                <h3>{{ item.postTitle }}</h3>
                                <!-- 使用 postContent 作为摘要 -->
                                <p class="text-muted">{{ item.postContent }}</p>
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
                    <div class="function-buttocardns">
                        <el-card shadow="hover" class="mb-3" @click="openAddDialog">
                            <h3>创建社区</h3>
                        </el-card>
                    </div>

                    <br />

                    <div class="sidebar">
                        <el-card shadow="hover" class="mb-3">
                            <!-- <div v-for="community in popularCommunities" :key="community.id"
                                class="d-flex align-items-center mb-2" @click="navigateToCommuDetail(community)">
                                <el-avatar :src="community.avatar" size="small" class="me-2" />
                                {{ community.communityName }}
                            </div> -->

                            <h3>推荐关注</h3>
                            <el-button @click="goToCommuSearch()">全部社区</el-button>
                            <div v-for="(community, index) in popularCommunities" :key="index"
                                @click="navigateToCommuDetail(community)" style="cursor: pointer;">
                                <el-avatar :src="community.avatar" size="small" class="me-2" />
                                {{ community.communityName }}
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>


    <el-dialog v-model="dialogFormVisible" :title="title">
        <el-form :model="form" ref="form">
            <el-form-item label="社区名称" :label-width="formLabelWidth">
                <el-input v-model="form.communityName" autocomplete="off" />
            </el-form-item>

            <el-form-item label="社区描述" :label-width="formLabelWidth">
                <el-input v-model="form.communityDescription" type="textarea" autocomplete="off" autosize="true" />
            </el-form-item>

            <el-form-item label="所属类别" :label-width="formLabelWidth">
                <el-select v-model="form.categoryId" placeholder="-- 请选择类别 --">
                    <el-option v-for="cat in filteredCatIdAndName" :key="cat.categoryId" :label="cat.categoryName"
                        :value="cat.categoryId" />
                </el-select>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="createCommunity">创建</el-button>
        </span>
    </el-dialog>
</template>

<script>
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "CompetitionCommunity",

    data() {
        return {
            // 功能分类按钮
            buttons: {
                text: "创社区", icon: "el-icon-share"

            },

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
.main-page {
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    background-color: #f4f6f8;
}

.search-filter {
    margin-bottom: 20px;
}

.content-list .el-card {
    padding: 10px;
}

.text-muted {
    color: #888;
}

.pagination {
    display: flex;
    justify-content: center;
}
</style>