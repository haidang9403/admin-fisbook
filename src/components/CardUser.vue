<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { initDropdowns } from 'flowbite';

const props = defineProps({
    username: String,
    fullname: String,
    email: String,
    position: Number,
    admin: Boolean,
    addition: Object,
    id: String,
    ableDelete:{
        type: Boolean,
        default: false
    }
})

const namePostition = ref(null)

switch(props.position){
    case 0: 
        namePostition.value = 'Quản lý'
        break
    case 1:
        namePostition.value = 'Nhân viên'
        break
}

onMounted( () => {
    if(props.admin){
        initDropdowns();
    }
})


</script>

<template>
    <router-link v-if="!admin" :to="'/user/' + id"
        class=" pt-10 py-6 pb-6 bg-white rounded-lg shadow flex flex-col items-center hover:bg-gray-100">
        <img class="size-[80px] rounded-full" src="/images/9720009.jpg" alt="Rounded avatar">
        <div class="mt-4 mb-2 text-center">
            <h5 class="font-bold tracking-tight text-gray-900">{{ fullname }}</h5>
            <span class="font-light text-sm text-gray-500 ">
                <i class="fa-solid fa-user mr-1 text-xs"></i>
                {{ username }}
            </span>
        </div>
        <div class="font-normal text-gray-700 dark:text-gray-400">
            {{ email }}
        </div>
    </router-link>
    <div v-else 
        class="pb-6 bg-white rounded-lg relative pt-8 shadow flex flex-col items-center cursor-default"
    >
        <div v-if="ableDelete && position != 0" class="absolute top-3 right-1 flex justify-end px-4 w-full">
            <button :id="id + '-toggle'" :data-dropdown-toggle="id"
                class="inline-block text-gray-500  hover:bg-gray-100  focus:ring-2 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5"
                type="button">
                <span class="sr-only">Open dropdown</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 16 3">
                    <path
                        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
            </button>
            <!-- Dropdown menu -->
            <div :id="id"
                class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44">
                <ul class="py-2" aria-labelledby="dropdownButton">
                    <li>
                        <button class="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Xóa</button>
                    </li>
                </ul>
            </div>
        </div>
        <img class="size-[80px] rounded-full" src="/images/9720009.jpg" alt="Rounded avatar">
        <div class="mt-4 mb-2 text-center">
            <h5 class="font-bold tracking-tight text-gray-900">{{ fullname }}</h5>
            <span class="font-light text-sm text-gray-500 ">
                {{ namePostition }}
            </span>
        </div>
        <div class="font-normal text-gray-700 ">
            <i class="fa-solid fa-user mr-1 text-xs"></i>
            {{ username }}
        </div>
        <ul v-if="addition" class="w-full pl-5 flex flex-col justify-start items-start">
            <div class="w-full px-8">
                <hr class="h-px my-4 bg-gray-200 border-0 ">
            </div>
            <li class="text-sm mb-2">
                <i class="fa-solid fa-phone-volume mr-2 size-5"></i>
                <strong>{{ addition.phone }}</strong>
            </li>
            <li class="text-sm">
                <i class="fa-solid fa-location-dot mr-2 size-5"></i>
                <strong>{{ addition.address }}</strong>
            </li>
        </ul>
    </div>


</template>