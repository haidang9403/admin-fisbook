<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Button from '../buttons/Button.vue';
import Input from '../inputs/Input.vue';
import { FwbSelect } from 'flowbite-vue'
import adminService from '@/services/admin.service';
import authService from '@/services/auth.service';

const router = useRouter()

const admin = ref({
    fullname: "",
    phone: "",
    address: "",
    position: null,
    username: "",
    password: "",
    confirmPassword: "",
})
const isLoading = ref(false)
const errors = ref({})

const positions = [
    { value: 0, name: "Quản lý"},
    { value: 1, name: "Nhân viên"}
]

const onSubmit = async () => {
    try {
        isLoading.value = true
        const result = await authService.register(admin.value)
        isLoading.value = false
        if(result){
            router.push("/admin")
        }
    } catch (error){
        console.log(error)
        errors.value = error.response?.data;
        isLoading.value = false
    }
}

onMounted(() => {
    document.title = "Thêm thành viên"
})

</script>

<template>
    <h2 class="text-2xl text-[rgb(32,34,36)] font-bold">Thêm thành viên</h2>
    <div class="w-full relative flex justify-center rounded-lg bg-white py-12">
        <div class="text-xl absolute top-4 left-4">
            <router-link to="/admin"
                class="grid place-items-center cursor-pointer size-[50px] rounded-full hover:bg-gray-100 transition-colors">
                <i class="fa-solid fa-chevron-left"></i>
            </router-link>
        </div>
        <form @keypress.enter.prevent @submit.prevent="onSubmit" class="w-2/3 flex flex-col items-center">
            <h2 class="text-xl text-[rgb(32,34,36)] font-bold">Thông tin thành viên</h2> 
            <div class="grid gap-x-6 grid-cols-12 w-full">
                <Input label="Họ và tên" id="fullname" :disabled="isLoading" class="col-span-12" v-model="admin.fullname" :errors="errors"/>
                <Input label="Số điện thoại" id="phone" :disabled="isLoading" class="col-span-6" v-model="admin.phone" :errors="errors"/>
                <fwb-select :validation-status="errors['position'] ? 'error': ''" :disabled="isLoading" class="col-span-6" v-model="admin.position" label="Chọn vị trí" :options="positions">
                    <template v-if="errors['position']" #validationMessage>
                        {{ errors['position'] }}
                    </template>
                </fwb-select>
                <Input label="Địa chỉ" id="address" :disabled="isLoading" class="col-span-12" v-model="admin.address" :errors="errors" />
                
            </div>
            <h2 class="text-xl text-[rgb(32,34,36)] font-bold">Thông tin tài khoản</h2> 
            <div class="grid gap-x-6 w-2/4 items-center">
                <Input label="Tên đăng nhập" id="username" :disabled="isLoading" v-model="admin.username" :errors="errors"/>
                <Input label="Mật khẩu" type="password" id="password" :disabled="isLoading" v-model="admin.password" :errors="errors"/>
                <Input label="Xác nhận lại mật khẩu" type="password" id="confirmPassword" :disabled="isLoading" v-model="admin.confirmPassword" :errors="errors" />
            </div>
            <Button type="submit" icon="fa-solid fa-plus">
                Thêm thành viên
            </Button>
        </form>
    </div>
</template>