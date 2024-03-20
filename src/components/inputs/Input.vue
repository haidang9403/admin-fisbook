<template>
    <div class="mb-6">
        <label 
            :for="id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            :class="{
                'text-red-700': errors[id]
            }"
        >
            {{ label }}
        </label>
        <input
            @focusin="emit('inFocus')" 
            v-model="model" 
            :type="type" 
            :id="id"
            :disabled="disabled"
            class="
                bg-gray-50 
                border 
                border-gray-300 
                text-gray-900 
                text-sm 
                rounded-lg 
                focus:ring-blue-500 
                focus:border-blue-500 
                block 
                w-full 
                p-2.5" 
            :class="{
                'bg-gray-100 opacity-80 cursor-not-allowed': disabled,
                'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500': errors[id]
            }"
            :placeholder="placeholder"
        />
        <p v-if="errors[id]" class="mt-2 text-sm text-red-600">{{ errors[id] }}</p>
    </div>
</template>

<script setup>

defineProps({
    label: String,
    type: String,
    id: String,
    errors: {
        type: Object,
        default(){
            return {}
        }
    },
    disabled: Boolean,
    required: Boolean,
    placeholder: String
})

const emit = defineEmits(['inFocus'])


const model = defineModel();

</script>