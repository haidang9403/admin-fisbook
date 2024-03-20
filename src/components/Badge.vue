<script setup>


defineProps({
    label: String,
    status: String,
})

</script>

<template>
    <span 
        class="block text-center text-sm font-semibold me-2 px-2.5 py-0.5 rounded  border "
        :class="{
            'bg-red-100 text-red-800 border-red-400': status === 'danger',
            'bg-yellow-100 text-yellow-800 border-yellow-300': status ===  'warning',
            'bg-blue-100 text-blue-800 border-blue-300': status ===  'info',
            'bg-green-100 text-green-800 border-green-400': status !== 'danger' && status !== 'warning' && status !== 'info'
        }"
    >
        {{  label }}
    </span>
    
</template>