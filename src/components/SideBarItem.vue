<template>
    <div v-if="item.divide" class="w-full px-12">
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
    </div>
    <router-link :to="item.path" :class="{'active': item.current} "
        class="flex items-center h-12 w-[192px] font-bold bg-white rounded pl-4 gap-4">
        <i :class="item.icon"></i>
        {{ item.content }}
    </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    item: Object,
})

</script>

<style scoped>
    .active{
        background-color: #4880ff;
        color: white;
    }
</style>