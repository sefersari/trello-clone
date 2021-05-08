<template>
    <div>
        <button class="header-btn" @click="showBoards= !showBoards">Boards</button>
        <DropDownMenu :show="showBoards" @closed="showBoards = false">
            <div class="text-gray-600 text-xs font-semibold mb-2 ml-1">BOARDS</div>
            <router-link
                :to="{name:'board',params:{id:board.id}}"
                v-for="board in userBoards"
                :key="board.id"
                :class="[colorMap100[board.color]]"
                class="rounded-sm opacity-100 hover:opacity-75 text-gray-600 font-bold cursor-pointer flex mb-2"
                @click.native="showBoards = false"
            >

                <div :class="[colorMap200[board.color]]" class="w-10 rounded-sm rounded-r-none "></div>
                <div class="p-2"> {{ board.title }}</div>

            </router-link>
            <div class="rounded-sm hover:bg-gray-300 p-2 underline cursor-pointer mt-4" @click="showModal = true">Create new board...</div>

            <BoardAddModal :show="showModal" @closed="showModal = false"></BoardAddModal>

        </DropDownMenu>
    </div>
</template>

<script>
import DropDownMenu from "./DropDownMenu";
import {mapState} from 'vuex';
import UserBoards from '../graphql/UserBorads.graphql';
import {colorMap100, colorMap200} from '../utils';
import BoardAddModal from './BoardAddModal';

export default {
    name: "UserBoardDropdown",
    components: {DropDownMenu,BoardAddModal},
    apollo: {
        userBoards: {
            query: UserBoards,
            variables() {
                return {
                    userId: this.userId
                };
            },
            skip() {
                return !this.userId;
            }
        }
    },
    data() {
        return {
            showBoards: false,
            showModal:false
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.id,
        }),
        colorMap100: () => colorMap100,
        colorMap200: () => colorMap200
    }
}
</script>

<style scoped>

</style>
