<template>
    <div>
        <Modal
            :width="400"
            :height="250"
            :show="show"
            @closed="$emit('closed')">

            <div class="flex">
                <div class="rounded-sm p-4 text-black w-full mr-2" :class="[colors[color]]">
                    <input
                        v-model="title"
                        type="text" placeholder="Add board title"
                        class="title rounded-sm text-white outline-none py-1 px-2 w-full hover:opacity-50 placeholder-white">
                </div>

                <div>
                    <div class="flex justify-between mb-2" v-for="(row,i) in colorGrid" :key="i">
                        <BoardColor v-for="(c,i) in row" :key="i" :color="c" :active-color="color"
                                    @changed="color = $event"></BoardColor>
                    </div>
                </div>

            </div>


            <div class="mt-4">
                <button
                    class="rounded-sm py-2 px-4 text-white hover:opacity-75 cursor-pointer hover:text-white disabled:opacity-25"
                    :class="[colors[color]]"
                    :disabled="cannotCreate"
                    @click="addBoard"
                > Create
                </button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from './Modal';
import BoardColor from "./BoardColor";
import {colorGrid, colorMap500} from "../utils";
import UserBoards from "./../graphql/UserBorads.graphql";
import BoardAddMutation from "./../graphql/BoardCreate.graphql";
import {mapState} from 'vuex';

export default {
    props: {
        show: Boolean
    },
    data() {
        return {
            color: 'orange',
            title: null
        }
    },
    name: "BoardAddModal",
    components: {Modal, BoardColor},
    methods: {
        addBoard() {
            const self = this;
            this.$apollo.mutate({
                mutation: BoardAddMutation,
                variables: {
                    title: this.title,
                    color: this.color
                },
                update(store, {data: {boardAdd}}) {
                    const data = store.readQuery({
                        query: UserBoards,
                        variables: {
                            userId: self.userId,
                        }
                    });

                    data.userBoards.push(boardAdd);
                    store.writeQuery({
                        query: UserBoards,
                        data,
                        variables: {
                            userId: self.userId
                        }
                    });
                    self.$emit('closed');
                }
            });
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user.id,
        }),
        colors: () => colorMap500,
        colorGrid: () => colorGrid,
        cannotCreate() {
            return this.title == null || this.title.length == 0;
        }
    },

}
</script>

<style scoped>
.title {
    background-color: hsla(0, 0%, 100%, 0);
}

.title:hover, .title:focus {
    background-color: hsla(0, 0%, 100%, 0.2);
}

</style>
