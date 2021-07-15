import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy} from '../store/actions/action'
import { FiSearch} from "react-icons/fi";
import { Button, InputGroup, FormControl} from 'react-bootstrap'


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

const Header=(props)=>{

    const {search} = props.state

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

    const populateType= async(n)=>{
        try {

            props.getTyPoke(n)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{

    },[])

    return(
        <header>
            <img src='https://cdn2.bulbagarden.net/upload/4/4b/Pok%C3%A9dex_logo.png' alt='title' className='title'/>
            <div className='form'>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Pokemon's name"
                aria-label="Pokemon's name"
                aria-describedby="basic-addon2"
                name='search'
                value={search}
                onChange={handleChange}
                />
                <Button variant="outline-secondary" id="button-addon2">
                <FiSearch/>
                </Button>
            </InputGroup>
            </div>
            {/* on progress */}
            {/* <div className='filter'>
                <select onChange={handleChange} name="nType" className='select'>
                        <option value={false}>Type</option>
                        {pokeTypes.Poke.map((type,index)=><option key={index} value={type.name}>{type.name}</option>)}
                </select>
            </div> */}
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)