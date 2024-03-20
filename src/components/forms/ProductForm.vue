<script setup>
import Input from '../inputs/Input.vue';
import InputImage from '../inputs/InputImage.vue';
const getInput = (value) => {
    console.log(value);
}

</script>

<template>
    <form>
        <InputImage
            @get-Img="getInput"
        />
        <div class="grid gap-6 grid-cols-2">
            <Input
                label="Tên sách"
                id="title"
                placeholder="Nhập tên sách..."
            />
            <Input
                label="Tên sách"
                id="title"
                placeholder="Nhập tên sách..."
            />
        </div>
    </form>
</template>