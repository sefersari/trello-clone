<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold">
                {{ list.title }}
            </div>

            <div @click="deleteList(list.id)">
                <v-icon class="cursor-pointer" name="x" style="height: 20px"></v-icon>
            </div>


        </div>
        <card
            v-for="card in list.cards" :card="card"
            :key="card.id"
            @deleted="$emit('card-delete',{...$event, listId: list.id})"
            @updated="$emit('card-updated',{...$event, listId: list.id})"
        ></card>

        <CardAddEditor
            v-if="editing"
            @closed="editing = false"
            :list="list"
            @added="$emit('card-added',{...$event, listId: list.id})"
        ></CardAddEditor>
        <card-add-button  v-if="!editing && canAddCard" @click="editing=true"></card-add-button>
    </div>
</template>

<script>
import Card from "./Card";
import CardAddButton from "./CardAddButton";
import CardAddEditor from "./CardAddEditor";
import {mapState} from 'vuex';
import ListDelete from '../graphql/ListDelete.graphql';
import {EVENT_LIST_DELETED} from "../constants";

export default {
    components: {
        Card,
        CardAddButton,
        CardAddEditor
    },
    computed: mapState({
        canAddCard(state){
            return this.list.board.owner.id === state.user.id
        }
    }),
    props: {
        list: Object
    },
    data() {
        return {
            editing: false
        }
    },
    methods:{
        deleteList(listId){
            const self = this;
            this.$store.commit('setLoading',true);
            this.$apollo.mutate({
                mutation: ListDelete,
                variables:{
                    id: listId
                },
                update(store, {data:{ listDelete }}){
                    self.$emit('list-deleted',{store,data:listDelete,type: EVENT_LIST_DELETED});
                }
            });
        }
    },
    name: "List"
}
</script>

<style scoped>
.list {
    width: 250px;
    min-width: 250px;
}
</style>
