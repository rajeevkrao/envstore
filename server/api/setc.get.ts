export default defineEventHandler(async (event) => {
    setCookie(event,'test','123',{ httpOnly:true })
    return {"Hello":"HELLO"}

})