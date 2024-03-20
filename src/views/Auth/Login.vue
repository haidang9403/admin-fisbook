<template>
    <div class="min-h-screen grid place-items-center bg-sky-500">
        <form @submit.prevent = "onSubmit" class="w-1/3 p-12 bg-white rounded-lg">
            <h4 class="text-2xl mb-3 text-center w-full font-bold dark:text-white">Đăng nhập</h4>
            <p class="mb-6 text-sm text-center w-full font-normal text-gray-900 ">Hãy đăng nhập tài khoản của bạn để tiếp tục!</p>
            <Input
                @in-focus="clearError"
                label="Tài khoản"
                :disabled="isLoading"
                :errors="errors"
                id="username"
                placeholder="Tài khoản..."
                v-model="userLoggin.username"
            />
            <Input 
                @in-focus="clearError"
                type="password"
                label="Mật khẩu"
                :disabled="isLoading"
                :errors="errors"
                id="password"
                placeholder="Mật khẩu..."
                v-model="userLoggin.password"
            />
            <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700" />
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ghi nhớ tài khoản</label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Đăng nhập</button>
        </form>
    </div>
</template>

<script setup>
import Input from '@/components/inputs/Input.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userLoggin = ref({
    username: "",
    password: ""
})

const isLoading = ref(false);
const errors = computed(() => store.state.auth.error)

const clearError = () => {
    store.commit("CLEAR_ERROR")
}


const onSubmit = async() => {
    isLoading.value = true
    const success = await store.dispatch('login', userLoggin.value);
    isLoading.value = false
    if(success){
        router.push("/")
    }else {
        console.log(">> Đăng nhập thất bại")
    }
}

</script>
<style scoped>
    
</style>