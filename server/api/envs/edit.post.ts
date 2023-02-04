import { editEnvs } from "~~/services/database/env"
import { verify } from "~~/services/helpers/auth"
import { setResStatus } from "~~/services/helpers/h3"

export default defineEventHandler(async (event) => {
    try{
        verify(event)
        const { projectName, type, data } = await readBody(event)
        await editEnvs(projectName, type, data)
        return {code:200,message:"Envs Edited"}
    }
    catch(err:any){
        if(err.code==48){
            setResStatus(event,400)
            let { code, message } = err;
            return {code,message}
        }
        else if(err.code==11000){
            setResStatus(event,400)
            let { code } = err;
            console.log(err)
            return {code,message:"Envs of that type already exist in the Project Domain"}
        }
        console.log(err)
        setResStatus(event,401,"Unauthorized")
        return false
    }  
})