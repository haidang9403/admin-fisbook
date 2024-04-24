<script setup>
import userService from '@/services/user.service';
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TableBorrowing from './tables/TableBorrowing.vue';

const route = useRoute();
const router = useRouter();

const id = computed(() => route.params.id);
const user = ref(null)

const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

const returnPage = () =>{
    router.push("/user")
}

const fetchData = async () => {
    try {
        const data = await userService.getOne(id.value);
        data.borrowings.sort((a, b) => {
            const dateA = new Date(a.borrow_at);
            const dateB = new Date(b.borrow_at);
            return dateB - dateA; // Sắp xếp từ mới đến cũ
        });
        user.value = data;
        document.title = user.value.fullname
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
    document.title = "Chi tiết khách hàng"
})

</script>

<template>
    <div v-if="!user">
        <div role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div class="w-full">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else class="bg-white w-full rounded-lg shadow p-12">
        <div class="grid grid-cols-12 gap-2 ">
            <div class="text-xl">
                <div @click="returnPage"
                    class="grid place-items-center cursor-pointer size-[50px] rounded-full hover:bg-gray-100 transition-colors">
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
            </div>
            <div class="col-span-3 text-center flex flex-col items-center justify-center">
                <img class="size-[200px] rounded-full" src="/images/9720009.jpg" alt="Avatar">
                <h5 class="font-bold tracking-tight text-gray-900 mt-6">{{ user.fullname }}</h5>
            </div>
            <div class="col-span-8 border-l-2 border-gray-200 px-4 grid gap-1">
                <div>
                    <i class="fa-regular fa-address-card mr-2"></i>
                    Tên tài khoản: <strong>{{ user.username }}</strong>
                </div>
                <div>
                    <i class="fa-regular fa-envelope mr-2"></i>
                    Email: <strong>{{ user.email }}</strong>
                </div>
                <div>
                    <i class="fa-solid fa-phone-volume mr-2"></i>
                    Số điện thoại: <strong>{{ user.phone || 'Chưa cập nhật'}}</strong>
                </div>
                <div>
                    <i class="fa-regular fa-calendar mr-2"></i>
                    Ngày sinh: <strong>{{ formatDate(user.date) || 'Chưa cập nhật' }}</strong>
                </div>
                <div>
                    <i class="fa-solid fa-person-half-dress mr-2"></i>
                    Giới tính: <strong>{{ user.gender || 'Chưa cập nhật' }}</strong>
                </div>
                <div>
                    <i class="fa-solid fa-location-dot mr-2"></i>
                    Địa chỉ: <strong>{{ user.address || 'Chưa cập nhật' }}</strong>
                </div>
            </div>
        </div>
        <div class="mt-12">
            <h3 class="text-xl font-bold mb-6">Đơn mượn</h3>
            <div v-if="user.borrowings.length == 0" class="bg-slate-100 p-8 text-xl font-medium text-center rounded-lg">
                Chưa có đơn mượn nào
            </div>
            <div v-else>
                <TableBorrowing is-view :data="user.borrowings" />
            </div>
        </div>
    </div>
</template>