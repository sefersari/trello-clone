<template>
    <div class="bg-gray-300 rounded-sm p-2 mr-2 list">
        <div class="flex justify-between">
            <div class="text-gray-800 pl-2 pb-2 font-bold">
                {{ list.title }}
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
    name: "List"
}
</script>

<style scoped>
.list {
    width: 250px;
    min-width: 250px;
}
</style>
