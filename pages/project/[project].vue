<template>
    <div>
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
    import { message } from 'ant-design-vue';
import { IEnvs } from '~~/models/Envs'
    const route = useRoute()
    console.log(route.params.project)

    const Envs = ref<any>()

    const EnvTypes = ref<any>()

    const activeKey = ref()

    const fetchEnvs = async() => {
        const { data:{value:listTypes},error } = await useFetch('/api/envs/list',{
            query:{
                projectName:route.params.project
            }
        })
        if(!listTypes) return message.error('Unable to Fetch Envs')
        if(Array.isArray(listTypes))
        for(let type of listTypes){
            Envs.value[type] = {}
        }
        
;

        
    }
</script>