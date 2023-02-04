<script setup lang="ts">
import { ref } from "vue";
import checkAuth from "~~/composables/checkAuth";

/* axios.get('/api/getc').then((res:any)=>{
    data.value = res.data;
}) */

useFetch('/api/getc',{
    method:"POST",
    body:{
        hello:"hello"
    }
}).then((res)=>{
    data.value = res.data
})

checkAuth()


const data = ref<any>("Hello")
</script>

<template>
    {{ data.value }}
</template>