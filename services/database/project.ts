import { initMongoDB } from "../helpers/initMongo";
import { throwError } from "../helpers/error";

let db = 'envstore'

const createProject = async (name:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).createCollection(name)
    if(res?.s?.namespace?.collection != name) 
    throwError(50,"Project Not Created")
}

const deleteProject = async (name:string) => {
    let client = await initMongoDB()
    let res = await client.db(db).dropCollection(name)
    if(!res) throwError(30,"Project Not Deleted")
}

export { createProject, deleteProject };