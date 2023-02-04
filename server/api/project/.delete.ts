import { deleteProject } from "~~/services/database/project"
import { verify } from "~~/services/helpers/auth"
import { setResStatus } from "~~/services/helpers/h3"

export default defineEventHandler(async (event) => {
    try{
        verify(event)
        const { name } = await readBody(event)
        await deleteProject(name)
        return {code:200,message:"Project Deleted"}
    }
    catch(err:any){
        if(err.code==26){
            setResStatus(event,400)
            let { code, codeName:message } = err;
            return {code,message}
        }
        console.log(err)
        setResStatus(event,401,"Unauthorized")
        return false
    }  
})