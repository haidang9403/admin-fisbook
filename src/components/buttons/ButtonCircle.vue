<script setup>
const props = defineProps({
    dropdownId: String,
    size: String,
})

const emit = defineEmits(['onClick'])

const classSize = `size-[${props.size}]`

</script>

<template>
    <button
        @click="emit('onClick')"
        :data-dropdown-toggle="dropdownId"  
        class="size-[18px] rounded-full border border-gray-600 grid place-content-center focus:ring-4 focus:ring-gray-200"
        :class="{ [classSize] : size }"
    >
        <slot></slot>
    </button>
</template>