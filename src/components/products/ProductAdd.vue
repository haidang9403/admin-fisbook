<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/useAlert';

import bookService from '@/services/book.service';

import Button from '../buttons/Button.vue';
import Input from '../inputs/Input.vue';
import InputImage from '../inputs/InputImage.vue';
import InputSelect from '../inputs/InputSelect.vue';
import Alert from '../Alert.vue';
import useBook from '@/composables/useBook';

const { 
    data, 
    authors,
    categories,
    publishers,
    set,
    add
    } = useBook()

const router = useRouter()
const errors = ref({});

const clearError = () => {
    errors.value = {}
}
// const {showAlert, showAlertMessage, dismissAlert, alertType, alertMessage} = useAlert()

const onSubmit = async () => {
    try {
        const result = await bookService.add(data.value);
        if(result) {
            // showAlertMessage('success', "Thêm sách thành công")
            router.push("/product");
        } 
    } catch (error){
        console.log(error)
        errors.value = error.response?.data;
        if(errors.value.message){
            errors.value = {
                'img': errors.value.message
            }
        }
    }
}

onMounted(() => {
    document.title = "Thêm sách"

})
</script>

<template>
    <h2 class="text-2xl text-[rgb(32,34,36)] font-bold">Thêm sách</h2>
    <div class="w-full relative flex justify-center rounded-lg bg-white py-12">
        <div class="text-xl absolute top-4 left-4">
            <router-link to="/product"
                class="grid place-items-center cursor-pointer size-[50px] rounded-full hover:bg-gray-100 transition-colors">
                <i class="fa-solid fa-chevron-left"></i>
            </router-link>
        </div>
        <form @keypress.enter.prevent @submit.prevent="onSubmit" class="w-2/3 flex flex-col items-center">
            <InputImage @in-focus="clearError" id="img" @input-file="set.image" :errors="errors" />
            <div class="grid gap-x-6 gap-y-4 grid-cols-12 w-full">
                <Input @in-focus="clearError" :errors="errors" class="col-span-12" label="Tên sách" id="title" v-model="data.title" />

                <InputSelect @in-focus="clearError" :errors="errors" class="col-span-4" id="author" :data="authors" label="Tác giả"
                    placeholder="Chọn tác giả" @get-data="set.author" @on-add="add.author" />

                <InputSelect @in-focus="clearError" :errors="errors" class="col-span-4" id="category" :data="categories" label="Danh mục"
                    placeholder="Chọn danh mục" @get-data="set.category" @on-add="add.category" />

                <InputSelect @in-focus="clearError" :errors="errors" class="col-span-4" id="publisher" :data="publishers" label="Nhà xuất bản"
                    placeholder="Chọn nhà xuất bản" @get-data="set.publisher" @on-add="add.publisher" />

                <Input @in-focus="clearError" class="col-span-7" type="number" label="Giá mượn" id="price" v-model="data.price"
                    :errors="errors" />
                <Input @in-focus="clearError" placeholder="0" class="col-span-5" type='number' label="Số lượng" id="amount"
                    v-model="data.amount" :errors="errors" />

            </div>
            <Button type="submit" icon="fa-solid fa-plus">
                Thêm sách
            </Button>
        </form>
    </div>
</template>