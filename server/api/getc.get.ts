export default defineEventHandler(async (event) => {
    return getCookie(event,'test')
})