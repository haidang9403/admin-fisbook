<script setup>
import SideBarItem from '@/components/SideBarItem.vue';
import { watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const sidebarContent = ref([
    {
        icon: "fa-solid fa-house",
        content: "Trang chủ",
        path: "/",
        current: false,
    },
    {
        icon: "fa-solid fa-table-cells-large",
        content: "Sản phẩm",
        path: "/product",
        current: false,
    },
    {
        icon: "fa-solid fa-list-check",
        content: "Đơn mượn",
        path: "/borrowing",
        current: false
    },
    {
        icon: "fa-solid fa-user",
        content: "Người dùng",
        path: "/user",
        current: false
    },
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


const handleSideBarClick = () => {
    sidebarContent.value.forEach((item) => {
        item.current = simplifyPath(route.path) === item.path
    })
}

watch(() => route.path, (newValue, oldValue) => {
  sidebarContent.value.forEach((item) => {
    item.current = item.path === simplifyPath(newValue);
  });
});

onMounted(() => {
  sidebarContent.value.forEach((item) => {
    item.current = item.path === simplifyPath(route.path);
  });
});
</script>

<template >
    <div class=" min-h-screen flex flex-col">
        <div class="h-[70px] grid place-items-center font-extrabold text-lg">
            LOGO HERE
        </div>
        <div class="grow flex flex-col items-center border-r border-[e0e0e0] h-fit">
            <SideBarItem 
                v-for="(item,index) in sidebarContent" 
                :key="index" 
                :item="item"
                @click="handleSideBarClick()"
            />
        </div>
    </div>
</template>

<style>
    
</style>