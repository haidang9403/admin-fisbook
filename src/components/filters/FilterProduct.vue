<script setup>
import InputSearch from '@/components/inputs/InputSearch.vue';
import FilterItem from './FilterItem.vue';
import { computed, onMounted, ref, watch} from 'vue';
import { initDropdowns } from 'flowbite';
import { vi } from 'date-fns/locale';
import bookService from '@/services/book.service';
import { format } from 'date-fns';
import Button from '../buttons/Button.vue';
import { useRoute } from 'vue-router';
import Fuse from 'fuse.js';



const props = defineProps({
    baseData: Array
})

const route = useRoute()

const data = defineModel({ default: []});
const category = ref([])
const author = ref([])
const publisher = ref([])
const isLoading = ref(false)
const filters = ref({})

const date = ref(null);
const key = computed(() => route.query.key)

const fuseOptions = {
    // Mảng các thuộc tính bạn muốn tìm kiếm
    keys: ['title', 'category.title', 'author.fullname'],
    // Ngưỡng mờ (từ 0 đến 1, giá trị thấp hơn mang lại kết quả chính xác hơn)
    threshold: 0.3,
};

    
const searchData = computed(() => {
    const fuse = new Fuse(props.baseData, fuseOptions);
    // Nếu không có từ khóa, trả về dữ liệu ban đầu
    if (!key.value) {
        return props.baseData;
    }

    const searchResults = fuse.search(key.value);

    return searchResults.map(result => result.item);
});

const dataByDate = computed(() => {
    return searchData.value.filter((product) => {
        if(date.value){
            return date.value.some((day) =>{
                return format(product.updatedAt,"dd/MM/yyyy") === format(day, 'dd/MM/yyyy')
            })
        } 
        return true
    })
})

watch(() => ({
            ...dataByDate.value,
            ...filters.value
        }), () => {
    data.value = dataByDate.value.filter((product) => {
        return Object.keys(filters.value).every((key) => {
            if(filters.value[key].length === 0 ) return true
            return filters.value[key].some((id) => product[key]._id === id)
        })
    })
})

const resetFilter = () => {
    filters.value = {}
    date.value = null
}

const fetchData = () => {
    isLoading.value = true;
    bookService.getCategory()
        .then((res) => {
            res.forEach(e => {
                category.value.push({
                    _id: e._id,
                    label: e.title,
                })
            });

        })
        .finally(() => {
            isLoading.value = false
        })

    bookService.getAuthor()
        .then((res) => {
            res.forEach(e => {
                author.value.push({
                    _id: e._id,
                    label: e.fullname,
                })
            });

        })
        .finally(() => {
            isLoading.value = false
        })
    
    bookService.getPublisher()
        .then((res) => {
            res.forEach(e => {
                publisher.value.push({
                    _id: e._id,
                    label: e.name,
                })
            });

        })
        .finally(() => {
            isLoading.value = false
        })
}


onMounted(() => {
    initDropdowns();
    fetchData()
})
</script>

<template>
    <div class="flex items-center gap-4">
        <div class="bg-white rounded-md border border-gray-200 flex">
            <div class="grid place-items-center p-4 border-r border-gray-200">
                <i class="fa-solid fa-filter"></i>
            </div>
            <div class="px-2 border-r w-[200px] border-gray-200 text-sm font-bold flex justify-center items-center">

                <VueDatePicker v-model="date" multi-dates :enable-time-picker="false" :format-locale="vi"
                    :max-date="new Date()" format="dd/MM/yyyy" />
            </div>
            <filter-item :data="category" filter="category" v-model="filters" label="Danh mục"
                id="category-filter" />
            <filter-item :data="author" filter="author" v-model="filters" label="Tác giả"
                id="author-filter" />
            <filter-item :data="publisher" filter="publisher" v-model="filters" label="Nhà xuất bản"
                id="publisher-filter" />
        </div>
        <Button icon="fa-solid fa-rotate-right" secondary @on-click="resetFilter">
            Làm mới
        </Button>
    </div>
</template>