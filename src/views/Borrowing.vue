<script setup>
import Tabs from '@/components/Tabs.vue';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = computed( () => {

    return [
        {
            path: "/borrowing",
            label: "Tất cả",
            active: route.path === "/borrowing"
        },
        {
            path: "/borrowing/waiting",
            label: "Chờ duyệt",
            active: route.path === "/borrowing/waiting"
        },
        {
            path: "/borrowing/approved",
            label: "Đã duyệt",
            active: route.path === "/borrowing/approved" 
        },
        {
            path: "/borrowing/returned",
            label: "Đã trả",
            active: route.path === "/borrowing/returned",
        },
        {
            path: "/borrowing/refused",
            label: "Đã hủy",
            active: route.path === "/borrowing/refused",
        }
    ]
})

onMounted(() => {
    document.title = "Đơn mượn"
})
</script>

<template>
    <h2 class="text-2xl text-[#202224] font-bold">Đơn mượn</h2>
    <Tabs
        :data="tabs"
    />
    <router-view></router-view>
</template>