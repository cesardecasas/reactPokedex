import Api from './api'

export const getPokes =(limit,page)=>{
    try {
        const res = Api.get(`pokemon?limit=${limit}&offset=${page}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}