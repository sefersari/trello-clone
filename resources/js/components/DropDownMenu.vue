<template>
    <transition name="appear">
        <div v-if="show" class="dropdown-menu absolute bg-gray-200 rounded-sm mt-2 text-sm text-gray-600 shadow w-64 overflow-y-auto z-10 p-2">
            <slot></slot>
        </div>
    </transition>


</template>

<script>
export default {
    name: "DropDownMenu",
    props:{
        show: Boolean
    }
}
</script>

<style scoped>

.dropdown-menu{
    max-height: 75%;
}

</style>
