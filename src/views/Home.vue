<template>
    <h2 class="text-2xl text-[#202224] font-bold">Trang chủ</h2>
    <div class="columns-4 gap-6">
        <TotalItem/>
        <TotalItem/>
        <TotalItem/>
        <TotalItem/>
    </div>
    <div class="bg-banner-admin p-[56px] w-full h-full bg-cover bg-no-repeat rounded-xl shadow">
        <h2 class="text-white text-4xl font-extrabold">Xin chào Hải Đăng,</h2>
        <p class="w-2/4 py-6 text-white font-medium text-xl text-left"> 
            Chào mừng đến với trang quản lý mượn sách! Tại đây, bạn có thể dễ dàng quản lý việc mượn và trả sách của thành viên, tìm kiếm sách trong thư viện và nhiều tính năng hữu ích khác. Hãy khám phá ngay!
        </p>
        <button class="rounded-full min-w-[160px] bg-white text-black py-[10px] px-[6px] text-xl font-bold hover:text-white hover:bg-black transition">
            Đơn hàng
        </button>
    </div>
</template>

<script setup>
import TotalItem from '@/components/TotalItem.vue';


</script>
<style scoped>
    
</style>