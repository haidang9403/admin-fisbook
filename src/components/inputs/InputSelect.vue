<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import Fuse from 'fuse.js';
import { initDropdowns } from 'flowbite';

const props = defineProps({
    data: {
        type: Array,
        default(){
            return []
        }
    },
    errors:{
        type: Object,
        default(){
            return {}
        }
    },
    id: String,
    nameAction: {
        type: String,
        default: "Thêm giá trị"
    },
    label: String,
    placeholder: {
        type: String,
        default: "Chọn giá trị"
    },
})

const emit = defineEmits(['getData', 'onAdd', 'inFocus']);

const defaultVal = ref(props.placeholder);
const value = ref(null);
const inputAdd = ref(null);
const key = ref(null);
const buttonMenu = ref(null)

const fuseOptions = {
    // Mảng các thuộc tính bạn muốn tìm kiếm
    keys: ['value'],
    // Ngưỡng mờ (từ 0 đến 1, giá trị thấp hơn mang lại kết quả chính xác hơn)
    threshold: 0.2,
};


const dataFilter = computed(() => {
    const fuse = new Fuse(props.data || [], fuseOptions);
    if (!key.value) {
        return props.data;
    }

    const searchResults = fuse.search(key.value);

    return searchResults.map(result => result.item);
})

const handleDropdown = (item) => {
    value.value = item.value
    emit('getData', item._id)
}

const handleClick = ()=>{
    buttonMenu.value.click()
}

const handleAdd = () => {
    emit('onAdd', inputAdd.value)
    inputAdd.value = ""
}

watch(() => props.placeholder, (newVal) => {
    defaultVal.value = newVal
})

onMounted(() => {
    initDropdowns();
})

</script>

<template>
    <div class="mb-6 relative">
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
        <button :id="id" ref="buttonMenu" @click="emit('inFocus')" :data-dropdown-toggle="'dropdownSearch' + id" data-dropdown-placement="bottom"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 items-center justify-between flex "
            type="button">
            {{ value ? value : defaultVal }}
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
            </svg>
        </button>
        <p v-if="errors[id]" class="mt-2 text-sm text-red-600 absolute top-full">{{ errors[id] }}</p>
        <!-- Dropdown menu -->
        <div :id="'dropdownSearch' + id" class="z-10 hidden bg-white rounded-lg shadow w-60">
            <div class="p-3">
                <label for="input-group-search" class="sr-only">Tìm kiếm</label>
                <div class="relative">
                    <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="input-group-search" v-model="key"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Tìm kiếm">
                </div>
            </div>
            <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 " aria-labelledby="dropdownSearchButton">
                <li v-for="(item, index) in dataFilter" :key="index" :id="item._id" @click="() => { handleDropdown(item); handleClick()}">
                    <div class="flex items-center ps-2 rounded hover:bg-gray-100 ">
                        <p
                            class="cursor-pointer w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded">
                            {{ (index+1+'. ') + item.value }}
                        </p>
                    </div>
                </li>
            </ul>
            <div class="relative w-full">
                <input
                    v-model="inputAdd"
                    @keyup.enter="handleAdd"
                    type="text"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    :placeholder="nameAction" 
                />
                <div
                    @click="handleAdd"
                    class="absolute cursor-pointer top-1 end-1 bottom-1 p-2 grid place-items-center text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    <i class="fa-solid fa-plus"></i>
                    <span class="sr-only">Add</span>
                </div>
            </div>
        </div>
    </div>
</template>