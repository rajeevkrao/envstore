export default defineEventHandler(async (event) => {
    let a = await readBody(event)
    console.log(a)
    return getCookie(event,'test')
})