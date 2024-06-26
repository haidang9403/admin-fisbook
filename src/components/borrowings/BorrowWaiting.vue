<script setup>
import TableBorrowing from '@/components/tables/TableBorrowing.vue';
import borrowingService from '@/services/borrowing.service';
import Pagination from '@/components/Pagination.vue';
import Tabs from '@/components/Tabs.vue';

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
        perPage: 6,
        router
    });
});

const onApprove = async (data) => {
    const admin_id = store.state.auth.user._id;
    const dataSubmit = {
        ...data,
        status: 'Đang mượn',
        book_id: data.book_id._id,
        user_id: data.user_id._id,
        admin_id
    }

    await borrowingService.update(data._id, dataSubmit);
    fetchData();
}

const onRefuse = async (data) => {
    const admin_id = store.state.auth.user._id;
    const dataSubmit = {
        ...data,
        status: 'Từ chối',
        book_id: data.book_id._id,
        user_id: data.user_id._id,
        admin_id
    }

    await borrowingService.update(data._id, dataSubmit);
    fetchData();
}


const fetchData = async () => {
    try {
        const data = await borrowingService.getAll({status: "Chưa duyệt"});
        data.sort((a, b) => {
            const dateA = new Date(a.borrow_at);
            const dateB = new Date(b.borrow_at);
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
        @on-update="onApprove"
        @on-refuse="onRefuse"
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