<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()

defineProps({
    placeholder: {
        type: String,
        default: "Tìm kiếm..."
    }
})

const key = ref(null)

const handleSearch = () => {
    key.value = key.value.trim();
    if(key.value.length > 0){
        const query = router.currentRoute.value.query;
        const keySearch = key.value;
        key.value = ""
        router.push({
            path: "/product",
            query: {
                ...query,
                key: keySearch
            }
        })
    }
}

</script>

<template>
    <div class="relative">
        <input @keyup.enter="handleSearch" v-model="key" id="search" class="outline-none transition-color focus:border-gray-600 pl-10 border border-[#d5d5d5] hover: rounded-full w-[388px] h-[38px] bg-[#f5f6fa]" :placeholder="placeholder" />
        <label for="search" @click="handleSearch" class="absolute transition-color hover:text-gray-700 text-gray-500 left-0 top-0 bottom-0 grid place-content-center rounded-l-full pl-4 pr-2 cursor-pointer">        
            <i class="fa-solid fa-search"></i>
        </label>
    </div>
</template>