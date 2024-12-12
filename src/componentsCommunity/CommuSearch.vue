<template>
    <div class="commu-search-page">
        <!-- 外框包裹 -->
        <div class="container-box">
        <!-- 搜索框 -->
        <div class="search-bar">
            <el-row :gutter="10">
                <!-- 搜索输入框 -->
                <el-col :span="20">
                <el-input
                    v-model="searchQuery"
                    placeholder="搜索社区"
                    prefix-icon="el-icon-search"
                    clearable
                />
                </el-col>
                <!-- 搜索按钮 -->
                <el-col :span="4">
                <el-button type="primary" icon="el-icon-search" @click="search">
                    搜索
                </el-button>
                </el-col>
            </el-row>
        </div>
    
        <!-- 社区分类卡片区域 -->
        <div class="community-grid">
            <el-row :gutter="20">
            <el-col
                :span="6"
                v-for="(category, index) in filteredCategories"
                :key="index"
            >
                <el-card class="community-card" shadow="hover">
                <div
                    class="card-content"
                    @mouseover="category.showFollow = true"
                    @mouseleave="category.showFollow = false"
                >
                    <h3>{{ category.title }}</h3>
                    <p>{{ category.followers }}人关注</p>
                    <el-button
                    v-if="category.showFollow"
                    type="primary"
                    size="small"
                    @click="follow(category.title)"
                    >
                    关注
                    </el-button>
                </div>
                </el-card>
            </el-col>
            </el-row>
        </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
    name: "CommuSearch",
    data() {
        return {
        searchQuery: "",
        categories: [
            { title: "气象数据科学", followers: 8756, showFollow: false },
            { title: "地理空间分析", followers: 1269, showFollow: false },
            { title: "遥感影像分析", followers: 1311, showFollow: false },
            { title: "大数据建模", followers: 929, showFollow: false },
            { title: "医学大数据", followers: 5190, showFollow: false },
            { title: "商业分析", followers: 3472, showFollow: false },
            { title: "机器学习", followers: 5336, showFollow: false },
            { title: "深度学习", followers: 3312, showFollow: false },
        ],
        };
    },
    computed: {
        filteredCategories() {
        if (!this.searchQuery) return this.categories;
        return this.categories.filter((category) =>
            category.title.includes(this.searchQuery)
        );
        },
    },
    methods: {
        follow(title) {
        console.log(`已关注 ${title}`);
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
    margin: 20px,20px;
    ;
    }
    
    /* 社区网格区域 */
    .community-grid {
    margin-top: 20px;
    }
    
    /* 卡片内容 */
    .card-content {
    text-align: center;
    }
    </style>
    