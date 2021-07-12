import Axios from 'axios'

const Client = Axios.create({baseURL:'https://pokeapi.co/api/v2/'})

export default Client