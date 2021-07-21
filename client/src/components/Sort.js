import React from 'react'
import {DropdownButton, Dropdown} from 'react-bootstrap'


const Sort =(props)=>{

    const {orderBy} = props

    const handleOrderChange=(e)=>{
        props.updateValue('orderBy', e)
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
                <Dropdown.Item name="searchType" eventKey='Pokedex #' >Pokedex #</Dropdown.Item>
            </DropdownButton>
            </div>
    )
}

export default Sort