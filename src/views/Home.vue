<script setup>
import TotalItem from '@/components/TotalItem.vue';
import bookService from '@/services/book.service';
import userService from '@/services/user.service';
import adminService from '@/services/admin.service';
import borrowingService from '@/services/borrowing.service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const totalBook = ref(0)
const totalUser = ref(0)
const totalAdmin = ref(0)
const totalRevenue = ref(0)

const fetchData = () => {
    try{
        bookService.getAll().then((res) => {
            totalBook.value = res.length
        })

        userService.getAll().then((res) => {
            totalUser.value = res.length
        })

        adminService.getAll().then((res) => {
            totalAdmin.value = res.length
        })

        borrowingService.getAll().then((res)=> {
            totalRevenue.value = 0
            res.forEach(item => {
                if(item.status === 'Đang mượn'){
                    totalRevenue.value += item.total_money
                }
            })
        })
    } catch(error){

    }
}

onMounted(() =>{
    fetchData()
    document.title = "Trang chủ"
})

</script>

<template>
    <h2 class="text-2xl text-[#202224] font-bold">Trang chủ</h2>
    <div class="columns-4 gap-6">
        <TotalItem
            label="Tổng người dùng"
            :value="totalUser"
            icon="fa-solid fa-users"
        />
        <TotalItem
            label="Tổng thành viên"
            :value="totalAdmin"
            icon="fa-solid fa-user-tie"
        />
        <TotalItem
            label="Tổng sách"
            :value="totalBook"
            icon="fa-solid fa-book"
        />
        <TotalItem
            label="Tổng doanh thu"
            :value="totalRevenue"
            prefix="đ"
            icon="fa-solid fa-money-bill-1-wave"
        />
    </div>
    <div class="bg-banner-admin p-[56px] w-full h-full bg-cover bg-no-repeat rounded-xl shadow">
        <h2 class="text-white text-4xl font-extrabold">Fisbook xin chào, </h2>
        <p class="w-2/4 py-6 text-white font-medium text-xl text-left"> 
            Chào mừng đến với trang quản lý mượn sách! Tại đây, bạn có thể dễ dàng quản lý việc mượn và trả sách của thành viên, tìm kiếm sách trong thư viện và nhiều tính năng hữu ích khác. Hãy khám phá ngay!
        </p>
        <button @click="() => router.push('/product')" class="rounded-full min-w-[160px] bg-white text-black py-[10px] px-[6px] text-xl font-bold hover:text-white hover:bg-black transition">
            Đơn hàng
        </button>
    </div>
</template>

