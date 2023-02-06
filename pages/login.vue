<template>
    <div class="login">
        <a-input v-model:value="text" @input="error=''" v-on:keyup.enter="login()" type="password" />
        <a-button type="primary" @click="login()">Login</a-button><br/>
        <div class="error">{{ error }}</div>
    </div>
    
</template>

<style scoped>

.error{
    /* font-size:2em; */
    color:red
}
.login{
    margin-top:30vh;
    text-align: center;
}
.login > input{
    width:90%
}
</style>

<script setup>
const login = async() => {
    let res = await useFetch('/api/login',{
        method:'POST',
        body:{
            pass:text.value
        }
    })
    let router = useRouter()
    if(res.data.value)
        router.push('/')
    else 
        error.value="Wrong Password!" 
}

const error = ref('')
const text = ref('')
</script>