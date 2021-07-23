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
import { Sorting, Filtering } from './services/filterServices'
import { getPoke} from './services/service'

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
    const {limit, page, pokemons, pokeCache,orderBy, filter} = props.state

    const handleChange=(e)=>{
        props.updateValue(e.target.name, e.target.value)
        
    }

    const handleIntChange=(e)=>{
        props.updateValue(e.target.name, parseInt(e.target.innerHTML))
    }

    const populate=async()=>{
            await props.getPokemon(1118,0)
            
    }

    const getCache = ()=>{
        pokemons.forEach(async(poke) =>{
            const n = poke.url.split('pokemon/')[1].split('/')[0]
            const inf = await getPoke(n)
            props.saveCache(n, inf)
        }) 
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

    let pokeOnScreen =  pokemons.sort((a, b) => Sorting(a,b,orderBy) ).filter(poke=> true).splice(page*limit-limit, limit)
    
    const filters={
        weight:[],
        type:[],
        height:[]
    }

    return (
        <main>
            <Header/> 
            <br/>
            <Sort
            pokeOnScreen={pokeOnScreen}
            pokemons={pokemons}
            updateValue={props.updateValue}
            orderBy={orderBy}
            />

            <div>
            <div className='divider'>
              {/* <Filter filters={filters} updateValue={props.updateValue} /> */}
              <PokeGrid pokeCache={pokeCache} pokeOnScreen={pokeOnScreen} updateValue={props.updateValue} handleChange={handleChange} saveCache={props.saveCache} />
            </div>
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