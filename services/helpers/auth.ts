import { H3Event } from "h3";
import jwt from "jsonwebtoken"
import { throwUnauthorized } from "./error";

export const verify = (event:H3Event) => {
    try{
        let session = getCookie(event,'session')
        jwt.verify(session!,process.env.NUXT_JWT_KEY!)
        return true;
    }
    catch(err){
        throwUnauthorized()
    }
}