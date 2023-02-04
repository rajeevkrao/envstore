export default async() => {
    let res = await useFetch('api/auth',{
        method:"POST"
    }).catch((err:any)=>{
        {
            console.log(err)
        }
    })
    let router = useRouter()
    if(!res?.data.value)
        router.push('/login')
}
