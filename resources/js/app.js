import './bootstrap';
import Vue from 'vue';
import Board from "./Board";
import apolloProvider from './apollo.config';
import router from './router.config';
import store from './vuex.config';
import feather from 'vue-icon';
import Sortable from 'vue-sortable'

Vue.use(Sortable);

//Optional component
import Notifications from 'vue-notification'

window.Vue = Vue;

Vue.use(Notifications);
Vue.use(feather,'v-icon');

Vue.component('Board', Board);


const app = new Vue({
    el: '#app',
    apolloProvider,
    router,
    store,
    async beforeCreate() {
        await store.dispatch('fetchCurrentUser');
        store.dispatch('setLoggedIn', localStorage.getItem('isLoggedIn') === 'true' || false);
        if(localStorage.getItem('isLoggedIn') !== 'true' && router.currentRoute.name !== 'login'){
            router.push({name:'login'});
        }
    },
});
