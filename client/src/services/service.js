import Client from './api'

export const getPokes =async (limit,page)=>{
    try {
        const res = await Client.get(`pokemon?limit=${limit}&offset=${page}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getPoke =async (n)=>{
    try {
        const res = await Client.get(`pokemon/${n}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}