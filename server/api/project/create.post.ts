import { createProject } from "~~/services/database/project"

export default defineEventHandler(async (event) => {
    
    return getCookie(event,'test')
})