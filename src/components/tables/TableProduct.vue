<script setup>
import { initModals } from 'flowbite';
// import { RouterLink } from 'vue-router';
import { ref , onUpdated } from 'vue';
import router from '@/router';

defineProps({
    products: Array,
})


const emit = defineEmits(['onEdit', 'onDelete']);

const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const editView = (id) => {
    router.push("/product/edit/" + id)
}

onUpdated(() => {
    initModals();
})

</script>

<template>
    
    <div class="relative overflow-x-auto shadow sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr class="p-4 border">
                    <th scope="col" class="px-6 py-3">Tên sách</th>
                    <th scope="col" class="px-6 py-3">Ảnh</th>
                    <th scope="col" class="px-6 py-3">Danh mục</th>
                    <th scope="col" class="px-6 py-3">Tác giả</th>
                    <th scope="col" class="px-6 py-3">NXB</th>
                    <th scope="col" class="px-6 py-3">Giá</th>
                    <th scope="col" class="px-6 py-3">Số lượng</th>
                    <th scope="col" class="px-6 py-3">Cập nhật</th>
                    <th scope="col" class="px-6 py-3">Cài đặt</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(product, index) in products" 
                    :key="product._id"
                    class="bg-white border hover:bg-gray-50 "
                >
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap max-w-[200px] truncate">{{ product.title }}</th>
                    <td class="px-6 py-4">
                        <img :src="product.img" class="size-[60px] object-contain" :alt="product.title">
                    </td>
                    <td class="px-6 py-4 max-w-[180px] truncate">{{ product.category?.title }}</td>
                    <td class="px-6 py-4 max-w-[180px] truncate">{{ product.author?.fullname }}</td>
                    <td class="px-6 py-4 max-w-[180px] truncate">{{ product.publisher?.name }}</td>
                    <td class="px-6 py-4">{{ product.price ? '₫' + product.price.toLocaleString('vi-VN') : "Chưa cập nhật" }}</td>
                    <td class="px-6 py-4">{{ product.amount }}</td>
                    <td class="px-6 py-4">{{ formatDate(product.updatedAt) }}</td>
                    <td class="px-6 py-4">
                        <div class="inline-flex rounded-md shadow-sm" role="group">
                            <button @click="editView(product._id)" type="button" class="block px-4 py-2 text-sm font-medium text-gray-900 bg-whit0e border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500 ">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button :data-modal-target="'popup-modal-' + index" :data-modal-toggle="'popup-modal-' + index" type="button" class="px-4 py-2 text-sm font-medium text-[#ef3826] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                            <div :id="'popup-modal-' + index" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative p-4 w-full max-w-md max-h-full">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " :data-modal-hide="'popup-modal-' + index">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                            <span class="sr-only">Hủy xóa</span>
                                        </button>
                                        <div class="p-4 md:p-5 text-center">
                                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                            </svg>
                                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn có muốn xóa  {{ product.title }}?</h3>
                                            <button @click="emit('onDelete',product._id)" :data-modal-hide="'popup-modal-' + index" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                Xóa
                                            </button>
                                            <button :data-modal-hide="'popup-modal-' + index" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Hủy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>