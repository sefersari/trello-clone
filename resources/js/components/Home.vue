<template>
    <div class="flex flex-wrap mb-2 mx-auto w-3/5" v-if="!$apollo.queries.userBoards.loading">

            <div v-if="existBoard"> Sefer </div>

            <router-link v-else v-for="board in userBoards" :key="board.id" class="w-full md:w-1/2 xl:w-1/4 pt-3 px-3 md:pr-2" :to="{name:'board',params:{id:board.id}}">
                <div :class="colors[board.color]" class="rounded-md shadow p-8 relative ">
                    <div class="flex flex-row items-center">
                        <div class="flex-shrink pl-1 pr-4"><i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                        <div class="flex-1">
                            <h5 class="text-white">{{board.title}}</h5>
                        </div>
                    </div>
                </div>
            </router-link>
    </div>
</template>

<script>
import UserBoards from '../graphql/UserBorads.graphql';
import {colorMap500} from '../utils';
import {mapState} from "vuex";
export default {
    name: "Home",
    data(){
        return{
            existBoard: true,
        }
    },
    apollo: {
        userBoards: {
            query: UserBoards,
            watchLoading(loading){
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
            result(result){
                console.log(result.data.userBoards.length);
              this.existBoard = result.data.userBoards.length < 1;
                this.$store.commit('setLoading', false);
            },
        }
    },
    created() {
        this.$store.commit('setBoardColor','fix');
    },
    computed: {
        ...mapState({
            userId: state => state.user.id,
        }),
        colors: () => colorMap500,
    }
}
</script>

<style scoped>

</style>
