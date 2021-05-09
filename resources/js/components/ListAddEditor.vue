<template>
    <div>
        <div
            @click="startEditing" v-if="!editing"
            class="bg-white hover:bg-gray-500 rounded-sm p-2 mr-2 opacity-75 cursor-pointer list">
            +&nbsp;Add another list
        </div>

        <div v-else class="bg-gray-300 rounded-sm p-2 list" v-on-click-away="hideEditor">
            <input type="text" ref="title"
                   class="rounded-sm border-blue-500 border-2 py-1 px-2 outline-none w-full text-gray-600 text-sm"
                    placeholder="Enter list title..."
                   @keyup.esc="hideEditor"
                   v-model="title"
                   @keypress.enter="addList"
            >

            <div class="flex ">
                <button
                    @click="addList"
                    class="mt-2 rounded-sm py-1 px-3 bg-blue-700 text-white cursor-pointer hover:bg-blue-500 outline-none">
                    Add List
                </button>

                <div @click="hideEditor" class="mt-2 ml-1 px-3 rounded-md hover:bg-gray-400 cursor-pointer text-gray-500 flex items-center justify-center">
                    <div>🗙</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {directive as onClickAway} from 'vue-clickaway';
import ListAddMutation from './../graphql/ListAdd.graphql';
import {EVENT_LIST_ADDED} from '../constants.js';
export default {
    props:['board'],
    name: "ListAddEditor",
    data() {
        return {
            editing: false,
            title: null
        }
    },
    directives:{
        onClickAway
    },
    methods: {
        hideEditor() {
            this.editing = false;
            this.title = null;
        },
        startEditing() {
            this.editing = true;
            this.$nextTick(() => this.$refs.title.focus());
        },
        addList(){
            this.$store.commit('setLoading', true);
            const self = this;
            this.$apollo.mutate({
                mutation: ListAddMutation,
                variables:{
                    title: this.title,
                    board: this.board
                },
                update(store, {data: { listAdd }}){
                    self.$emit('added',{store,data:listAdd,type: EVENT_LIST_ADDED});
                    self.hideEditor();
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
