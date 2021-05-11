<template>
    <Modal
        :show="show"
        :width="650"
        :height="250"
        @closed="$emit('closed')">
    >
        <div class="max-w-xl w-full bg-white shadow-lg z-50 rounded-lg overflow-hidden">
            <div class="p-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div class="bg-red-200 p-3 md:self-start rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-red-700" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>
                </div>
                <div>
                    <h1 class="text-xl font-semibold tracking-wide text-red-700">
                        {{ title }}
                    </h1>
                    <p class="text-gray-500">
                        {{ description }}
                    </p>
                </div>
            </div>

            <div class="p-3 bg-gray-50 text-right md:space-x-4 md:block flex flex-col-reverse">
                <button @click="$emit('closed')" class="px-4 md:py-1.5 py-2 bg-white border-2 rounded-lg focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-800 hover:bg-gray-50">
                    {{ cancelButtonName }}
                </button>
                <button @click="$emit('confirmDialogResult')" class="mb-2 md:mb-0 px-4 md:py-1.5 py-2 bg-red-700 text-white rounded-lg focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-red-800 hover:bg-red-800">
                    {{ confirmButtonName }}
                </button>
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal';
export default {
    props: {
        show: Boolean,
        title: {
            type: String,
            default: 'Emin misiniz ?'
        },
        description:{
            type: String,
            default: 'Kabul etmeniz halinde içerik geri alınamaz bir şekilde silinecektir.'
        },
        cancelButtonName:{
            type: String,
            default: 'İptal'
        },
        confirmButtonName: {
            type: String,
            default: 'Evet Sil!'
        }
    },
    components:{Modal},
    name: "Confirm"
}
</script>

<style scoped>

</style>
