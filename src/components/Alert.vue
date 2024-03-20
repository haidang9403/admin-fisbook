<script setup>
import { FwbAlert } from 'flowbite-vue'
defineProps({
    showAlert: Boolean,
    alertType: {
        type: String,
        default: 'info'
    },
    alertMessage: String,
})

</script>


<template>
    <Transition name="slide-fade">
        <fwb-alert v-if="showAlert" icon :type="alertType" class="fixed left-1/2 -translate-x-1/2 z-10 top-2 shadow-md">
          {{ alertMessage }}
        </fwb-alert>
    </Transition>
</template>

<style scoped>
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }
</style>