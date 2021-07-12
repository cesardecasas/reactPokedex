import React, { useEffect } from 'react'
import TextInput from './TextInput'
import {connect} from 'react-redux'
import {search, getPokemon} from './store/actions/action' 
import {getPoke} from './services/service'


const mapStateToProps =({state})=>{
    return{
        state
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        searchValue:(name,value)=>dispatch(search(name,value)),
        getPokemon:(limit, page)=>dispatch(getPokemon(limit,page))
    }
}

const Main =(props)=>{
    const {search, limit, page, pokemons} = props.state


    const handleChange=(e)=>{
        props.searchValue(e.target.name,e.target.value)
    }

    const populate= async()=>{
        try {
            props.getPokemon(limit,page)
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(()=>{
        populate()
    },[limit])

    return (
        <main>
            <div>
                <TextInput
                            placeholder='Search'
                            type='text'
                            name='search'
                            value={search}
                            onChange={handleChange}
                            className="form-control me-2"
                        />
                <button>search</button>
            </div>
            <body className='poke-grid'>
                {pokemons ? pokemons.map((poke, index)=>{
                    let n = poke.url.split('pokemon/')[1].split('/')[0]
                    console.log(n)
                    return(
                        <div key={index}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`} alt='pokemon image'/>
                            <p>{poke.name} #{n}</p>
                        </div>
                    )
                }) : <div>Loading</div>}
            </body>
            <div>
            <select onChange={handleChange} name="limit">
                <option name='limit' value="10">10</option>
                <option name='limit' value="20">20</option>
                <option name='limit' value="50">50</option>
                <option name='limit' value="100">100</option>
            </select>
            </div>
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)