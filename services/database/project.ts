import { initMongoDB } from "../helpers/initMongo";
import { throwError } from "../helpers/error";

const db = 'envstore'

export const listProjects = async() => {
    let client = await initMongoDB()
    let res = await client.db(db).listCollections().toArray()
    res = res.filter((collection:any)=>{
        if(!collection.name.startsWith("__")) return true
    })
    res = res.map((collection:any)=>{
        const { name } = collection
        return name
    })
    return res
}

export const isProjectExist = async(name:string) => {
    let client = await initMongoDB()
    return (await client.db(db).collection(name).stats()).storageSize != 0
}

export const renameProject = async (oldName:string, newName:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).collection(oldName).rename(newName)
    if(!res) throwError(70,"Project Not Renamed")
}

export const createProject = async (name:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).createCollection(name)
    await client.db(db).collection(name).createIndex({type:1},{unique:true})
    if(!res) throwError(50,"Project Not Created")
}

export const deleteProject = async (name:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).dropCollection(name)
    if(!res) throwError(30,"Project Not Deleted")
}