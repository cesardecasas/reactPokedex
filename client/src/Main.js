import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy, saveCache} from './store/actions/action'
import Footer from './components/Footer'
import Header from './components/Header'
import PokeGrid from './components/PokeGrid'
import Filter from './components/Filter'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'
import { GrLinkPrevious, GrLinkNext} from 'react-icons/gr'
import Sort from './components/Sort'

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
    const {limit, page, pokemons, inf, pokeCache,orderBy, filterArr} = props.state

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

    const populate= ()=>{
            props.getPokemon(1118,0)
            props.updateValue('page',1)
    }

    const nextPage=()=>{
            props.updateValue('page',page+1)       
    }

    const prevPage=()=>{
            props.updateValue('page', page-1)
    }

    useEffect(()=>{
        populate()
    },[])

    const temp = [...pokemons]
    let pokeOnScreen = orderBy === "Pokedex #" ?  temp.splice(page*limit-limit, limit).sort((a, b) => a.url.split('pokemon/')[1].split('/')[0] - b.url.split('pokemon/')[1].split('/')[0]) : temp.splice(page*limit-limit, limit).sort((a, b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
    
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    })

    return (
        <main>
            <Header/> 
            <br/>
            <Filter pokeCache={pokeCache} pokemons={pokemons} updateValue={props.updateValue} />
            <Sort
            pokeOnScreen={pokeOnScreen}
            pokemons={pokemons}
            updateValue={props.updateValue}
            orderBy={orderBy}
            />
              <div>
                <PokeGrid pokeOnScreen={pokeOnScreen} page={page} updateValue={props.updateValue} filterArr={filterArr} pokemons={pokemons} inf={inf} handleChange={handleChange} saveCache={props.saveCache} pokeCache={pokeCache} limit={limit}/>
                <div className='bottom'>
                <DropdownButton id="dropdown-basic-button" title={`Limit: ${limit}`} name="limit" onChange={handleIntChange}>
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