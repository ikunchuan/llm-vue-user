<template>
    <div class="login-page">
        <div class="left-panel">
            <img src="../assets/img/Logo.jpg" alt="Logo" class="lingyan-logo" />
            <div class="logo">
                灵验领航
            </div>
            <div class="slogan">在同一个地方，构思、设计、协作，让竞赛更加清晰明了</div>
            <ul class="features">
                <li></li>
                <li>实时在线</li>
                <li></li>
            </ul>
        </div>

        <div class="right-panel">
            <el-card class="login-card">
                <h2 class="login-title">登录你的账号</h2>
                <div class="register-tip">
                    <el-text style="font-size: 16px;">没有账户？<el-link type="primary"
                            @click="goToRegister">去注册</el-link></el-text>
                </div>

                <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0">
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="账号密码登录" name="password">
                            <el-form-item prop="username">
                                <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable />
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
                            </el-form-item>
                            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
                        </el-tab-pane>
                        <!-- 
                        <el-tab-pane label="手机号验证码登录" name="sms">
                            <el-form-item prop="phone">
                                <el-input v-model="loginForm.phone" placeholder="请输入手机号" clearable />
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input v-model="loginForm.code" placeholder="请输入验证码" clearable />
                                <el-button type="primary" size="small" @click="sendCode">发送验证码</el-button>
                            </el-form-item>
                        </el-tab-pane> -->
                    </el-tabs>

                    <el-form-item>
                        <el-row justify="space-evenly">
                            <el-col :span="12"><el-button type="primary" block
                                    @click="handleLogin">登录</el-button></el-col>
                            <el-col :span="12"><el-button type="primary" size="small" text
                                    @click="resstForm">重置</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>

                <div class="other-login">
                    <span style="font-size: 14px;">其他方式</span>
                    <!-- <el-button icon="<i class='el-icon-wechat'></i>" circle></el-button>
                    <el-button icon="<i class='el-icon-s-unfold'></i>" circle></el-button> -->
                </div>

                <div class="agreement">
                    <el-text style="font-size: 14px;">点击【登录】表示你已同意
                        <el-link style="font-size: 14px;" type="primary" :underline="false"
                            @click="goToTOS">服务条款</el-link>
                        和
                        <el-link style="font-size: 14px;" type="primary" :underline="false"
                            @click="goToPP">隐私协议</el-link></el-text>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: "password",
            loginForm: {
                username: "",
                password: "",
                rememberMe: false,
            },
            rules: {
                username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
        };
    },
    methods: {
        async handleLogin() {
            this.$htttp.post(`/uis/v1/login`, this.loginForm).then((result) => {
                if (response.data.code === 200) {
                    this.$message.success('登录成功！');
                    // 将用户名存储在本地存储中
                    localStorage.setItem('userName', response.data.message);
                    // 登录成功后跳转到首页
                    this.$router.push('/home');
                } else {
                    this.$message.error('登录失败！请检查用户名和密码');
                }
            }).catch((err) => {
                this.$message.error('登录请求失败！');
            });
        },
        resstForm() {
            this.loginForm.resetFields();
        },
        goToRegister() {
            this.$router.push('/register');
        },
        goToTOS() {
            this.$router.push('/tos');
        },
        goToPP() {
            this.$router.push('/pp');
        },
    },
};
</script>

<style scoped>
.login-page {
    display: flex;
    height: 100vh;
    background: linear-gradient(135deg, #a8edea, #fed6e3);
}

.lingyan-logo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
}

.left-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 20px;
    text-align: center;
}

.left-panel .logo {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 20px;
    text-shadow: 0 0 5px #888;
}

.left-panel .slogan {
    font-size: 1.2rem;
    margin-bottom: 30px;
    text-shadow: 0 0 5px #888;
}

.left-panel .features {
    list-style: none;
    padding: 0;
    font-size: 1rem;
    text-shadow: 0 0 5px #888;
}

.left-panel .features li {
    margin: 10px 0;
}

.right-panel {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.login-card {
    width: 400px;
    padding: 20px;
}

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