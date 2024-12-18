<template>
    <div>
        <div v-for="post in postData" :key="post.postId" class="post-item">
            <h3>{{ post.postTitle }}</h3>
            <div class="post-content" v-html="truncateContent(post.postContent)"></div>
            <p>发布时间: {{ post.createdTime }}</p>

            <div class="post-actions">
                <el-button type="primary" size="small" @click="editPost(post.postId)">编辑</el-button>
                <el-button type="info" size="small" @click="viewDetail(post.postId)">详细</el-button>
                <el-button type="danger" size="small" @click="deletePost(post.postId)">删除</el-button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: sessionStorage.getItem("userId"),
            params: {},
            postData: {
                postTitle: "",
                postContent: "",
            },
            postCommunityId: "",
            postCommunityName: "",
        };
    },

    methods: {
        getUserPostsInfo() {
            console.log("userId", this.userId)
            this.$http.get(`/v1/posts/user/${this.userId}`)
                .then(response => {
                    if (response) {
                        console.log("查询出用户所有的帖子")
                        console.log(response);
                        this.postData = response.data;
                        this.postCommunityId = this.postData.communityId
                        this.postCommunityName = this.postData.communityName
                        console.log("完整的postData数据:", this.postData);
                    }
                })
        },

        truncateContent(content) {
            if (!content) {
                return '';
            }
            // 移除HTML标签,只保留文本
            const plainText = content.replace(/<[^>]+>/g, '');
            // 截取前三行,每行最多50个字符
            const lines = plainText.split('\n').slice(0, 3);
            return lines.map(line => line.slice(0, 50)).join('\n') + '...';
        },

        editPost(postId) {
            // 跳转到编辑页面
            this.$router.push({
                path: `/home/postcreat/${postId}`,
                query: { mode: 'edit' }
            });
        },

        viewDetail(postId) {
            // 跳转到详情页面
            this.$router.push(`/home/postdetail/${postId}`);
        },

        deletePost(postId) {
            // 删除帖子
            this.$confirm('确定要删除这篇帖子吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete(`/v1/posts/post/${postId}`)
                    .then(() => {
                        this.$message.success('删除成功');
                        this.getUserPostsInfo(); // 重新加载数据
                    })
                    .catch(err => {
                        this.$message.error('删除失败');
                        console.error(err);
                    });
            });
        }
    },

    created() {
        this.getUserPostsInfo()
    },
}
</script>

<style></style>