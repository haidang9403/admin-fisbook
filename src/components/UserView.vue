<script setup>
import CardUser from './CardUser.vue';
import Pagination from './Pagination.vue';
import userService from '@/services/user.service';


// Composables
import { usePagination } from '@/composables';
import { useRouter } from 'vue-router';
import { onMounted, ref, watchEffect } from 'vue';

const router = useRouter();
const totalProduct = ref([]);
const paginationData = ref({});


watchEffect(() => {
    paginationData.value = usePagination({
        data: totalProduct.value,
        perPage: 20,
        router
    });
});

const fetchData = async () => {
    try {
        const data = await userService.getAll();
        data.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA; // Sắp xếp từ mới đến cũ
        });
        totalProduct.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
    document.title = "Khách hàng"
});

</script>

<template>
    <div v-if="totalProduct.length == 0" role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>
    </div>
    <div class="grid grid-cols-5 gap-2 mb-6">
        <CardUser v-for="item in paginationData.paginatedData" :key="item._id" :username="item.username"
            :fullname="item.fullname" :email="item.email" :id="item._id" />
    </div>
    <div v-if="paginationData.totalPage > 1" class="w-full flex justify-center">

        <Pagination :visiblePage="5" :totalPage="paginationData.totalPage" :currentPage="paginationData.page"
            @to-next="paginationData.nextPage" @to-back="paginationData.backPage" @to-page="paginationData.goToPage" />
    </div>

</template>