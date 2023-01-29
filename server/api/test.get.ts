export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);
    console.log(queryParams)
    console.log('New request: ' + event.node.req.url)
    return {"Hello":"HELLO"}
})