import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy} from './store/actions/action'
import Footer from './components/Footer'
import Header from './components/Header'
import PokeGrid from './components/PokeGrid'
import PokeInf from './components/PokeInf'


const mapStateToProps =({state})=>{
    return{
        state
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        updateValue:(name,value)=>dispatch(search(name,value)),
        getPokemon:(limit, page)=>dispatch(getPokemon(limit,page)),
        getInf:(n)=>dispatch(getInf(n)),
        getTyPoke:(n)=>dispatch(getPokeTy(n))
    }
}

const Main =(props)=>{
    const {limit, page, pokemons, pokemon, inf} = props.state


    const handleChange=(e)=>{
        switch (e.target.value){
            case "false": 
                return props.updateValue(e.target.name, false)
            default:
                return props.updateValue(e.target.name, e.target.value)
        }
        
    }

    const handleIntChange=(e)=>{
        props.updateValue(e.target.name, parseInt(e.target.value))
    }

    const populate= async()=>{
        try {
            props.getPokemon(limit,0)
            props.updateValue('page',1)
        } catch (error) {
            console.log(error)
        }
    }

    const nextPage=async()=>{
            props.updateValue('page',page+1)
            props.getPokemon(limit,((1+page)*limit)-limit)
    }

    const prevPage=async()=>{
        try {
            props.updateValue('page', page-1)
            await props.getPokemon(limit,((1-page)*limit)-limit)
            console.log(page)
        } catch (error) {
            console.log(error)
        }
    }
    const submit=(n)=>{
            props.getInf(n)
    }
   
    useEffect(()=>{
        populate()
    },[limit])

    return (
        <main>
            <Header/> 
            <br/>
            {pokemon ? 
                <PokeInf inf={inf} handleChange={handleChange}/>
            :   <div>
                <PokeGrid pokemons={pokemons} submit={submit}/>
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
                        {page <= 1 ? <button onClick={nextPage}>Next</button> : 
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