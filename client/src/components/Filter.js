import React, {useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const Filter =(props)=>{

    const {pokemons, pokeCache} = props

    const [prevState, setPrevState] = useState([])

    const filter = ()=>{
        let a = []
        if(prevState > pokemons){
            Object.values(pokeCache).forEach(val => {
                if(parseInt(val.weight) < 300 ){
                    const b = prevState.filter(poke =>poke.name === val.name)
                    a = [...a,...b]
                }
                
            })
            props.updateValue('pokemons', a)
        }
        
        Object.values(pokeCache).forEach(val => {
            if(parseInt(val.weight) > 300 ){
                const b = pokemons.filter(poke =>poke.name === val.name)
                a = [...a,...b]
            }
            
        })
        setPrevState(pokemons)
        props.updateValue('pokemons', a)
    }

    return(
        <div>
        <InputGroup className="mb-3">
            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
        </InputGroup>
        < button onClick={filter}>press me</button>
        </div>
    )
}

export default Filter