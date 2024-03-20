<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/SideBar.vue";
</script>

<template>
    <div class="grid grid-cols-12 gap-3 min-h-screen w-full">
        <Sidebar class="col-span-2 h-full" />
        <div class="col-span-10 h-full flex flex-col">
            <Header />
            <div class="p-6 -ml-3 bg-[#f5f6fa] flex flex-col gap-3 grow">
                <slot>
                    
                </slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
    
</style>