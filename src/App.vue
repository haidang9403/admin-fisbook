<script setup>

import { computed, provide } from 'vue';
import { FwbAlert } from 'flowbite-vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();

const layout = computed(()=>
  route.meta.layout || DefaultLayout
)
</script>

<template> 
  <component :is="layout">
    <router-view/>
  </component>
</template>

<style scoped>
</style>
