import { deleteEnvs } from "~~/services/database/env"
import { verify } from "~~/services/helpers/auth"
import { setResStatus } from "~~/services/helpers/h3"
import { isProjectExist } from "~~/services/database/project"

export default defineEventHandler(async (event) => {
    try{
        verify(event)
        const { projectName,type } = await readBody(event)
        await deleteEnvs(projectName,type)
        return {code:200,message:"Envs Deleted"}
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