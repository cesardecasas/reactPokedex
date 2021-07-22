import React from 'react'
import Form from 'react-bootstrap/Form'
import Types from '../types.json'

const Filter =(props)=>{

    const {filters} = props

        const applyFilter=(e)=>{
            if(e.target.value === 'weight'){
                if(!filters.weight.includes(e.target.id)){
                    filters.weight.push(e.target.id)
                    console.log(filters)
                    props.updateValue('filter', filters)
                }else{
                    filters.weight.splice(filters.weight.indexOf(e.target.id), 1)
                    console.log(filters)
                    props.updateValue('filter', {
                        weight:[],
                        type:[],
                        height:[]
                    })
                }
            }else{
                if(!filters.type.includes(e.target.id)){
                    filters.type.push(e.target.id)
                    console.log(filters)
                    props.updateValue('filter', filters)
                }else{
                    filters.type.splice(filters.type.indexOf(e.target.id), 1)
                    console.log(filters)
                    props.updateValue('filter', {
                        weight:[],
                        type:[],
                        height:[]
                    })
                }
            }
        }

    return(
        <aside className='filters'>
            <Form>

                {Types.Poke.map((poke,index)=>{
                    let type = poke.name.charAt(0).toUpperCase()+poke.name.slice(1)
                return <Form.Check 
                    type='checkbox'
                    id={`${poke.name}`}
                    label={`${type}`}
                    onChange={(e)=>applyFilter(e)}
                    key={index}
                />})}
                    <Form.Check
                    type='checkbox'
                    id={`heavy`}
                    label={`heavy weight`}
                    value='weight'
                    onChange={(e)=>applyFilter(e)}
                    />
                    <Form.Check
                    type='checkbox'
                    id={`medium`}
                    label={`medium weight`}
                    value='weight'
                    onChange={(e)=>applyFilter(e)}
                    />
                    <Form.Check
                    type='checkbox'
                    id={`light`}
                    label={`light weight`}
                    value='weight'
                    onChange={(e)=>applyFilter(e)}
                    />
            </Form>
        </aside>

    )
}

export default Filter