import { initMongoDB } from "~~/services/initMongo";

export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);
    console.log(queryParams)
    console.log('New request: ' + event.node.req.url)
    let client = await initMongoDB()
    console.log(await client.db('envstore').listCollections().toArray())
    return {"Hello":"HELLO"}

})