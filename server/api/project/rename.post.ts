import { renameProject } from "~~/services/database/project"
import { verify } from "~~/services/helpers/auth"
import { setResStatus } from "~~/services/helpers/h3"

export default defineEventHandler(async (event) => {
    try{
        verify(event)
        const { oldName, newName } = await readBody(event)
        await renameProject(oldName,newName)
        return {code:200,message:"Project Renamed"}
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