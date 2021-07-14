import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {search, getPokemon, getInf, getPokeTy} from './store/actions/action'
import pokeTypes from './types.json'
import TextInput from './TextInput'

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
            <div>
                <TextInput
                            placeholder='Search'
                            type='text'
                            name='search'
                            value={search}
                            onChange={handleChange}
                            className="text-input"
                        />
                <button className='submit'>search</button>
            </div>
            <div className='filter'>
                <select onChange={handleChange} name="nType" className='select'>
                        <option value={false}>Type</option>
                        {pokeTypes.Poke.map((type,index)=><option key={index} value={type.name}>{type.name}</option>)}
                </select>
            </div>
        </header>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)