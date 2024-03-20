<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    errors: Object,
    id: String,
    disabled: Boolean,
    image: String
})

const emit = defineEmits(['inputFile'])

const image = ref(null);

watch(() => props.image, (newImg) => {
    image.value = {
        ...image.value,
        url: props.image
    };
})

const inputFile = (e) => {
    const file = e.target.files[0];
    if(!file) {
        emit('inputFile', undefined);
        return
    }

    if(file.type.split("/")[0] == "image"){
        const url = URL.createObjectURL(file);
        image.value = {
            name: file.name,
            url
        }
    }
    emit('inputFile', file);
}   

const removeImage = () => {
    image.value = null
    emit('inputFile', undefined);
}

</script>


<template>
    <div class="flex flex-col items-center w-full mb-6">
        <div class="flex items-center justify-center w-1/2 mb-6">
            <label 
                for="dropzone-file" 
                class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                :class="{
                    'bg-gray-100 opacity-80 cursor-not-allowed': disabled,
                    'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500': errors[id]
            }   "
            >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Nhấn để tải ảnh</span> hoặc kéo thả ảnh vào</p>
                    <p class="text-xs text-gray-500 ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" multiple @change="inputFile" />
            </label>
        </div> 
        <div v-if="image" class="relative w-1/3 mb-6 rounded-lg overflow-hidden">
            
            <div 
                @click="removeImage"
                class="absolute top-0.5 right-2 hover:text-rose-600 text-lg cursor-pointer drop-shadow"
            >
                <i class="fa-solid fa-xmark"></i>
            </div>
            <img :src="image.url" class="w-full object-cover" />
        </div>
        <p v-if="errors[id]" class="mt-2 text-sm text-red-600">{{ errors[id] }}</p>
    </div>
</template>