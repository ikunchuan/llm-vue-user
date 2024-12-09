import { createRouter, createWebHashHistory } from "vue-router";
import Comp from "../componentsCompetition/Comp.vue";

const routes = [
    { path: "/", redirect: "/Comp" }, // 默认重定向到主页面
        {
            path: "/Comp",
            name: "Comp",
            component: Comp, // 主页面
        },

    ];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;