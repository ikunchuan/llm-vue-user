<template>
    <div class="login-page">
        <div class="left-panel">
            <img src="../assets/img/Logo.jpg" alt="Logo" class="lingyan-logo" />
            <div class="logo">
                灵验领航
            </div>
            <div class="slogan">在同一个地方构思、设计、协作，让竞赛更加清晰明了</div>
            <ul class="features" v-for="item in slogan" :key="item.name">
                <li><el-row><el-col span="2"><el-icon size=35>
                                <CircleCheckFilled style="margin-right: 8px;" />
                            </el-icon></el-col><el-col span="2">{{ item.name }}</el-col></el-row>
                </li>
            </ul>
        </div>

        <div class="right-panel">
            <transition name="el-fade-in-linear" @before-enter="beforeEnter" @enter="enter">
                <el-card class="login-card" v-if="showCard" :key="cardKey">
                    <router-view />
                </el-card>
            </transition>
        </div>
    </div>
</template>

<script>
import { CircleCheckFilled } from '@element-plus/icons-vue';
import axios from 'axios';
export default {
    data() {
        return {
            showCard: true,  // 控制卡片是否显示
            cardKey: 0,      // 用来强制 Vue 重新渲染

            slogan: [
                { name: "AI 协助" },
                { name: "实时在线" },
                { name: "最适资源" },
            ],
        };
    },

    components: {
        CircleCheckFilled,
    },

    methods: {
        beforeEnter(el) {
            // 这里可以设置进入前的样式，例如 opacity: 0
            el.style.opacity = 0;
        },

        enter(el, done) {
            // 这里可以设置动画完成后的回调
            el.offsetHeight; // 强制重排
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = 1;
            done();
        },

        leave(el, done) {
            // 设置离开时的动画（淡出）
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = 0;
            done();  // 离开动画结束后的回调
        },

        updateCard() {
            // 点击更新内容按钮时，切换卡片内容并触发过渡
            this.cardKey++;
            this.showCard = false;
            setTimeout(() => {
                this.showCard = true;
            }, 500);  // 延迟卡片显示，确保淡出动画完成
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
    margin: 5px 0;
    font-size: 1rem;
    text-shadow: 0 0 5px #888;
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

/* 淡入过渡效果 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

/* Vue 2.1.8 之后 */
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-leave-to {
    opacity: 0;
}
</style>