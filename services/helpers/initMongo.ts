import { ServerApiVersion, MongoClient } from 'mongodb'

let uri = `mongodb+srv://${process.env.NUXT_MONGO_USER}:${process.env.NUXT_MONGO_PASS}@dbase.oj0xm.mongodb.net/?retryWrites=true&w=majority`;

let cache:any = null;

//Codes till here are executed once irrespective of n(n>0) numbers of imports to this file

export const initMongoDB = async () =>{    
    if(!cache)
        cache = new MongoClient(uri, { /* useNewUrlParser: true, useUnifiedTopology: true,  */ serverApi: ServerApiVersion.v1 });
    if(!cache?.topology)
        await cache.connect()
    return cache
}