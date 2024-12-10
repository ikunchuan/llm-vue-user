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


import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import Comp from "../componentsCompetition/Comp.vue";
import CompDetail from "../componentsCompetition/CompDetail.vue";
import Course from "../componentsResources/Course.vue";
import CourseDetail from "../componentsResources/CourseDetail.vue";
import Lingyan from "../components/Lingyan.vue";
import me from "../components/me.vue";



const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      // {
      //   path: "",
      //   name: "HomeDefault",
      //   component: Comp // 默认显示的内容
      // },
      {
        path: "comp",
        name: "Comp",
        component: Comp
      },
      {
        path: "compdetail/:compId", // 确保路径匹配，并且可以接收compId参数
        name: "CompDetail",
        component: CompDetail,
      },
  
      {
        path: "course",
        name: "Course",
        component: Course
      },
      {
        path: 'coursedetail/:id',
        component: CourseDetail,
        name: 'CourseDetail',
        },
        {
          path: "lingyan",
          name: "Lingyan",
          component: Lingyan,
        },
        {
          path: "me",
  
          component: me,
        },
      
   
   
    ]
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;