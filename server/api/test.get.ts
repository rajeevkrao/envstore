import { setResStatus } from "~~/services/helpers/h3";
import { initMongoDB } from "~~/services/helpers/initMongo";

export default defineEventHandler(async (event) => {
    /* const queryParams = getQuery(event);
    console.log(queryParams)
    console.log('New request: ' + event.node.req.url)
    let client = await initMongoDB()
    console.log(await client.db('envstore').listCollections().toArray())
    return {"Hello":"HELLO"} */

    setResStatus(event,403,"Unauthorized")
    return "Unauthorized!"
})