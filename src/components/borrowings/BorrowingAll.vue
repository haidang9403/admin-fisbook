<script setup>
import TableBorrowing from '@/components/tables/TableBorrowing.vue';
import borrowingService from '@/services/borrowing.service';
import Pagination from '@/components/Pagination.vue';

// Composables
import { usePagination } from '@/composables';
import { useRouter } from 'vue-router';
import { onMounted, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const router = useRouter();
const totalProduct = ref([]);
const paginationData = ref({});

watchEffect(() => {
    paginationData.value = usePagination({
        data: totalProduct.value,
        perPage: 12,
        router
    });
});


const fetchData = async () => {
    try {
        const data = await borrowingService.getAll();
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
});

</script>

<template>
    <TableBorrowing
        :data="paginationData.paginatedData"
        isView
    />

    <div v-if="paginationData.totalPage > 1" class="w-full flex justify-end">

        <Pagination
            :visiblePage="5"
            :totalPage="paginationData.totalPage"
            :currentPage="paginationData.page"
            @to-next="paginationData.nextPage"
            @to-back="paginationData.backPage"
            @to-page="paginationData.goToPage"
        />
    </div>
</template>