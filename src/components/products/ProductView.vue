<script setup>
// Componets
import TableProduct from '@/components/tables/TableProduct.vue';
import Pagination from '@/components/Pagination.vue';
import Button from '@/components/buttons/Button.vue';
import Filter from '@/components/Filter.vue';
import {FwbAlert} from 'flowbite-vue'
// Servie
import bookService from '@/services/book.service';

// Composables
import { useAlert } from '@/composables/useAlert';
import { usePagination } from '@/composables';
import { useRouter } from 'vue-router';
import { onMounted, ref, watchEffect } from 'vue';
import Alert from '../Alert.vue';

const router = useRouter();
const totalProduct = ref([]);
const paginationData = ref({});
const {showAlert, showAlertMessage, dismissAlert, alertType, alertMessage} = useAlert()

const addBook = () => {
    router.push("/product/add")
}

const editBook = async (id) => {
    console.log(id)
}

const deleteBook = async (id) => {
    try{
        const data = await bookService.delete(id);
        if(data){
            showAlertMessage('success', "Xóa thành công")
            // alert(`Xóa thành công ${id}`)
            totalProduct.value = totalProduct.value.filter((item) => {
                return item._id !== id
            })
        }
    } catch(error){
        showAlertMessage('danger', "Xóa thất b")
        console.log(error)
    }
}

watchEffect(() => {
    paginationData.value = usePagination({
        data: totalProduct.value,
        perPage: 6,
        router
    });
});

const fetchData = async () => {
    try {
        const data = await bookService.getAll();
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
    <Alert
        :show-alert="showAlert"
        :alert-type="alertType"
        :alert-message="alertMessage"
    >
    </Alert>
    <div class="flex justify-between">
        <h2 class="text-2xl text-[rgb(32,34,36)] font-bold">Sản phẩm</h2>
        <Button
            icon="fa-solid fa-plus"
            @on-click="addBook"
        >
            Thêm
        </Button>
    </div>
    <!-- <Filter></Filter> -->
    <TableProduct
        @on-edit="editBook"
        @on-delete="deleteBook"
        :products="paginationData.paginatedData"
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