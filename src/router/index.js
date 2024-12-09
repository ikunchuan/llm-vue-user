// import { createRouter, createWebHashHistory } from "vue-router";
// import Comp from "../componentsCompetition/Comp.vue";

// const routes = [
//     { path: "/", redirect: "/Comp" }, // 默认重定向到主页面
//         {
//             path: "/Comp",
//             name: "Comp",
//             component: Comp, // 主页面
//         },

//     ];

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes,
// });

// export default router;

// import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../components/Home.vue";
// import Comp from "../componentsCompetition/Comp.vue";

// const routes = [
//   { path: "/", redirect: "/home" }, // 默认重定向到首页
//   {
//     path: "/home",
//     name: "Home",
//     component: Home, // 导航栏页面
//   },
//   {
//     path: "/about",
//     name: "About",
//     component: Comp, // 关于我们页面
//   },
//   {
//     path: "/services",
//     name: "Services",
//     component: Comp, // 服务页面
//   },
//   {
//     path: "/community",
//     name: "Community",
//     component: Comp, // 社区页面
//   },
//   {
//     path: "/comp",
//     name: "Comp",
//     component: Comp, // 竞赛中心页面
//   },
// ];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

// export default router;


// index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Comp from "../componentsCompetition/Comp.vue";
// import CompResources from "../components/CompResources.vue";
// import CompKnowledge from "../components/CompKnowledge.vue";
// import CompCommunity from "../components/CompCommunity.vue";

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "HomeDefault",
        component: Comp // 默认显示的内容
      },
      {
        path: "comp",
        name: "Comp",
        component: Comp
      },
    //   {
    //     path: "resources",
    //     name: "CompResources",
    //     component: CompResources
    //   },
    //   {
    //     path: "knowledge",
    //     name: "CompKnowledge",
    //     component: CompKnowledge
    //   },
    //   {
    //     path: "community",
    //     name: "CompCommunity",
    //     component: CompCommunity
    //   }
    ]
  },
  // 其他路由...
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;