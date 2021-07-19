import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy} from '../store/actions/action'
import { FiSearch} from "react-icons/fi";
import { Button, InputGroup, FormControl, Dropdown, DropdownButton} from 'react-bootstrap'
import { getSearched} from '../services/service'
import Alert from 'react-bootstrap/Alert'


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

const Header=(props)=>{

    const {search, searchType} = props.state

    const [error, setError] = useState(false)

    const handleTypeChange=(e)=>{
        if(e.charAt(0) === e.charAt(0).toUpperCase()){
            props.updateValue('searchType', e)
            return
        }
    }
    
    const handleChange=(e)=>{
        props.updateValue(e.target.name, e.target.value)
    }


    const submit=async()=>{
        try {
            const pokes = await getSearched(searchType,search.toLowerCase())
            console.log(pokes)
            setError(false)
            if(pokes.pokemon){
                props.updateValue('pokemons', pokes.pokemon)
                return
            }else if(pokes.pokemon_species){
                props.updateValue('pokemons', pokes.pokemon_species)
                return
            }
        } catch (error) {
            setError(!error)
            console.log(error)
        }
        
    }


    useEffect(()=>{

    },[])

    return(
        <header>
            <img src='https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png' alt='title' className='title'/>
            {error ? <Alert>Something went wrong with your search, make sure the spelling is correct and try again</Alert> : <p></p>}
            <div className='form'>
            <InputGroup className="mb-3">
            <DropdownButton
            variant="outline-dark"
            title="Search by"
            id="dropdown-basic-button"
            name='searchType'
            onSelect={handleTypeChange}
            >
                <Dropdown.Item name="searchType" eventKey='Name'>Name</Dropdown.Item>
                <Dropdown.Item name="searchType" eventKey='Type' >Type</Dropdown.Item>
                <Dropdown.Item name="searchType" eventKey='Ability' >Ability</Dropdown.Item>
                <Dropdown.Item name="searchType" eventKey='Habitat' >Habitat</Dropdown.Item>
            </DropdownButton>
                <FormControl
                placeholder={`Pokemon's ${searchType}`}
                aria-label={`Pokemon's ${searchType}`}
                aria-describedby="basic-addon2"
                name='search'
                value={search}
                onChange={handleChange}
                />
                <Button variant="outline-dark" id="button-addon2" onClick={()=>submit(searchType)}>
                <FiSearch/>
                </Button>
            </InputGroup>
            </div>
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)