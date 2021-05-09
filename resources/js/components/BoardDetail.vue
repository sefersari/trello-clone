<template>
    <div>
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
                @list-deleted="updateQueryCache($event)"
            ></list>

            <ListAddEditor :board="board.id" @added="updateQueryCache($event)"></ListAddEditor>

        </div>
    </div>
</template>

<script>
import List from "./List";
import ListAddEditor from "./ListAddEditor";
import {
    EVENT_CARD_ADDED,
    EVENT_CARD_DELETED,
    EVENT_CARD_UPDATED,
    EVENT_LIST_ADDED,
    EVENT_LIST_DELETED
} from "../constants";
import {mapState} from 'vuex';
import boardQuery from "../graphql/BoardWithListAndCard.graphql";
export default {
name: "BoardDetail",
    components: {
        List,
        ListAddEditor
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
            },
            result(result){
                this.$store.commit('setBoardColor',result.data.board.color);
            }
        }
    },
    mounted() {
        this.$store.commit('setLoading', this.$apollo.queries.board.loading);

    },
    methods:{
        updateQueryCache(event) {
            const data = event.store.readQuery({
                query: boardQuery,
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

                case EVENT_LIST_ADDED:
                    data.board.lists.push(event.data);
                    break;

                case EVENT_LIST_DELETED:
                    data.board.lists = data.board.lists.filter(list => list.id != event.data.id);
                    break;

            }

            this.$store.commit('setLoading', false);
            event.store.writeQuery({query: boardQuery, data,variables: {id: Number(this.$route.params.id)}});
        },
    }
}
</script>

<style scoped>

</style>
