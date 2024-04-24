<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import InputSearch from './inputs/InputSearch.vue';
import ButtonCircle from './buttons/ButtonCircle.vue'
import { useStore } from 'vuex';
import { initDropdowns } from 'flowbite';
import adminService from '@/services/admin.service';

const store = useStore();
const router = useRouter();

const user = computed(() => store.state.auth.user)
const currentUser = ref({})

const fetchData = async () => {
    try{
        currentUser.value = await adminService.getDetails(user.value._id)
        namePosition = currentUser.value.position == 0 ? 'Quản lý' : 'Nhân viên'
    } catch(e) {

    }
}

let namePosition = currentUser.value.position == 0 ? 'Quản lý' : 'Nhân viên'

const logOut = async () => {
    try{
        const result = await store.dispatch('logout');
        if( result ){
            router.push("/login");
        } else{
            alert("Có lỗi xảy ra!")
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    initDropdowns();
    fetchData()
})

</script>

<template>
    <div class="flex items-center justify-between h-[70px] -ml-3">
        <InputSearch/>
        <div class="flex gap-6 items-center  pr-[50px]">
            <div class="flex gap-3">
                <img src="/images/9720009.jpg" class="size-[44px] rounded-full" alt="">
                <div class="grid place-content-center">
                    <h4 class="font-bold text-sm">{{ currentUser?.fullname }}</h4>
                    <p class="font-light text-xs">{{  namePosition }}</p>
                </div>
            </div>
            <ButtonCircle
                size="18px"
                dropdownId="dropdownDots"
            >
                <i class=" fa-solid fa-chevron-down text-[9px]"></i>
            </ButtonCircle>
            <!-- Dropdown menu -->
            <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                <li>
                    <router-link to="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Tài khoản</router-link>
                </li>
                <li>
                    <router-link to="/" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cài đặt</router-link>
                </li>
                
                </ul>
                <div class="py-2">
                    <div @click="logOut" class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Đăng xuất</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>