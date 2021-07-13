import React, { useEffect } from 'react'
import TextInput from './TextInput'
import {connect} from 'react-redux'
import {search, getPokemon, getInf} from './store/actions/action' 



const mapStateToProps =({state})=>{
    return{
        state
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        searchValue:(name,value)=>dispatch(search(name,value)),
        getPokemon:(limit, page)=>dispatch(getPokemon(limit,page)),
        getInf:(n)=>dispatch(getInf(n))
    }
}

const Main =(props)=>{
    const {search, limit, page, pokemons, pokemon, inf} = props.state


    const handleChange=(e)=>{
        switch (e.target.value){
            case "false": 
                return props.searchValue(e.target.name, false)
            default:
                return props.searchValue(e.target.name, e.target.value)
        }
        
    }

    const handleIntChange=(e)=>{
        props.searchValue(e.target.name, parseInt(e.target.value))
    }

    const populate= async()=>{
        try {
            props.getPokemon(limit,page)
        } catch (error) {
            console.log(error)
        }
    }

    const nextPage=async()=>{
        try {
            props.searchValue('page',page+limit)
            await props.getPokemon(limit,page)
            console.log(page)
        } catch (error) {
            console.log(error)
        }
    }

    const submit=async(n)=>{
        try {
            await props.getInf(n)
        } catch (error) {
            console.log(error)
        }
    }

    const prevPage=async()=>{
        try {
            props.searchValue('page',page-limit)
            await props.getPokemon(limit,page)
            console.log(page)
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
                <select onChange={handleIntChange} name="limit">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <br/>
            {pokemon ? 
            <body className='detail'>
                {inf ? <div className='countour'>
                    <div className='contents'>
                        <button type="button" class="btn-float-left" name='pokemon' value={false} onClick={handleChange}>X</button>
                    </div>
                    <h3>{inf.name} #{inf.id}</h3>
                    <img  src={inf.sprites.front_default} alt='sprite'/>
                    <div className='types'>
                        {inf.types.map((type, index)=><p className='type'>{type.type.name}</p>)}
                    </div>
                    <div className='stats'>
                        {inf.stats.map((stat, index)=><p className='stat'>{stat.stat.name}: {stat.base_stat}</p>)}
                    </div>
                    <p>{inf.weight} kg</p>

                    
                    <p>Description</p>
                </div> :
                
                <p>Loading</p>}
            </body>
            
            : <div>
            <body className='poke-grid'>
                {pokemons ? pokemons.map((poke, index)=>{
                    let n = poke.url.split('pokemon/')[1].split('/')[0]
                    return(
                        <div key={index} className='poke' onClick={()=>submit(n)}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`} alt='pokemon'/>
                            <p>{poke.name} #{n}</p>
                        </div>
                    )
                }) : <div>Loading</div>}
            </body>
            <footer>
                <div>
                <select onChange={handleIntChange} name="limit">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                </div>
                <div>
                    {page <= 0 ? <button onClick={nextPage}>Next</button> : 
                    <div>
                        <button onClick={prevPage}>Back</button>
                        <button onClick={nextPage}>Next</button>
                    </div>
                    
                    }
                </div>
            </footer>
            </div> }
            
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)