import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy} from './store/actions/action'
import Footer from './components/Footer'
import Header from './components/Header'
import PokeGrid from './components/PokeGrid'
import {DropdownButton, Dropdown} from 'react-bootstrap'

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
    const {limit, page, pokemons, inf} = props.state


    const handleChange=(e)=>{
        switch (e.target.value){
            case "false": 
                return props.updateValue(e.target.name, false)
            default:
                return props.updateValue(e.target.name, e.target.value)
        }
        
    }

    const handleIntChange=(e)=>{
        props.updateValue(e.target.name, parseInt(e.target.innerHTML))
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
            await props.getPokemon(limit,(page*limit)-limit)
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
              <div>
                <PokeGrid pokemons={pokemons} submit={submit} inf={inf} handleChange={handleChange} />
                <div className='bottom'>
                <DropdownButton id="dropdown-basic-button" title="Limit" name="limit" onChange={handleIntChange}>
                    <Dropdown.Item onClick={handleIntChange} name='limit' value='12' >12</Dropdown.Item>
                    <Dropdown.Item onClick={handleIntChange} name='limit' value={20}>20</Dropdown.Item>
                    <Dropdown.Item onClick={handleIntChange} name='limit' value='50'>50</Dropdown.Item>
                    <Dropdown.Item onClick={handleIntChange} name='limit' value='100'>100</Dropdown.Item>
                </DropdownButton>
                    <div>
                        {page <= 1 ? <button onClick={nextPage}>Next</button> : 
                        <div>
                            <button onClick={prevPage}>Back</button>
                            <button onClick={nextPage}>Next</button>
                        </div>
                        
                        }
                    </div>
                </div>
            </div> 
            <Footer/>
            
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)