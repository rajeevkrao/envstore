import { getEnvs } from "~~/services/database/env"
import { verify } from "~~/services/helpers/auth"
import { setResStatus } from "~~/services/helpers/h3"

export default defineEventHandler(async (event) => {
    try{
        verify(event)
        const { projectName, type } = getQuery(event)
        let res = await getEnvs(projectName as string, type as string)
        return res
        res.cipher
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