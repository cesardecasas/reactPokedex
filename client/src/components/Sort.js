import React from 'react'
import {DropdownButton, Dropdown} from 'react-bootstrap'


const Sort =(props)=>{

    const {pokemons, orderBy} = props
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
                return props.updateValue('pokemons', a)
                case 'Pokedex #':
                    let b = pokemons.sort((a, b) => {
                        return a.url.split('pokemon/')[1].split('/')[0] - b.url.split('pokemon/')[1].split('/')[0]
                    });
                    return props.updateValue('pokemons', b)
            default:
                break;
        }
    }

    const handleOrderChange=(e)=>{
        props.updateValue('orderBy', e)
        changeOrder(e)
}

    
    return (<div className='sort'>
        <DropdownButton
            className='sort'
            variant="outline-dark"
            title={`Order by ${orderBy}`}
            id="dropdown-basic-button"
            name='searchType'
            onSelect={handleOrderChange}
            >
                <Dropdown.Item name="searchType" eventKey='Name'>Name</Dropdown.Item>
                {/* <Dropdown.Item name="searchType" eventKey='Type' >Type</Dropdown.Item> */}
                <Dropdown.Item name="searchType" eventKey='Pokedex #' >Pokedex #</Dropdown.Item>
            </DropdownButton>
            </div>
    )
}

export default Sort