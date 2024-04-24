<script setup>
import SideBarItem from '@/components/SideBarItem.vue';
import { watch, ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const sidebarContent = computed( () => [
    {
        icon: "fa-solid fa-house",
        content: "Trang chủ",
        path: "/",
        current: simplifyPath(route.path) === "/",
    },
    {
        icon: "fa-solid fa-table-cells-large",
        content: "Sách",
        path: "/product",
        current: simplifyPath(route.path) === "/product",
    },
    {
        icon: "fa-solid fa-list-check",
        content: "Đơn mượn",
        path: "/borrowing",
        current: simplifyPath(route.path) === "/borrowing"
    },
    {
        icon: "fa-solid fa-user",
        content: "Khách hàng",
        path: "/user",
        current: simplifyPath(route.path) === "/user"
    },
    {
        icon: "fa-solid fa-user-tie",
        content: "Thành viên",
        path: "/admin",
        current: simplifyPath(route.path) === "/admin",
        divide: true
    }
]) 

function simplifyPath(path) {
    if (path === '' || path === '/') {
        return '/';
    }
    // Tách chuỗi đường dẫn thành mảng các phần tử
    const parts = path.split('/');

    // Lọc ra các phần tử không trống
    const filteredParts = parts.filter(part => part !== '');

    // Ghép các phần tử lại với nhau, bắt đầu từ dấu '/'
    const simplifiedPath = '/' + filteredParts[0];

    return simplifiedPath;
}
</script>

<template >
    <div class=" h-screen flex flex-col">
        <router-link to="/" class="h-[70px] grid place-items-center font-extrabold text-lg">
            <h2 class="text-3xl font-extraboldbold text-center flex gap-0 items-end">
                Fisb
                <i class="fa-solid fa-fish" style="color: #74C0FC;"></i>
                k
            </h2>
        </router-link>
        <div class="grow flex flex-col items-center border-r border-[e0e0e0] h-full">
            <SideBarItem 
                v-for="(item,index) in sidebarContent" 
                :key="index" 
                :item="item"
            />
        </div>
    </div>
</template>

<style>
    
</style>