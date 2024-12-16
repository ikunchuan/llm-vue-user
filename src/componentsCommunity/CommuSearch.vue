<template>
    <div class="commu-search-page">
        <!-- 外框包裹 -->
        <div class="container-box">
            <!-- 搜索框 -->
            <div class="search-bar">
                <el-row :gutter="10">
                    <!-- 搜索输入框 -->
                    <el-col :span="20">
                        <el-input v-model="searchQuery" placeholder="搜索社区" prefix-icon="el-icon-search" clearable />
                    </el-col>
                </el-row>
            </div>

            <!-- 社区列表 -->
            <el-row :gutter="20">
                <el-col v-for="community in filteredCommunities" :key="community.communityId" :span="6"
                    @mouseenter="() => joinButtonVisible[community.communityId] = true"
                    @mouseleave="() => joinButtonVisible[community.communityId] = false"
                    @click="navigateToCommuDetail(community)">
                    <el-card class="community-card" shadow="hover">
                        <div class="card-content">
                            <div class="icon-container">
                                <img :src="communityIcons[community.communityName]" alt="Community Icon" class="community-icon" :style="{ width: iconSize + 'px', height: iconSize + 'px' }">
                            </div>
                            <div class="text-container">
                                <h3>{{ community.communityName }}</h3>
                                <el-button v-if="joinButtonVisible[community.communityId] && !community.joined"
                                    type="primary" @click="joinCommunity(community.communityId, community)"
                                    :disabled="community.joined">
                                    {{ community.joined ? '已加入' : '加入' }}
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash'; // 确保引入lodash

export default {
    name: "CommuSearch",
    created() {
        this.fetchCommunities();
    },
    watch: {
        searchQuery(newQuery) {
            this.debounceSearch();
        },
    },
    data() {
        return {
            searchQuery: "",
            communities: [], // 存储社区数据
            filteredCommunities: [], // 过滤后的社区列表
            debounceTimer: null,
            joinButtonVisible: {}, // 存储每个社区的按钮显示状态
            resourceBoxes: [], // 确保这里定义了 resourceBoxes
            communityIcons: {
            "创新设计官方社区1": "/src/assets/img/17.png",
            "创业实践官方社区1": "/src/assets/img/18.png",
            "科技研发官方社区1": "/src/assets/img/19.png",
            "程序设计官方社区1": "/src/assets/img/20.png",
            "网络安全官方社区1": "/src/assets/img/21.png",
            "人工智能与大数据官方社区1": "/src/assets/img/22.png",
            "数据挖掘与分析1": "/src/assets/img/23.png",
            "数学知识": "/src/assets/img/24.png",
            "数学建模": "/src/assets/img/25.png",
            "财务会计": "/src/assets/img/26.png",
            "企业运营与管理": "/src/assets/img/27.png",
            "供应链与物流": "/src/assets/img/28.png",
            "商业案例分析": "/src/assets/img/29.png",
            "金融数据分析": "/src/assets/img/30.png",
            "社会调研分析": "/src/assets/img/31.png",
            "语言表达": "/src/assets/img/32.png",
            "英语应用": "/src/assets/img/33.png",
            "跨文化交流": "/src/assets/img/34.png",
            "imagetest": "/src/assets/img/35.png",
            // 添加其他社区的图标路径
        },
        iconSize: 30, // 图标大小，可以根据需要调整
        };
    },
    methods: {
        // 获取社区列表
        fetchCommunities() {
            axios.get('/v1/cmns/cmn')
                .then(response => {
                    console.log("获取到的社区数据：", response.data); // 查看返回的数据结构
                    this.communities = response.data.map(community => ({
                        ...community,
                        joined: false, // 假设初始状态为未加入
                    }));
                    this.filteredCommunities = [...this.communities]; // 初始时，过滤列表与完整列表相同
                })
                .catch(error => {
                    console.error('获取社区列表失败:', error);
                });
        },
        // 实现搜索
        search() {
            console.log("搜索条件：", this.searchQuery); // 查看搜索条件
            this.filteredCommunities = this.communities.filter(community =>
                community.communityName && community.communityName.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
            console.log("过滤后的社区：", this.filteredCommunities); // 查看过滤后的结果
        },
        debounceSearch: _.debounce(function () {
            this.search();
        }, 300),

        // 实现加入社区(这里还有bug，传了两个东西？)
        joinCommunity(communityId, community) {
            const userId = this.getCurrentUser().userId; // 获取当前用户ID
            axios.post('/ucmns/v1/ucmn', {
                userId: userId,
                communityId: communityId,
            })
                .then(response => {
                    // 加入成功后，更新社区状态
                    community.joined = true;
                    this.joinButtonVisible[communityId] = false; // 隐藏按钮
                })
                .catch(error => {
                    console.error('加入社区失败:', error);
                });
        },
        navigateToCommuDetail(community) {
            if (!community || !community.communityId) {
                console.error('社区 ID 为空，无法跳转');
                return;
            }
            console.log('跳转的社区 ID:', community.communityId);
            this.$router.push({
                name: 'CommuDetail',
                params: {
                    communityId: community.communityId,
                    communityName: community.communityName
                }, 
            });
        }

    },
};
</script>

<style scoped>
/* 整体外框 */
.container-box {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
}

/* 搜索框 */
.search-bar {
    margin: 20px 0;
}

/* 卡片样式 */

.community-card {
    padding: 20px;
    display: flex;
    align-items: flex-start; /* 确保内容从顶部开始 */
    flex-direction: row; /* 水平布局 */
    transition: transform 0.3s ease;
}

.icon-container {
    margin-right: 20px; /* 图片和文本之间的间距 */
}

.community-icon {
    width: 40px; /* 图标大小 */
    height: 40px;
}

.text-container {
    display: flex;
    flex-direction: column; /* 文本和按钮垂直排列 */
    justify-content: center; /* 垂直居中对齐 */
}

.text-container h3 {
    font-size: 16px;
    margin: 0;
}

.community-card:hover {
    transform: scale(1.05);
    /* 鼠标悬停时放大效果 */
}

/* 卡片内文字样式 */
.card-content h3 {
    font-size: 16px;
    margin-bottom: 20px;
}

/* 按钮动态显示 */
.el-button {
    margin-top: 10px;
    transition: opacity 0.3s ease;
    /* 添加按钮显隐的过渡效果 */
}

.el-button[disabled] {
    background-color: #ccc;
    /* 禁用状态按钮变灰 */
}
</style>
