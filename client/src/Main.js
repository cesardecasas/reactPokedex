import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy, saveCache} from './store/actions/action'
import Footer from './components/Footer'
import Header from './components/Header'
import PokeGrid from './components/PokeGrid'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'
import { GrLinkPrevious, GrLinkNext} from 'react-icons/gr'

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
        getTyPoke:(n)=>dispatch(getPokeTy(n)),
        saveCache:(num, obj)=>dispatch(saveCache(num, obj))
    }
}

const Main =(props)=>{
    const {limit, page, pokemons, inf, pokeCache, render, orderBy} = props.state


    const handleChange=(e)=>{
        switch (e.target.value){
            case "false": 
                return props.updateValue(e.target.name, false)
            default:
                return props.updateValue(e.target.name, e.target.value)
        }
        
    }

    const handleOrderChange=(e)=>{
            props.updateValue('orderBy', e)
            changeOrder(e)
    }

    const handleIntChange=(e)=>{
        props.updateValue(e.target.name, parseInt(e.target.innerHTML))
    }

    const changeOrder = (e)=>{
        switch (e) {
            case 'Name':
                let a = pokemons.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                console.log(a)
                return props.updateValue('pokemons', a)
                case 'Pokedex #':
                    let b = pokemons.sort((a, b) => {
                        return a.url.split('pokemon/')[1].split('/')[0] - b.url.split('pokemon/')[1].split('/')[0]
                    });
                    console.log(b)
                    return props.updateValue('pokemons', b)
            default:
                break;
        }
    }

    const populate= ()=>{
            props.getPokemon(limit,0)
            props.updateValue('page',1)
    }

    const nextPage=()=>{
            props.updateValue('page',page+1)
            props.getPokemon(limit,((1+page)*limit)-limit)
    }

    const prevPage=()=>{
            props.updateValue('page', page-1)
            props.getPokemon(limit,(page*limit)-limit)
            console.log(page)
        
    }

    

    useEffect(()=>{
        populate()
    },[limit])

    return (
        <main>
            <Header/> 
            <br/>
            <DropdownButton
            variant="outline-dark"
            title={`Order by ${orderBy}`}
            id="dropdown-basic-button"
            name='searchType'
            onSelect={handleOrderChange}
            >
                <Dropdown.Item name="searchType" eventKey='Name'>Name</Dropdown.Item>
                <Dropdown.Item name="searchType" eventKey='Type' >Type</Dropdown.Item>
                <Dropdown.Item name="searchType" eventKey='Pokedex #' >Pokedex #</Dropdown.Item>
            </DropdownButton>
              <div>
                <PokeGrid pokemons={!render ? render : pokemons} inf={inf} handleChange={handleChange} saveCache={props.saveCache} pokeCache={pokeCache} />
                <div className='bottom'>
                <DropdownButton id="dropdown-basic-button" title="Limit" name="limit" onChange={handleIntChange}>
                    <Dropdown.Item onClick={handleIntChange} name='limit'>12</Dropdown.Item>
                    <Dropdown.Item onClick={handleIntChange} name='limit'>20</Dropdown.Item>
                    <Dropdown.Item onClick={handleIntChange} name='limit'>50</Dropdown.Item>
                    <Dropdown.Item onClick={handleIntChange} name='limit'>100</Dropdown.Item>
                </DropdownButton>
                    <div>
                        <br/>
                        {page <= 1 ?  <Button variant="outline-dark" onClick={nextPage} ><GrLinkNext/> </Button> : 
                        <div>
                            <Button variant="outline-dark" onClick={prevPage} ><GrLinkPrevious/></Button>
                            <Button variant="outline-dark" onClick={nextPage} ><GrLinkNext/></Button>
                        </div>
                        
                        }
                    </div>
                    <br/>
                </div>
            </div> 
            <Footer/>
            
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)