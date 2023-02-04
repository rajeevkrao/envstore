import jwt from "jsonwebtoken"
import { setResStatus } from "~~/services/helpers/h3"

export default defineEventHandler(async (event) => {
    try{
        let { pass } = await readBody(event)
        if(process.env.NUXT_ADMIN_KEY!=pass){
            setResStatus(event, 401, "Unauthorized")
            return false
        }
            
        setCookie(event,'session',jwt.sign({testAdmin:1},process.env.NUXT_JWT_KEY!),{
            httpOnly:true,
            maxAge: 5 * 60 * 60 * 1000,
        })
        return true
    }
    catch(err){
        console.log(err)
    }
})