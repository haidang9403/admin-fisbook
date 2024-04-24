<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import bookService from '@/services/book.service';

import Button from '../buttons/Button.vue';
import Input from '../inputs/Input.vue';
import InputImage from '../inputs/InputImage.vue';
import InputSelect from '../inputs/InputSelect.vue';
import useBook from '@/composables/useBook';

const {
    data,
    authors,
    categories,
    publishers,
    set,
    add
} = useBook()


const router = useRouter();

const errors = ref({});

const onSubmit = async () => {
    try {
        const { author, publisher, category, _id } = data.value;
        const editedData = {
            ...data.value, // Giữ lại các thuộc tính khác của data.value
            author: author._id,
            publisher: publisher._id,
            category: category._id,
        };
        
        const result = await bookService.edit(editedData, _id);
        if(result) {
            alert("Thành công!");
            router.push("/product");
        } 
    } catch (error){
        errors.value = error.response?.data;
        if(errors.value.message){
            errors.value = {
                'img': errors.value.message
            }
        }
    }
}

onMounted(() => {
    document.title = "Chỉnh sửa "
})
</script>

<template>
    <h2 class="text-2xl text-[rgb(32,34,36)] font-bold">Chỉnh sửa sách</h2>
    <div class="w-full relative flex justify-center rounded-lg bg-white py-12">
        <div class="text-xl absolute top-4 left-4">
            <router-link to="/product"
                class="grid place-items-center cursor-pointer size-[50px] rounded-full hover:bg-gray-100 transition-colors">
                <i class="fa-solid fa-chevron-left"></i>
            </router-link>
        </div>
        <form @submit.prevent="onSubmit" class="w-2/3 flex flex-col items-center">
            <InputImage :image="data.img" id="img" @input-file="set.image" :errors="errors" />
            <div class="grid gap-x-6 grid-cols-12 w-full">

                <Input :errors="errors" class="col-span-12" label="Tên sách" id="title" v-model="data.title" />

                <InputSelect :errors="errors" class="col-span-4" id="author" :data="authors" label="Tác giả"
                    :placeholder="data.author.fullname" @get-data="set.author" @on-add="add.author" />

                <InputSelect :errors="errors" class="col-span-4" id="category" :data="categories" label="Danh mục"
                    :placeholder="data.category?.title" @get-data="set.category" @on-add="add.category" />

                <InputSelect :errors="errors" class="col-span-4" id="publisher" :data="publishers" label="Nhà xuất bản"
                    :placeholder="data.publisher?.name" @get-data="set.publisher" @on-add="add.publisher" />

                <Input class="col-span-7" type="number" label="Giá mượn" id="price" v-model="data.price"
                    :errors="errors" />
                <Input placeholder="0" class="col-span-5" type='number' label="Số lượng" id="amount"
                    v-model="data.amount" :errors="errors" />

            </div>
            <Button type="submit" icon="fa-regular fa-pen-to-square">
                Chỉnh sửa
            </Button>
        </form>
    </div>
</template>@/composables/useBook