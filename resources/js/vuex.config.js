import Vue from "vue";
import Vuex from 'vuex';
import apollo from './apollo.config';
import MeQuery from './graphql/Me.graphql';
import Router from './router.config';

Vue.use(Vuex);



const store = {
    state:{
        isLoggedIn: false,
        isLoading: false,
        boardColor: 'fix',
        user:{
            id: null,
            name: null,
            email:null
        }
    },
    mutations:{
        setLoggedIn(state, payload){
            state.isLoggedIn = Boolean(payload);
        },
        setLoading(state, payload){
            state.isLoading = Boolean(payload);
        },
        setBoardColor(state, payload){
            state.boardColor = payload;
        },
        setUser(state,payload){
            state.user = payload;
        }
    },
    actions:{
        setLoggedIn({commit}, payload){
            const isLoggedIn = Boolean(payload);
            localStorage.setItem("isLoggedIn",isLoggedIn);
            commit("setLoggedIn",isLoggedIn);
        },
        async logout({commit,dispatch}){
            commit('setUser',{
                id: null,
                name: null,
                email:null
            });
            dispatch('setLoggedIn',false);
        },
        async fetchCurrentUser({commit,dispatch}){
            commit('setLoading',true);
            const result =  await apollo.defaultClient.query({
                query: MeQuery,
                fetchPolicy: "no-cache"
            });

            const user = result.data?.me;

            if(user){
                commit('setUser',user);
                dispatch('setLoggedIn',true);
            }else{
                dispatch('logout');
                Router.push({name: 'login'});
            }

            commit('setLoading',false);

        }
    }
};

export default new Vuex.Store(store);
