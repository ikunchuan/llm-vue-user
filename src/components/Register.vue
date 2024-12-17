<template>
    <h2 class="login-title">注册“灵验”账号</h2>
    <div class="register-tip">
        <el-text style="font-size: 16px;">已有账户？
            <el-link type="primary" @click="goToLogin" style="font-size: 16px;" :underline="false">去登录></el-link>
        </el-text>
    </div>

    <el-form :model="registerForm" :rules="rules" label-width="0" size="large" @keydown.enter="handleRegister">
        <!-- @keydown.enter="handleRegister" 监听回车 -->
        <el-tabs v-model="activeTab">
            <el-tab-pane label="账号注册" name="password">

                <el-form-item prop="userName">
                    <el-input v-model="registerForm.userName" placeholder="请输入用户名" clearable>
                        <template #prefix>
                            <el-icon>
                                <User color="#409efc" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="userPassword">
                    <el-input v-model="registerForm.userPassword" type="password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock color="#409efc" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="againPassword">
                    <el-input v-model="registerForm.againPassword" type="password" placeholder="请二次输入密码"
                        ref="againPassword" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock color="#409efc" />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

            </el-tab-pane>
        </el-tabs>

        <el-form-item>
            <el-button type="primary" block @click="handleRegister">注册</el-button>
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
        <el-checkbox style="font-size: 14px;" v-model="rememberMe">已阅读并同意以下协议
            <el-link style="font-size: 14px;" type="primary" :underline="false" @click="">服务条款</el-link>
            和
            <el-link style="font-size: 14px;" type="primary" :underline="false" @click="">隐私协议</el-link>
        </el-checkbox>
    </div>
</template>

<script>
import { User, Lock, CircleCheckFilled } from '@element-plus/icons-vue';
import { nextTick } from 'vue';

export default {
    data() {
        return {
            activeTab: 'password',

            rememberMe: false,

            registerForm: {
                userName: '',
                userPassword: '',
                againPassword: '',
            },

            rules: {
                userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                userPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
                againPassword: [{ required: true, message: "请二次输入密码", trigger: "blur" }],
            },
        };
    },

    methods: {
        // 跳转到登录页面
        goToLogin() {
            this.$router.push('/login');
        },

        // 注册处理函数
        async handleRegister() {
            if (this.registerForm.userPassword !== this.registerForm.againPassword) {
                this.registerForm.againPassword = ''; // 清空第二次输入的密码
                if (this.$refs.againPassword) {
                    this.$refs.againPassword.focus(); // 聚焦到输入框
                }
                return this.$message.error('两次密码不一致');
            }

            if (!this.rememberMe) {
                return this.$message.warning('请勾选同意协议');
            }

            const response = await this.$http.post('/uis/v1/register', this.registerForm);

            if (response.data.code === 200) {
                this.$message.success('注册成功');
                sessionStorage.setItem('userName', this.registerForm.userName);
                // 注册成功后把账号跳转到登录页面
                // 在下一次 DOM 更新后执行跳转
                nextTick(() => {
                    this.$router.push('/login');
                    console.log("跳转到登录页面"); // 注册成功后，确认是否跳转
                });
            } else if (response.data.code === 401) {
                this.$message.warning('用户名已存在');
            } else {
                this.$message.error('注册失败');
            }

        },

        resstForm() {
            this.registerForm = {};
        },

    },

    components: {
        User,
        Lock,
        CircleCheckFilled,
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