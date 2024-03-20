<script setup>
import Button from '../buttons/Button.vue';
import Badge from '../Badge.vue';

import { initModals } from 'flowbite';
import { onUpdated } from 'vue';



const props = defineProps({
    data: Array,
    state: {
        type: String,
        default: 'waiting'
    },
    isView: Boolean
})

const emit = defineEmits(['onUpdate','onRefuse'])

const checkState = (status) => {
    switch (status) {
        case 'Chưa duyệt':
            return 'warning';
        case 'Đang mượn':
            return 'info';
        case 'Đã trả':
            return 'success';
        case 'Từ chối':
            return 'danger';
    }
}


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

onUpdated(() => {
    initModals();
})

</script>

<template>
    
    <div class="relative overflow-x-auto shadow sm:rounded-lg">
        <table v-if="data.length !== 0" class="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr class="p-4 border">
                    <th scope="col" class="px-6 py-3">Tài khoản</th>
                    <th scope="col" class="px-6 py-3">Tên sách</th>
                    <th scope="col" class="px-6 py-3">Ảnh </th>
                    <th scope="col" class="px-6 py-3">Ngày mượn</th>
                    <th scope="col" class="px-6 py-3">Tổng tiền</th>
                    <th scope="col" class="px-6 py-3">Trạng thái</th>
                    <th v-if="!isView" scope="col" class="px-6 py-3">Hành động</th>
                    <th v-if="state === 'approve' && !isView" scope="col" class="px-6 py-3">Xác nhận trả</th>

                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in data" 
                    :key="item._id"
                    class="bg-white border hover:bg-gray-50 "
                >
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ item.user_id?.username }}</th>
                    <td class="px-6 py-4 max-w-[200px] truncate">{{ item.book_id?.title }}</td>
                    <td class="px-6 py-4">
                        <img :src="item.book_id?.img" class="size-[60px]" :alt="item.book_id?.title">
                    </td>
                    <td class="px-6 py-4">{{ formatDate(item.borrow_at) }}</td>
                    <td class="px-6 py-4">{{ item.total_money ? '₫' + item.total_money.toLocaleString('vi-VN') : "Chưa cập nhật" }}</td>
                    <td class="px-6 py-4">
                        <Badge
                            :label="item.status"
                            :status="checkState(item.status)"
                        />
                    </td>
                    <td v-if="!isView" class="px-6 py-4">
                        <div v-if="!item.admin_id">
                            <div class="inline-flex rounded-md shadow-sm" role="group">
                                <button @click="emit('onUpdate', item)" type="button" class="block px-4 py-2 text-sm font-medium text-gray-900 bg-whit0e border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500 ">
                                    <i class="fa-regular fa-circle-check mr-2"></i> Duyệt mượn
                                </button>
                                <button :data-modal-target="'popup-modal-' + index" :data-modal-toggle="'popup-modal-' + index" type="button" class="px-4 py-2 text-sm font-medium text-[#ef3826] bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500">
                                    <i class="fa-regular fa-circle-xmark mr-2"></i>
                                    Từ chối
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
                                                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Bạn sẽ từ chối đơn mượn của  {{ item.user_id?.username }}?</h3>
                                                <button @click="emit('onRefuse',item)" :data-modal-hide="'popup-modal-' + index" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                    Từ chối
                                                </button>
                                                <button :data-modal-hide="'popup-modal-' + index" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Hủy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p v-else>Duyệt bởi {{ item.admin_id.username }}</p>
                    </td>
                    <td v-if="state === 'approve' && !isView" class="px-6 py-4">
                        <Button
                            @on-click="emit('onUpdate',item)"
                        >
                            Xác nhận
                        </Button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            Chưa có đơn mượn nào cần duyệt
        </div>
    </div>
    
</template>