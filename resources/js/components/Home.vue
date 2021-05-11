<template>
    <div class="flex flex-wrap mb-2 mx-auto w-3/5" v-if="!$apollo.queries.userBoards.loading">

        <div v-if="existBoard">
            <div class="rounded-sm hover:bg-gray-100 p-3 bg-gray-400 cursor-pointer mt-4 flex text-gray-700 bold" @click="showModal = true"><v-icon class="cursor-pointer bg mt-1" name="plus"></v-icon>Create new board</div>
        </div>

        <router-link v-else v-for="board in userBoards" :key="board.id"
                     class="w-full md:w-1/2 xl:w-1/4 pt-3 px-5 md:pr-2 mb-3" :to="routeControl(board)">
            <div :class="colors[board.color]" class="rounded-sm shadow-3xl hover:bg-purple-900 p-10 relative ">
                <div class="flex flex-row items-center">
                    <div class="flex-shrink pl-1 pr-4"><i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                    <div class="flex-1">
                        <h5 class="text-white">{{board.title}}</h5>
                    </div>
                </div>
                <button type="button"
                        :class="colors[board.color]"
                        @click="alertfy"
                        class="absolute  top-0 right-0 -mt-3 -mr-3 rounded-md inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span class="sr-only">Close menu</span>
                    <!-- Heroicon name: outline/x -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <Confirm :show="isDelete" @closed="isDelete = false" @confirmDialogResult="deleteBoard(board.id)" :title="'Silmek istediğinize emin misiniz?'"></Confirm>
        </router-link>

        <BoardAddModal :show="showModal" @closed="showModal = false"></BoardAddModal>

    </div>
</template>

<script>
import UserBoards from '../graphql/UserBorads.graphql';
import DeleteBoard from '../graphql/BoardDelete.graphql';
import {colorMap500} from '../utils';
import {mapState} from "vuex";
import Confirm from "./Confirm";
import BoardAddModal from './BoardAddModal';

export default {
    name: "Home",
    data() {
        return {
            existBoard: true,
            route: true,
            isDelete: false,
            showModal: false
        }
    },
    apollo: {
        userBoards: {
            query: UserBoards,
            watchLoading(loading) {
                this.$store.commit('setLoading', loading);
            },
            variables() {
                return {
                    userId: this.userId
                };
            },
            skip() {
                return !this.userId;
            },
            result(result) {
                this.existBoard = result.data.userBoards.length < 1;
                this.$store.commit('setLoading', false);
            },
        }
    },
    created() {
        this.$store.commit('setBoardColor', 'fix');
    },
    computed: {
        ...mapState({
            userId: state => state.user.id,
        }),
        colors: () => colorMap500,
    },
    methods: {
        alertfy() {
            this.route = false;
            this.isDelete = true;
        },
        routeControl(board){
            if(this.route){
                return {name: 'board',params:{'id':board.id}}
            }else{
                return {name: 'home'}
            }
        },
        deleteBoard(boardId){
            const self = this;
            this.$store.commit('setLoading',true);
            this.$apollo.mutate({
                mutation: DeleteBoard,
                variables:{
                    id: boardId
                },
                update(store, {data:{ boardDelete }}){
                    const data = store.readQuery({
                        query: UserBoards,
                        variables: {userId: self.userId}
                    });
                    self.isDelete = false;
                    data.userBoards = data.userBoards.filter(board => board.id !== boardDelete.id);

                    self.$store.commit('setLoading', false);
                    store.writeQuery({query: UserBoards, data,variables: {userId: self.userId}});
                    self.route = true;
                }
            });
        }
    },
    components:{Confirm,BoardAddModal}
}
</script>

<style scoped>

</style>
