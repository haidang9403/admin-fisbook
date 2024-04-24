<script setup>
import CardUser from '@/components/CardUser.vue'
import Pagination from '@/components/Pagination.vue';
import adminService from '@/services/admin.service';
import { useStore } from 'vuex';

const store = useStore()
const user = computed(()=> store.state.auth.user)

// Composables
import { usePagination } from '@/composables';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref, watchEffect } from 'vue';
import Button from '@/components/buttons/Button.vue';

const router = useRouter();
const totalProduct = ref([]);
const paginationData = ref({});
const currentUser = ref({})


watchEffect(() => {
    paginationData.value = usePagination({
        data: totalProduct.value,
        perPage: 20,
        router
    });
});

const fetchData = async () => {
    try {
        const data = await adminService.getAll();
        currentUser.value = await adminService.getDetails(user.value._id)
        data.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA; // Sắp xếp từ mới đến cũ
        });
        totalProduct.value = data.filter((user) => user._id != currentUser.value._id);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
    document.title = "Thành viên"
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
    <div class="flex justify-between">
        <h2 class="text-2xl text-[#202224] font-bold">Thành viên</h2>
        <Button v-if="currentUser.position == 0" @on-click="() => router.push('/admin/add')" icon="fa-solid fa-plus">
            Thêm
        </Button>
    </div>
    <div v-if="totalProduct.length > 0" class="grid grid-cols-5 gap-2 mb-6">
        <CardUser v-for="item in paginationData.paginatedData" 
            :key="item._id" 
            :username="item.username"
            :fullname="item.fullname" 
            :position="item.position"
            :addition="item"
            admin
            :id="item._id"
            :able-delete="currentUser.position == 0"
        />
    </div>
    <div v-if="paginationData.totalPage > 1" class="w-full flex justify-center">

        <Pagination :visiblePage="5" :totalPage="paginationData.totalPage" :currentPage="paginationData.page"
            @to-next="paginationData.nextPage" @to-back="paginationData.backPage" @to-page="paginationData.goToPage" />
    </div>

</template>