<template>
    <CardEditor label="Card Add" v-model="title" @closed="closed" @saved="addCard"></CardEditor>
</template>

<script>
import CardAdd from "../graphql/CardAdd.graphql";
import CardEditor from "./CardEditor";
import {mapState} from 'vuex';

import {EVENT_CARD_ADDED} from "../constants";

export default {
    props: {
        list: Object
    },
    components: {
        CardEditor
    },
    data() {
        return {
            title: null
        }
    },
    computed: mapState({
        userId: state => state.user.id,
    }),
    methods: {
        addCard() {
            const self = this;
            this.$emit("click");
            this.$store.commit('setLoading',true);
            this.$apollo.mutate({
                mutation: CardAdd,
                variables: {
                    title: this.title,
                    listId: this.list.id,
                    order: this.list.cards.length + 1,
                    ownerId: this.userId
                },
                update(store, {data: {cardAdd}}) {

                    self.$emit('added', {
                        store,
                        data: cardAdd,
                        type: EVENT_CARD_ADDED
                    });

                    self.closed();
                },
            });
        },
        closed() {
            this.$emit('closed');
        },
    }
}
</script>

<style scoped>

</style>
