import jwt from "jsonwebtoken"
import { verify } from "~~/services/helpers/auth"
import { setResStatus } from "~~/services/helpers/h3"

export default defineEventHandler(async (event) => {
    try{
        !verify(event)
        return true;
    }
    catch(err){
        setResStatus(event,401,'Unauthorized')
        return false
    }
})
