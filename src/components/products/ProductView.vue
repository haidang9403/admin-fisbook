<script setup>
// Componets
import TableProduct from '@/components/tables/TableProduct.vue';
import Pagination from '@/components/Pagination.vue';
import Button from '@/components/buttons/Button.vue';
import FilterProduct  from '@/components/filters/FilterProduct.vue'
// Servie
import bookService from '@/services/book.service';

// Composables
import { useAlert } from '@/composables/useAlert';
import { usePagination } from '@/composables';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, watchEffect, computed } from 'vue';
import Alert from '../Alert.vue';

const route = useRoute()
const router = useRouter();
const totalProduct = ref([]);
const baseData = ref([]);
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
        perPage: 18,
        router
    });
});

const keySearch = computed(() => route.query.key)

const fetchData = async () => {
    try {
        const data = await bookService.getAll();
        data.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA; // Sắp xếp từ mới đến cũ
        });
        totalProduct.value = data;
        baseData.value = data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const handleRemove = () =>{
    router.push("/product")
}

onMounted(() => {
    fetchData();
    document.title = "Sách"
});
</script>

<template>
    <Alert :show-alert="showAlert" :alert-type="alertType" :alert-message="alertMessage">
    </Alert>
    <div class="flex justify-between">
        <h2 v-if="!keySearch" class="text-2xl text-[rgb(32,34,36)] font-bold">Sách</h2>
        <div class="flex gap-2">
            <h2 v-if="keySearch" class="text-2xl font-bold  h-full flex items-center">Tìm kiếm: </h2>
            <div v-if="keySearch" class="bg-blue-200 border border-1 gap-2 border-blue-500 rounded-full flex items-center py-2 px-4">
                <span class="">" <strong>{{ keySearch }}</strong> "</span>
                <i @click="handleRemove()" class="size-4 fa-solid fa-circle-xmark text-blue-500 hover:text-blue-400 cursor-pointer"></i>
            </div>
        </div>
        <Button icon="fa-solid fa-plus" @on-click="addBook">
            Thêm
        </Button>
    </div>
    <FilterProduct :base-data="baseData" v-model="totalProduct" />
    <div v-if="totalProduct.length !== 0" class="w-full">
        <TableProduct @on-edit="editBook" @on-delete="deleteBook" :products="paginationData.paginatedData" />
        <div v-if="paginationData.totalPage > 1" class="w-full flex justify-end">
            <Pagination :visiblePage="5" :totalPage="paginationData.totalPage" :currentPage="paginationData.page"
                @to-next="paginationData.nextPage" @to-back="paginationData.backPage"
                @to-page="paginationData.goToPage" />
        </div>
    </div>
    <div v-else-if="totalProduct.length === 0"class="w-full bg-slate-200 rounded-lg h-full font-bold text-3xl flex justify-center items-center gap-2">
        Không có sản phẩm nào
        <i class="fa-solid fa-exclamation"></i>
    </div>
</template>