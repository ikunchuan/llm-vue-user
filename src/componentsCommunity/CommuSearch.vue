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
                            <h3>{{ community.communityName }}</h3>
                            <el-button v-if="joinButtonVisible[community.communityId] && !community.joined"
                                type="primary" @click="joinCommunity(community.communityId, community)"
                                :disabled="community.joined">
                                {{ community.joined ? '已加入' : '加入' }}
                            </el-button>
                            <el-button v-if="community.joined" type="default" disabled>
                                已加入
                            </el-button>
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
            // 使用社区对象中的 id 属性作为参数跳转到 CommuDetail 页面
            this.$router.push({ name: 'CommuDetail', params: { communityId: community.communityId } });
        },
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
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 80px;
    /* 卡片高度 */
    transition: transform 0.3s ease;
    /* 添加卡片悬停动画 */
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
