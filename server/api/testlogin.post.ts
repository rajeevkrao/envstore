import jwt from 'jsonwebtoken';
import { throwError, throwUnauthorized } from "~~/services/helpers/error";


export default defineEventHandler(async (event) => {
    try{
        let body = await readBody(event)
        let key = process.env.NUXT_ADMIN_KEY
        if(!key || body.pass!=key) throwUnauthorized()
        let token = jwt.sign({acc_type:"test"},process.env.NUXT_JWT_KEY!)
        setCookie(event, 'session', token, { secure:true, httpOnly:true})
        return "Logged in with Test Account"
    }
    catch(err:any){
        if(![403].includes(err?.code))
        console.log(err)
        // @ts-expect-error
        setResponseStatus(event, 403, "Unauthorized!")
        return 'Unauthorized'
    }
    
})