import { H3Event } from 'h3'

export const setResStatus = (event:H3Event,httpCode:number, httpMessage:string="") => {
    //@ts-ignore
    setResponseStatus(event,httpCode,httpMessage)
}