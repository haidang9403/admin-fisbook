<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    data: Array
})
</script>

<template>
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
        <ul class="flex flex-wrap -mb-px">
            <li v-for="(item, index) in data" :key="index" class="me-2">
                <router-link  
                    v-if="item.active"
                    :to="item.path"
                    class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active " aria-current="page">{{ item.label }}</router-link>
                <router-link
                    v-else
                    :to="item.path"
                    class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">{{ item.label }}</router-link>
            </li>
        </ul>
    </div>
</template>