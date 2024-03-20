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

const getInputImg = (file) => {
    if(file){
        data.value.photo = file;
    } else {
        data.value.photo = '';
    }
}

const getAuthor = (id) => {
    data.value.author = id;
}

const getCategory = (id) => {
    data.value.category = id;
}
const getPublisher = (id) => {
    data.value.publisher = id;
}

const authors = ref(null);
const categories = ref(null);
const publishers = ref(null);

const initData = {
    title: '',
    photo: '',
    price: null,
    amount: null,
    author: '',
    publisher: '',
    category: ''
}

const router = useRouter()
const data = ref(initData);
const errors = ref({});
const {showAlert, showAlertMessage, dismissAlert, alertType, alertMessage} = useAlert()

const onSubmit = async () => {
    try {
        const result = await bookService.add(data.value);
        if(result) {
            showAlertMessage('success', "Thêm sách thành công")
            router.push("/product");
        } 
    } catch (error){
        console.log(error)
        errors.value = error.response.data;
        if(errors.value.message){
            errors.value = {
                'img': errors.value.message
            }
        }
    }
}

onMounted(async () => {
    // Get author
    const authorData = await bookService.getAuthor();
    authors.value = authorData.map((item) => {
        return {
            _id: item._id,
            value: item.fullname
        }
    })

    // Get category
    const categoryData = await bookService.getCategory();
    categories.value = categoryData.map((item) => {
        return {
            _id: item._id,
            value: item.title
        }
    })

    // Get publisher
    const publisherData = await bookService.getPublisher();
    publishers.value = publisherData.map((item) => {
        return {
            _id: item._id,
            value: item.name
        }
    })
})
</script>

<template>
     <Alert
        :show-alert="showAlert"
        :alert-type="alertType"
    >
        {{ alertMessage }}
    </Alert>
    <h2 class="text-2xl text-[rgb(32,34,36)] font-bold">Thêm sách</h2>
    <div class="w-full flex justify-center rounded-lg bg-white py-12">
        <form @submit.prevent="onSubmit" class="w-2/3 flex flex-col items-center">
            <InputImage
                id="img"
                @input-file="getInputImg"
                :errors="errors"
            />
            <div class="grid gap-x-6 grid-cols-12 w-full">
                <Input
                    :errors="errors"
                    class="col-span-12"
                    label="Tên sách"
                    id="title"
                    v-model="data.title"
                />

                <InputSelect
                    :errors="errors"
                   class="col-span-4"
                   id="author"
                   :data="authors"
                   label="Tác giả"
                   placeholder="Chọn tác giả"
                   @get-data="getAuthor"
                />

               <InputSelect
                    :errors="errors"
                   class="col-span-4"
                   id="category"
                   :data="categories"
                   label="Danh mục"
                   placeholder="Chọn danh mục"
                   @get-data="getCategory"
                />

               <InputSelect 
                    :errors="errors"
                   class="col-span-4"
                   id="publisher"
                   :data="publishers"
                   label="Nhà xuất bản"
                   placeholder="Chọn nhà xuất bản"
                   @get-data="getPublisher"
                />
               
                <Input
                    class="col-span-7"
                    type="number"
                    label="Giá mượn"
                    id="price"
                    v-model="data.price"
                    :errors="errors"
                />
                <Input
                    placeholder="0"
                    class="col-span-5"
                    type='number'
                    label="Số lượng"
                    id="amount"
                    v-model="data.amount"
                    :errors="errors"
                />
               
            </div>
            <Button
                type="submit"
                icon="fa-solid fa-plus"
            >
                Thêm sách
            </Button>
        </form>
    </div>
</template>