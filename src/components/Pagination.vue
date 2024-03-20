<script setup>
import { computed, watch, ref, watchEffect } from 'vue';

const emit = defineEmits(['toBack', 'toNext', 'toPage'])
const props = defineProps({
    totalPage: Number,
    currentPage: Number,
    visiblePage: Number,
})


const NOT_PAGE = '...'

const visiblePageNumber = () => {
    if(props.totalPage <= props.visiblePage){
        return Array.from({length: props.totalPage}, (_,index) => index + 1);
    }

    const halfVisiblePages = Math.floor((props.visiblePage - 2) / 2);
    let startPage = props.currentPage === props.totalPage || props.totalPage - 1 === props.currentPage ? props.totalPage - props.visiblePage + 2 : Math.max(1, props.currentPage - halfVisiblePages);
    let endPage = props.currentPage === 1 || props.currentPage === 2 ? props.visiblePage - 1 : Math.min(props.totalPage, props.currentPage + halfVisiblePages);

    const visiblePages = [];

    
    if(startPage !== 1) visiblePages.push(1);

    if (startPage > 2) {
        visiblePages.push(NOT_PAGE);
    }
    
    while (startPage <= endPage) {
        visiblePages.push(startPage);
        startPage++;
    }

    if (endPage < props.totalPage && endPage + 1 !== props.totalPage) {
        visiblePages.push(NOT_PAGE);
    }
    
    if(endPage !== props.totalPage) visiblePages.push(props.totalPage);

    return visiblePages;
}

</script>

<template>
    <nav aria-label="Page navigation">
        <ul class="flex items-center -space-x-px h-8 text-sm">
            <li>
                <div
                    class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                    @click="emit('toBack')"
                >
                    <span class="sr-only">Previous</span>
                    <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                </div>
            </li>
            <li v-for="page in visiblePageNumber()">
                <div v-if="page !== currentPage && page !== NOT_PAGE"
                    class=" cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    @click="emit('toPage', page)"
                >
                    {{  page }}
                </div>
                <div v-else-if="page === currentPage"
                    aria-current="page" 
                    class="cursor-pointer z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
                    @click="emit('toPage', page)"
                >
                    {{ page }}
                </div>
                <div v-else
                    class="cursor-default flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 "
                >
                    {{  page }}
                </div>
            </li>
            <li>
                <div 
                    class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                    @click="emit('toNext')"
                >
                    <span class="sr-only">Next</span>
                    <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </div>
            </li>
        </ul>
    </nav>
</template>