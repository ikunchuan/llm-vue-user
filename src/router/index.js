import { createRouter, createWebHashHistory } from "vue-router";
//=================主页================//
import HomePage from "../components/HomePage.vue";
//主页-导航
import Home from "../components/Home.vue";
//主页-登录注册
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

//==============竞赛==================//
import Comp from "../componentsCompetition/Comp.vue";
import CompDetail from "../componentsCompetition/CompDetail.vue";

//================资源================//
//资源-课程
import Course from "../componentsResources/Course.vue";
import CourseDetail from "../componentsResources/CourseDetail.vue";
//资源-题库与答题
import Question from "../componentsResources/Quesion.vue";
import AnswerDetail from "../componentsResources/AnswerDetail.vue";

//================社区================//
import Community from "../componentsCommunity/Community.vue";
import CommuDetail from "../componentsCommunity/CommuDetail.vue";
import CommuSearch from "../componentsCommunity/CommuSearch.vue";
//社区-帖子
import PostDetail from "../componentsCommunity/PostDetail.vue";
import PostCreat from "../componentsCommunity/PostCreat.vue";

//=================灵验================//
import Lingyan from "../componentsLingYan/Lingyan.vue";
//灵验-对话
// import LingyanDialog from "../componentsLingYan/LingyanDialog.vue";

//=======我的======//
import Me from "../componentsMe/Me.vue";

const routes = [
  { path: "/", redirect: "/homepage" },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {path: "",
      redirect: "/home/comp", 
    },// 默认重定向到comp页面
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
        name: "CourseDetail",
        component: CourseDetail,
      },

      {
        path: "question",
        name: "Question",
        component: Question,
      },
      {
        path: "answerdetail/:answerId",
        name: "AnswerDetail",
        component: AnswerDetail,
      },

      {
        path: "lingyan",
        name: "Lingyan",
        component: Lingyan,
      },
      {
        path: "community",
        name: "Community",
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
        path: "postdetail/:postId",
        name: "PostDetail",
        component: PostDetail,
      },
      {
        path: "me",
        name: "Me",
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
