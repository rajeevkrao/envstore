import { initMongoDB } from "../helpers/initMongo";
import { throwError } from "../helpers/error";
import { encrypt, decrypt } from "../helpers/crypto";
import { isProjectExist } from "./project";

const db = 'envstore'

export const addEnvs = async(projectName:string, type:string, data:string="") => {
    if(!await isProjectExist(projectName)) throwError(48, "NamespaceNotFound")
    let client = await initMongoDB()
    const cipher = encrypt(data)
    await client.db(db).collection(projectName).insertOne({type, cipher})
}

export const editEnvs = async(projectName:string, type:string, data:string) => {
    if(!await isProjectExist(projectName)) throwError(48, "NamespaceNotFound")
    let client = await initMongoDB()
    const cipher = encrypt(data)
    await client.db(db).collection(projectName).updateOne({type:{$eq:type}},{$set:{type, cipher}},{upsert:true})
}

export const deleteEnvs = async(projectName:string, type:string) => {
    let client = await initMongoDB()
    await client.db(db).collection(projectName).findOneAndDelete({type:{$eq:type}})
}

export const listEnvs = async(projectName:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).collection(projectName).find({}).toArray()
    return res.map((doc:any)=>{
        return doc.type
    })   
}

export const getEnvs = async(projectName:string, type:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).collection(projectName).findOne({type:{$eq:type}})
    if(res){
        res.env = decrypt(res.cipher)
        delete res.cipher
    }   
    return res
}