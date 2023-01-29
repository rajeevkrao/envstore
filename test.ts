/* 
import { encrypt, decrypt } from './services/crypto'

let data = `SOME_KEY=123123
HELLO=123123
AA=123133`

let edata = encrypt(data)

console.log(edata)

console.log(decrypt(edata))
 */

import * as dotenv from 'dotenv'
dotenv.config()
import { initMongoDB } from "./services/initMongo";

(async()=>{
    let client = await initMongoDB()
    console.log(await client.db('envstore').listCollections().toArray())
})()




