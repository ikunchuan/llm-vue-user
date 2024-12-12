<template>
    <el-container class="main-page">
        <!-- 主内容区域 -->
        <el-main>
            <el-row :gutter="20">
                <!-- 左侧主内容 -->
                <el-col :span="18">
                    <!-- 功能分类区域 -->
                    <div class="function-buttons">
                        <el-row :gutter="20">
                            <el-col :span="6" v-for="(button, index) in buttons" :key="index">
                                <el-card shadow="hover" class="function-card">
                                    <div class="card-content">
                                        <i :class="button.icon" class="icon"></i>
                                        <p class="text">{{ button.text }}</p>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 搜索与分类筛选 -->
                    <div class="search-filter bg-white p-3 rounded shadow-sm">

                        <el-tabs v-model="activeTab">
                            <el-input v-model="searchQuery" placeholder="搜索竞赛内容" class="mt-3"
                                prefix-icon="el-icon-search" @click="navigateToPostDetail(item)" />
                            <el-tab-pane label="最热" name="hot">
                                <!-- 内容列表1 -->
                                <div class="content-list">
                                    <el-card v-for="(item, index) in filteredContentItems" :key="index" shadow="hover"
                                        class="mb-3" @click="navigateToPostDetail(item)">
                                        <div>
                                            <el-tag type="info" class="mb-2">{{ item.category }}</el-tag>
                                            <h3>{{ item.title }}</h3>
                                            <p class="text-muted">{{ item.summary }}</p>
                                        </div>
                                        <div class="stats d-flex justify-content-between">
                                            <span>👍 {{ item.likes }}</span>
                                            <span>💬 {{ item.comments }}</span>
                                            <span>⭐ {{ item.saves }}</span>
                                        </div>
                                    </el-card>
                                </div>

                            </el-tab-pane>
                            <el-tab-pane label="推荐" name="recommend">
                                <!-- 内容列表2 -->
                            </el-tab-pane>

                            <el-tab-pane label="最新" name="latest">
                                <!-- 内容列表3 -->
                            </el-tab-pane>

                        </el-tabs>

                    </div>

                    <!-- 分页区域 -->
                    <div class="pagination mt-3">
                        <el-pagination background layout="prev, pager, next" :total="filteredContentItems.length"
                            :page-size="5" />
                    </div>
                </el-col>

                <!-- 右侧推荐栏 -->
                <el-col :span="6">
                    <div class="sidebar">
                        <el-card shadow="hover" class="mb-3">
                            <h3>推荐关注</h3>
                            <el-button @click="goToCommuSearch()">全部社区</el-button>
                            <div v-for="(users, index) in users" :key="index" class="d-flex align-items-center mb-2"
                                @click="navigateToCommuDetail(users)">
                                <el-avatar :src="users.avatar" size="small" class="me-2" />
                                {{ users.name }}
                            </div>
                        </el-card>
                    </div>
                </el-col>


            </el-row>
        </el-main>
    </el-container>
</template>

<script>

export default {
    name: "CompetitionCommunity",
    data() {
        return {
            // 功能分类按钮
            buttons: [
                { text: "职场与内推", icon: "el-icon-suitcase" },
                { text: "技术交流", icon: "el-icon-chat-dot-round" },
                { text: "创社区", icon: "el-icon-share" },
                { text: "创建社区", icon: "el-icon-message" },
            ],

            // 搜索与分类
            activeTab: "hot",
            searchQuery: "",

            // 内容列表
            contentItems: [
                {
                    category: "编程",
                    title: "全国大学生编程竞赛",
                    summary: "为大学生打造的顶级编程竞赛...",
                    likes: 120,
                    comments: 45,
                    saves: 30,
                },
                {
                    category: "数学建模",
                    title: "全国大学生数学建模竞赛",
                    summary: "面向全国高校，培养创新和建模能力...",
                    likes: 98,
                    comments: 36,
                    saves: 28,
                },
            ],

            // 推荐关注
            users: [
                { name: "编程大佬", avatar: "https://via.placeholder.com/32" },
                { name: "AI极客", avatar: "https://via.placeholder.com/32" },
            ],
        };
    },
    computed: {

        filteredContentItems() {
            if (!this.searchQuery) return this.contentItems;
            return this.contentItems.filter((item) =>
                item.title.includes(this.searchQuery)
            );
        },

    },
    methods: {
        navigateToPostDetail(item) {
            // 跳转到 PostDetail 页面，传递 postId
            this.$router.push({ name: "PostDetail", params: { postId: item.id } });
        },
        goToCommuSearch() {
            // 跳转到 CommuSearch 页面
            this.$router.push({ name: 'CommuSearch' });
        },
        navigateToCommuDetail(users) {
            // 假设用户对象中有id属性，用于导航到具体的CommuDetail页面
            this.$router.push({ name: 'CommuDetail', params: { userName: users.name } });
        }
    },



};
</script>

<style scoped>
.main-page {
    margin: 0 auto;
    max-width: 900px;
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
