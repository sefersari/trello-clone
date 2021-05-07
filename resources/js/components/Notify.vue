<template>
    <notifications style="margin-top: 10px;" position="top center"/>
</template>

<script>
export default {
    name: "Notify",
    mounted(){
        this.$notify({
            title: 'Important message',
            text: 'Hello user!'
        });
    }
}
</script>

<style scoped>

</style>
