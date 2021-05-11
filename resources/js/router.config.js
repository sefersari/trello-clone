import Vue from "vue";
import VueRouter from "vue-router";

import Board from "./Board";
import Login from "./Login";
import Register from "./Register";
import Home from "./components/Home";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Board
    },
    {
        path: "/board/:id",
        name:"board",
        component: Board
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    },
    {
        path: "/register",
        name: 'register',
        component: Register
    },
];

export default new VueRouter({
    routes,mode: 'history'
});
