<template>
    <transition name="appear">
        <div
            v-on-click-away="closed"
            v-if="show"
            class="dropdown-menu absolute bg-gray-100 rounded-sm mt-2 text-sm text-gray-600 shadow w-64 overflow-y-auto z-10 p-2">
            <slot></slot>
        </div>
    </transition>


</template>

<script>
import {directive as onClickAway} from 'vue-clickaway';
export default {
    name: "DropDownMenu",
    props:{
        show: Boolean
    },
    directives:{
        onClickAway
    },
    methods:{
        closed(){
            this.$emit('closed');
        }
    }
}
</script>

<style scoped>

.dropdown-menu{
    max-height: 75%;
}

</style>
