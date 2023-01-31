const throwError = (code:number, name:string="Unknown Error") => {
    let error:any = new Error(name);
    error.code = code;
    throw error
}

const throwUnauthorized = () => throwError(403,"Unauthorized")

export {
    throwError,
    throwUnauthorized
}