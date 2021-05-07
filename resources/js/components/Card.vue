<template>
    <div>
        <div v-if="!editing"
             class="bg-white group card shadow-card rounded-sm p-2 cursor-pointer text-sm hover:bg-gray-200 hover:text-gray-600 mb-2 flex justify-between">
            <div>{{ card.title }}</div>
            <div class="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity ease-out duration-500" v-if="card.owner.id === userId">
                <div class="text-gray-500 pr-2 hover:text-yellow-700" @click="editing = true" >E</div>
                <div class="text-gray-500 hover:text-red-700" @click="cardDelete">D</div>
            </div>

        </div>

        <CardEditor v-else v-model="title" class="mb-2" label="Save Card" @closed="editing=false"
                    @saved="cardUpdate"></CardEditor>
    </div>
</template>

<script>
import cardDelete from '../graphql/CardDelete.graphql';
import CardUpdate from '../graphql/CardUpdate.graphql'

import {EVENT_CARD_DELETED, EVENT_CARD_UPDATED} from "../constants";
import CardEditor from "./CardEditor";

import {mapState} from 'vuex';

export default {
    name: "Card",
    props: {
        card: Object
    },
    data() {
        return {
            editing: false,
            title: this.card.title
        }
    },
    components: {CardEditor},
    computed: mapState({
        userId: state => state.user.id,
    }),
    methods: {
        async cardDelete() {
            this.$store.commit('setLoading', true);
            const self = this;
            try{
                await this.$apollo.mutate({
                    mutation: cardDelete,
                    variables: {
                        id: this.card.id
                    },
                    update(store, {data: {cardDelete}}) {

                        self.$emit('deleted', {
                            store,
                            data: cardDelete,
                            type: EVENT_CARD_DELETED
                        });
                    }
                });
            }catch (error){

            }
        },
        async cardUpdate() {
            this.$store.commit('setLoading', true);

            const self = this;

            try{
                await this.$apollo.mutate({
                    mutation: CardUpdate,
                    variables: {
                        id: this.card.id,
                        title: this.title
                    },
                    awaitRefetchQueries: true,
                    update(store, {data: CardUpdate}) {
                        self.$emit('updated', {
                            store,
                            data: CardUpdate,
                            type: EVENT_CARD_UPDATED
                        });

                        self.editing = false;
                    },
                });
            }catch (error){}

        }

    }
}
</script>

