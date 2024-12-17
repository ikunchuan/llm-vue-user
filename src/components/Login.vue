<template>
    <h2 class="login-title">登录你的账号</h2>
    <div class="register-tip">
        <el-text style="font-size: 16px;">没有账户？
            <el-link type="primary" @click="goToRegister" style="font-size: 16px;" :underline="false">去注册></el-link>
        </el-text>
    </div>

    <el-form :model="loginForm" :rules="rules" label-width="0" size="large" @keydown.enter="handleLogin">
        <!-- @keydown.enter="handleLogin 监听回车 -->
        <el-tabs v-model="activeTab">
            <el-tab-pane label="账号密码登录" name="password">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="请输入用户名" clearable>
                        <template #prefix>
                            <el-icon>
                                <User color="#409efc" />
                            </el-icon></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input v-model="loginForm.userPassword" type="password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock color="#409efc" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-checkbox v-model="loginForm.rememberMe" style="margin-bottom: 20px;"
                    @click="handleCheckBoxVal">记住我</el-checkbox>
            </el-tab-pane>
        </el-tabs>

        <el-form-item>
            <el-button type="primary" block @click="handleLogin">登录</el-button>
            <el-button type="primary" size="small" text @click="resstForm">重置</el-button>
        </el-form-item>
    </el-form>

    <div class="other-login">
        <span style="font-size: 14px;">其他方式</span>
        <el-divider />
        <el-button icon="i" circle style="margin-right:30px; border: none;" size="large"></el-button>
        <el-button icon="i" circle style="border: none;" size="large"></el-button>
    </div>

    <div class="agreement">
        <el-text style="font-size: 14px;">点击[登录]表示你已同意
            <el-link style="font-size: 14px;" type="primary" :underline="false" @click="goToTOS">服务条款</el-link>
            和
            <el-link style="font-size: 14px;" type="primary" :underline="false" @click="goToPP">隐私协议</el-link></el-text>
    </div>
</template>

<script>
import { User, Lock } from '@element-plus/icons-vue';

export default {
    data() {
        return {
            activeTab: "password",
            loginForm: {
                userName: "",
                userPassword: "",
                rememberMe: false,
            },
            rules: {
                userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                userPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
        };
    },

    created() {
        // 尝试从 sessionStorage 中获取用户名并回显到输入框
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            this.loginForm.userName = storedUserName;
        }
    },

    methods: {
        // 异步处理登录
        async handleLogin() {
            try {
                const response = await this.$http.post('/uis/v1/login', this.loginForm);
                if (response.data.code === 200) {
                    this.$message.success('登录成功！');
                    console.log('信息', response.data);
                    sessionStorage.setItem('userId', response.data.data.userid);
                    sessionStorage.setItem('userName', response.data.data.username);
                    sessionStorage.setItem('satoken', response.data.data.token);
                    this.$router.push('/homepage');
                } else {
                    this.$message.error('登录失败！请检查用户名和密码');
                }
            } catch (err) {
                console.error('登录请求失败:', err);
                this.$message.error('登录请求失败！');
            }
        },

        resstForm() {
            this.loginForm = {};
        },
        goToRegister() {
            this.$router.push('/register');
        },
    },
    components: {
        User,
        Lock,
    },
};
</script>

<style scoped>
.login-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: center;
}

.register-tip {
    text-align: center;
    margin-bottom: 20px;
}

.other-login {
    text-align: center;
    margin: 20px 0;
}

.other-login span {
    display: block;
    margin-bottom: 10px;
}

.agreement {
    text-align: center;
    font-size: 0.9rem;
    color: #888;
}
</style>