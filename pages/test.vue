<script setup lang="ts">
import { ref } from "vue";

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


const data = ref<any>("Hello")
</script>

<template>
    {{ data.value }}
</template>