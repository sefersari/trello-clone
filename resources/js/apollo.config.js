import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from 'apollo-link-http';
import {AuthError,gqlErrors} from "./utils";

import store from './vuex.config';

const httpLink = new HttpLink({
    uri: 'http://meselok.hu/graphql'
})

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
    link: httpLink,
    headers:{
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Request-Headers': 'content-type'
    },
    credentials: 'include',
    onError: (error => {
        try{
            gqlErrors(error);
        }catch(error){
            if(error instanceof AuthError){
                store.dispatch("logout");
            }
        }
        store.commit('setLoading', false);
    }),
    cache: new InMemoryCache(),
});

export default new VueApollo({
    defaultClient: apolloClient
});
