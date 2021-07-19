import Client from './api'

export const getPokes =async (limit,page)=>{
    try {
        const res = await Client.get(`pokemon?limit=${limit}&offset=${page}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getPoke =async(n)=>{
    try {
        const res = await Client.get(`pokemon/${n}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getPokeType =async(n)=>{
    try {
        const res = await Client.get(`type/${n}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getSearched=async(searchType, searchValue)=>{
    try {
        let type =searchType.toLowerCase()
        console.log(searchType)
        switch(searchType){
            case 'Habitat':
                const res = await Client.get(`pokemon-habitat/${searchValue}`)
                return res.data
            case 'Name':
                const response = await Client.get(`pokemon/${searchValue}`)
                return response.data
            default:
                const resp = await Client.get(`${type}/${searchValue}`)
                return resp.data
        }
    } catch (error) {
        console.log(error)
    }
}