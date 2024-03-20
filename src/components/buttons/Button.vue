<script setup>
const emit = defineEmits(['onClick'])
defineProps({
    type: String,
    icon: String,
    bgColor: String,
    textColor: String,
    fullWidth: Boolean,
    warning: Boolean,
    danger: Boolean,
    circle: Boolean,
    dataModalTarget: String,
})


</script>

<template>
    <button 
        :data-modal-target="dataModalTarget"
        @click="emit('onClick')"
        :type="type" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "
        :class="{
            'w-full': fullWidth,
            'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300' : warning,
            'bg-red-700 hover:bg-red-800 focus:ring-red-300' : danger,
            'rounded-full' : circle,
            'rounded-lg' : !circle
        }"
    >
        <i v-if="icon"
            class="mr-2"
            :class="icon"
        ></i>
        <slot></slot>
    </button>
</template>