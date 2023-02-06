<template>
    <a-textarea v-model:value="value" placeholder="Enter Envs..." v-on:keyup="updateValue()" :autoSize="{ minRows: 10, maxRows: 30 }"></a-textarea>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue:string
    }>()

    const emit = defineEmits(['update:modelValue','onUpdate:modelValue'])
    
    /* console.log(props.modelValue) */


    function updateValue() {
        emit('update:modelValue', value.value)
    }

    const value = ref<string>(props.modelValue)
</script>

<style scoped>
    textarea{
        width:100%;
        height:50vh;
    }
</style>