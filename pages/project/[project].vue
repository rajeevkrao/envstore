<template>
    <div>
        <div class="header">
            <a-button type="primary" @click="isEnvCreateModalVisible=true">Add Env</a-button>
        </div>
        <a-tabs class="tabs" @change="tabChange(activeKey)" v-model:activeKey="activeKey">
            <a-tab-pane v-for="envType in EnvTypes" :key="envType" :tab="envType">
                <ETextarea 
                    v-model="Envs[envType as string].envs" 
                    v-if="Envs[envType as string]">
                </ETextarea>
                <a-skeleton v-else/>
                <div class="footer">
                    <a-button type="primary" @click="save()" v-if="Envs[envType as string]">Save</a-button>
                </div>    
                
                
            </a-tab-pane>
        </a-tabs>

        <a-modal v-model:visible="isEnvCreateModalVisible" @ok="createEnv()">
            <div class="new-project-modal">
                <label>New Env Type:</label>
                <a-input v-model:value="envCreateModalTypeValue"/><br/>
            </div>
        </a-modal>
        
    </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
import { IEnvs } from '~~/models/Envs'
const route = useRoute()
const projectName = route.params.project

const Envs = ref<any>({})

const EnvTypes = ref<String[]>([])

const activeKey = ref()

const isEnvCreateModalVisible = ref<boolean>(false)
const envCreateModalTypeValue = ref<string>('')

const tabChange = async(aKey:string) => {
    if(Envs[aKey]) return
    let { data:{value:envs} } = await useFetch('/api/envs',{
        query:{
            projectName,
            type:aKey
        }
    })
    if(envs && 'env' in envs && 'type' in envs) Envs.value[envs.type as string] = {envs:envs.env}
}

const save = async() => {
    const { data:{value} } = await useFetch('/api/envs/edit',{
        method:"POST",
        body:{
            projectName,
            type:activeKey.value,
            data:Envs.value[activeKey.value].envs
        }
    })
    if(value && 'code' in value && value?.code==200){
        message.success("Env Updated Created")
    }

}

const createEnv = async() => {
    if(envCreateModalTypeValue.value=='') return message.error('Env Type cannot be Empty')
    const { data:{value} } = await useFetch('/api/envs/add',{
        method:"POST",
        body:{
            projectName,
            type:envCreateModalTypeValue.value
        }
    })
    fetchEnvTypes()
}

const fetchEnvTypes = async() => {
    const { data:{value:listTypes} } = await useFetch('/api/envs/list',{
        query:{
            projectName
        }
    })
    if(!listTypes) return message.error('Unable to Fetch Envs')
    if(Array.isArray(listTypes)){ 
        EnvTypes.value = listTypes
        activeKey.value = listTypes[0] //Load activeKey on first load also
        const { data:{value:envs } } = await useFetch('/api/envs',{
            query:{
                projectName,
                type:listTypes[0]
            }
        })
        if(envs && 'env' in envs && 'type' in envs) Envs.value[envs.type as string] = {envs:envs.env}
    }   
}
fetchEnvTypes()
</script>

<style scoped>
.header{
    text-align: right;
    padding:1vh 1vw;
}
.footer{
    text-align:right;
    padding:1vh 1vw;
}
.tabs{
    margin:0 1vh;
}
.new-project-modal{
    margin:2vh 1vw
}
</style>