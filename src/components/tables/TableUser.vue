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
                    <th scope="col" class="px-6 py-3">Ảnh đại diện</th>
                    <th scope="col" class="px-6 py-3">Tài khoản</th>
                    <th scope="col" class="px-6 py-3">Họ và tên</th>
                    <th scope="col" class="px-6 py-3"></th>
                    <th scope="col" class="px-6 py-3">NXB</th>
                    <th scope="col" class="px-6 py-3">Giá</th>
                    <th scope="col" class="px-6 py-3">Số lượng</th>
                    <th scope="col" class="px-6 py-3">Cập nhật</th>
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

                </tr>
            </tbody>
        </table>
    </div>
    
</template>