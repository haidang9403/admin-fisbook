<script setup>
import { initDropdowns } from 'flowbite';
import { onMounted, ref, computed, watch } from 'vue';
import Button from '../buttons/Button.vue';

const model = defineModel();

const dropdownRef = ref(null);

const props = defineProps({
    label: String,
    id: String,
    data: Array,
    filter: String,
})

const checkedItems = ref({});
const filterItems = ref([]);
const labelFilter = computed(() =>{
    const labels = [];
    props.data.forEach((e) => {
        if (filterItems.value.includes(e._id)) {
            labels.push(e.label)
        }
    })

    return labels.join(", ")
})

watch(() => model.value, () =>{
    if(Object.keys(model.value).length === 0) {
        checkedItems.value = {}
        filterItems.value = []
    }
})

const handleChecked = () => {
    filterItems.value = Object.keys(checkedItems.value).filter( key => checkedItems.value[key])
    model.value[props.filter] = filterItems.value;
}

const exitModal = () => {
    dropdownRef.value.classList.add('hidden')
}


onMounted(() => {
    initDropdowns();
})

</script>

<template>
    <button :id="id" :data-dropdown-toggle="id + '-content'"
        class="p-4 border-r border-gray-200 text-sm font-bold flex justify-between items-center hover:bg-gray-100 w-[150px]">
        <span class="pr-4 truncate w-full"> {{ filterItems.length !== 0 ? labelFilter : label }}</span>
        <i class="fa-solid fa-sort-down h-full"></i>
    </button>
    <div ref="dropdownRef" :id="id + '-content'"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
        <div class="w-full p-4">
            <h3 class="mb-5 text-lg font-bold text-gray-900 dark:text-white">Chọn {{ label.toLowerCase() }}</h3>
            <ul class="flex w-[500px] max-h-[250px] gap-4 flex-wrap mb-2 overflow-y-auto">
                <li v-for="(item, index) in data" :key="index">
                    <input type="checkbox" :id="item._id" v-model="checkedItems[item._id]"
                        @change="handleChecked(item._id)" class="hidden peer">
                    <label :for="item._id" class="
                            inline-flex 
                            items-center 
                            justify-center
                            w-full 
                            p-2 
                            text-gray-600 
                            text-xs
                            font-medium 
                            bg-white 
                            border-2 
                            border-gray-200 
                            rounded-lg 
                            cursor-pointer   
                            peer-checked:border-blue-600  
                            hover:text-gray-800
                            peer-checked:text-gray-800 
                            hover:bg-gray-50
                            select-none
                        ">
                        <div class="block">
                            {{ item.label }}
                        </div>
                    </label>
                </li>
            </ul>
            <div class="w-full flex justify-end">
                <Button @on-click="exitModal">
                    Xong
                </Button>
            </div>
        </div>
    </div>
</template>