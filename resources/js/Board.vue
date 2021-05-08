<template>
    <div class="h-full flex flex-col items-stretch " :class="bgColor">
        <Loading></Loading>

        <div class="header text-white flex justify-between items-center mb-2">
            <div class="ml-2 w-1/3">

                <UserBoardsDropdown v-if="isLoggedIn"></UserBoardsDropdown>
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
            <div class="mx-4 mb-2 text-white font-bold text-lg">
                <span v-if="$apollo.queries.board.loading">Loading..</span>
                <span v-else>{{ board.title }} </span>
            </div>
            <div class="flex flex-1 items-start overflow-x-auto mx-2" v-if="board">

                <list
                    :list="list"
                    v-for="list in board.lists"
                    :key="list.id"
                    @card-added="updateQueryCache($event)"
                    @card-delete="updateQueryCache($event)"
                    @card-updated="updateQueryCache($event)"
                ></list>

            </div>
        </div>
    </div>
</template>

<script>
import List from "./components/List";
import UserBoardsDropdown from "./components/UserBoardDropdown";
import boardQuery from './graphql/BoardWithListAndCard.graphql';
import BoardQuery from './graphql/BoardWithListAndCard.graphql';
import Logout from './graphql/Logout.graphql';
import {EVENT_CARD_ADDED, EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "./constants";
import Loading from "./components/Loading";
import {mapState} from 'vuex';
import {colorMap500} from "./utils";
export default {
    components: {
        List,
        Loading,
        UserBoardsDropdown
    },
    computed: {
        bgColor(){
            return {
                "bg-gray-500": this.$apollo.loading,
                [colorMap500[this.board?.color]]: true,
            }
        },
        ...mapState({
            isLoggedIn: 'isLoggedIn',
            name: state => state.user.name,
            userId: state => state.user.id,
        })
    },
    data() {
        return {
            loading: true,
        }
    },
    apollo: {
        board: {
            query: boardQuery,
            watchLoading(loading){
                this.$store.commit('setLoading', loading);
            },
            variables() {
                return {
                    id: Number(this.$route.params.id)
                };
            }
        }
    },
    mounted() {
        this.$store.commit('setLoading', this.$apollo.queries.board.loading);
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
        updateQueryCache(event) {
            const data = event.store.readQuery({
                query: BoardQuery,
                variables: {id: Number(this.$route.params.id)}
            });

            const listById = () => data.board.lists
                .find(list => Number(list.id) === Number(event.listId));

            switch (event.type) {
                case EVENT_CARD_ADDED:

                    listById()
                        .cards.push(event.data);

                    break;

                case EVENT_CARD_DELETED:

                    listById().cards = listById()
                        .cards
                        .filter(card => card.id != event.data.id);

                    break;

                case EVENT_CARD_UPDATED:

                    listById().cards.filter(card => card.id == event.data.id).title = event.data.title;

                    break;

            }

            this.$store.commit('setLoading', false);
            event.store.writeQuery({query: BoardQuery, data,variables: {id: Number(this.$route.params.id)}});
        },
        loadingUpdate() {
            this.loading = !this.loading;
        }
    }
}
</script>

<style scoped>

.header {
    height: 40px;
    background-color: rgba(0,0,0,0.2);
}

</style>
