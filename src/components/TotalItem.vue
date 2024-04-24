<script setup>
defineProps({
    label: String,
    value: String | Number,
    icon: String,
    prefix: String
})

</script>

<template>
    <div class="rounded-xl max-w-[315px] shadow bg-white relative min-h-[160px] p-5">
        <h4 class="text-[#202224] text-lg font-bold">{{ label }}</h4>
        <div class="py-4 font-extrabold text-4xl text-[#202224]">{{ value?.toLocaleString('vi-VN') + (prefix || '')}}</div>
        <div class="absolute top-5 right-5 size-[70px] grid place-items-center bg-slate-700 rounded-3xl">
            <span class="text-2xl text-white">
                <i :class="icon"
                ></i>
            </span>
        </div>
    </div>
</template>