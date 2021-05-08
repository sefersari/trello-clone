<template>
    <div class="h-full flex flex-col items-stretch" :class="colors[$store.state.boardColor]">
        <Loading></Loading>

        <div class="header text-white flex justify-between items-center mb-2">
            <div class="ml-2 w-1/3">
                <div class="flex">
                    <button class="header-btn mr-2 w-25" @click="$router.push({name: 'home'})">Home</button>
                    <UserBoardsDropdown v-if="isLoggedIn"></UserBoardsDropdown>
                </div>
            </div>
            <div class="text-lg opacity-50 cursor-pointer hover:opacity-75">Trello Clone</div>
            <div class="mr-4 w-1/3 flex justify-end">
                <div v-if="isLoggedIn" class="flex items-center">
                    <div class="text-sm mr-2">{{ name }}</div>
                    <button class="header-btn" @click="logout">Logout</button>
                </div>
                <div v-else>
                    <button class="header-btn" @click="$router.push({name: 'login'})">Signin</button>
                    <button class="header-btn" @click="$router.push({name: 'register'})">Register</button>
                </div>
            </div>
        </div>

        <div class="h-full flex flex-1 flex-col items-stretch">
            <Home v-if="$route.name === 'home'"></Home>
            <BoardDetail v-else ></BoardDetail>
        </div>
    </div>
</template>

<script>
import UserBoardsDropdown from "./components/UserBoardDropdown";
import Logout from './graphql/Logout.graphql';
import Loading from "./components/Loading";
import {mapState} from 'vuex';
import {colorMap500} from "./utils";
import BoardDetail from "./components/BoardDetail";
import Home from "./components/Home";
export default {
    components: {
        Loading,
        UserBoardsDropdown,
        BoardDetail,
        Home,
    },
    computed: {
        colors: () => colorMap500,
        ...mapState({
            isLoggedIn: 'isLoggedIn',
            name: state => state.user.name,
            userId: state => state.user.id,
        })
    },
    methods: {
        async logout() {
            this.$store.commit('setLoading', true);
            const response = await this.$apollo.mutate({
                mutation: Logout
            });
            if (response.data?.logout?.id) {
                this.$store.dispatch('logout');
                this.$store.commit('setLoading', false);
                this.$router.push({name: 'login'});
            }
        },
    }
}
</script>

<style scoped>

.header {
    height: 40px;
    background-color: rgba(0,0,0,0.2);
}

</style>
