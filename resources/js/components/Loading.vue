<template>
    <vue-element-loading :active="isLoading" :is-full-screen="true" spinner="spinner" text="Lütfen Bekleyiniz..." :textStyle="style" size="50" color="#805ad5"/>
</template>

<script>

import ClipLoader from 'vue-spinner/src/ClipLoader';
import VueElementLoading from 'vue-element-loading'

export default {
    name: "Loading",
    data(){
        return{
          style:{
              marginLeft:'-35px'
          }
        }
    },
    components: {
        ClipLoader,
        VueElementLoading
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        }
    }
}
</script>

<style scoped>
</style>
