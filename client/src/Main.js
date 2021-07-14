import React, { useEffect } from 'react'
import TextInput from './TextInput'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy} from './store/actions/action'
import pokeTypes from './types.json'
import Spinner from 'react-bootstrap/Spinner'
import CloseButton from 'react-bootstrap/CloseButton'
import Footer from './Footer'



const mapStateToProps =({state})=>{
    return{
        state
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        searchValue:(name,value)=>dispatch(search(name,value)),
        getPokemon:(limit, page)=>dispatch(getPokemon(limit,page)),
        getInf:(n)=>dispatch(getInf(n)),
        getTyPoke:(n)=>dispatch(getPokeTy(n))
    }
}

const Main =(props)=>{
    const {search, limit, page, pokemons, pokemon, inf, type, pokeType} = props.state


    const handleChange=(e)=>{
        if(e.target.name === 'nType' && e.target.value !== "false"){
            props.searchValue(e.target.name, e.target.value)
            props.searchValue("type", true)
            populateType(e.target.value)
        } else if(e.target.name === 'nType' && e.target.value === "false"){
            props.searchValue("type", false)
        }
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

    const populateType= async(n)=>{
        try {
            console.log(1)
            props.getTyPoke(n)
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
                <select onChange={handleChange} name="nType">
                    <option value={false}>Type</option>
                    {pokeTypes.Poke.map((type,index)=><option key={index} value={type.name}>{type.name}</option>)}
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
                        {inf.types.map((type, index)=><p key={index} className='type'>{type.type.name}</p>)}
                    </div>
                    <div className='stats'>
                        {inf.stats.map((stat, index)=><p key={index} className='stat'>{stat.stat.name}: {stat.base_stat}</p>)}
                    </div>
                    <p>{inf.weight} kg</p>

                    
                    <p>Description</p>
                </div> :
                
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>}
            </body>
            
            : <div>
                {type ? 
                    <body className='poke-grid'>
                    {pokeType ? pokeType.map((poke, index)=>{
                        console.log(poke)
                        let n = poke.pokemon.url.split('pokemon/')[1].split('/')[0]
                        return(
                            <div key={index} className='poke' onClick={()=>submit(n)}>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`} alt='pokemon'/>
                                <p>{poke.pokemon.name} #{n}</p>
                            </div>
                        )
                    }) : <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>}
                </body> :    

                <body className='poke-grid'>
                {pokemons ? pokemons.map((poke, index)=>{
                    let n = poke.url.split('pokemon/')[1].split('/')[0]
                    return(
                        <div key={index} className='poke' onClick={()=>submit(n)}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`} alt='pokemon'/>
                            <p>{poke.name} #{n}</p>
                        </div>
                    )
                }) : <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
            </body>
            }
                <div className='bottom'>
                    <div>
                        <select onChange={handleIntChange} name="limit">
                            <option value={12}>12</option>
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
                </div>
            </div> }
            <Footer/>
            
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)