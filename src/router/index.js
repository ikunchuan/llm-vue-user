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
import Login from "../components/Login.vue";
import Comp from "../componentsCompetition/Comp.vue";
import CompDetail from "../componentsCompetition/CompDetail.vue";
import Course from "../componentsResources/Course.vue";
import CourseDetail from "../componentsResources/CourseDetail.vue";
import Lingyan from "../components/Lingyan.vue";
import Me from "../componentsMe/Me.vue";
import Community from "../componentsCommunity/Community.vue";
import CommuDetail from "../componentsCommunity/CommuDetail.vue";
import CommuSearch from "../componentsCommunity/CommuSearch.vue";
import PostDetail from "../componentsCommunity/PostDetail.vue";
import PostCreat from "../componentsCommunity/PostCreat.vue";
import Question from "../componentsResources/Quesion.vue";
import AnswerDetail from "../componentsResources/AnswerDetail.vue";
import HomePage from "../components/HomePage.vue";

const routes = [
  { path: "/", redirect: "/homepage" },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
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
        path: "/homepage",
        name: "HomePage",
        component: HomePage,
      },
      {
        path: "comp",
        name: "Comp",
        component: Comp,
      },
      {
        path: "compdetail/:compId", // 确保路径匹配，并且可以接收compId参数
        name: "CompDetail",
        component: CompDetail,
      },

      {
        path: "course",
        name: "Course",
        component: Course,
      },
      {
        path: "coursedetail/:courseId",
        component: CourseDetail,
        name: "CourseDetail",
      },

      {
        path: "question",
        name: "Question",
        component: Question,
      },
      {
        path: "answerdetail/:answerId",
        component: AnswerDetail,
        name: "AnswerDetail",
      },

      {
        path: "lingyan",
        name: "Lingyan",
        component: Lingyan,
      },
      {
        path: "community",
        component: Community,
      },
      {
        path: "commudetail/:communityId/:communityName",
        name: "CommuDetail",
        component: CommuDetail,
      },
      {
        path: "commusearch",
        name: "CommuSearch",
        component: CommuSearch,
      },
      {
        path: "postcreat",
        name: "PostCreat",
        component: PostCreat,
      },
      {
        path: "postdetail",
        name: "PostDetail",
        component: PostDetail,
      },
      {
        path: "me",
        component: Me,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
