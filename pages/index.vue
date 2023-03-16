<template>
    <div>
        <!-- <Textarea v-model="a"></Textarea>
        <button @click="ab()">Test</button> -->
        <div class="header"><a-button type="primary" @click="isProjectCreateModalVisible=true">Add Project</a-button></div>
        <div class="projects">
            <a-button type="primary" size="large" class="project" v-for="project of projects" @click="goto(`/project/${project}`)">{{ project }}</a-button>
        </div>
        <a-modal v-model:visible="isProjectCreateModalVisible" @ok="createProject()" okText="Create">
            <div class="new-project-modal">
                <label>New Project Name:</label>
                <a-input  v-model:value="newProjectName"/><br/>
            </div>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
    import { message } from 'ant-design-vue';
    checkAuth();
    const router = useRouter()
    const projects = ref<Array<string>>([])
    const isProjectCreateModalVisible = ref<boolean>(false)
    const newProjectName = ref<string>('')
    const fetchProjects = async() => {
        const { data:{value} } = await useFetch('/api/project/')
        projects.value = value as unknown as Array<string>
    }
    fetchProjects()

    const goto = (url:string) => {
        router.push(url)
    }

    const createProject = async() => {
        if(!newProjectName.value) return message.error('Project Name cannot be Empty');
        const { data:{value} } = await useFetch("/api/project/create",{
            method:"POST",
            body:{
                name:newProjectName.value
            }
        })
        if(value && 'code' in value && value?.code==200){
            message.success("Project Created")
            isProjectCreateModalVisible.value =false;
            newProjectName.value = ''
            fetchProjects()
        }
    }
</script>

<style scoped>
.header{
    text-align: right;
    padding:1vh 1vw;
}
.projects{
    background-color: #cccccc;
    border-color: black;
    border-width: 10rem;
    border-radius: .3rem;
    padding:0 1vw;
    margin:1vh 1vw;
}
.project{
    margin:1vh;
}
.new-project-modal{
    margin:2vh 1vw
}
</style>
  