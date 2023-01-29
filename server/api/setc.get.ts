export default defineEventHandler(async (event) => {
    setCookie(event,'test','123')
    return {"Hello":"HELLO"}

})