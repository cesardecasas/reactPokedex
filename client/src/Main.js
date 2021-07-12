import React, { useEffect } from 'react'
import TextInput from './TextInput'
import {connect} from 'react-redux'
import {search} from './store/actions/action' 


const mapStateToProps =({state})=>{
    return{
        state
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        searchValue:(name,value)=>dispatch(search(name,value)),
    }
}

const Main =(props)=>{
    console.log(props)
    const {search} = props.state


    const handleChange=(e)=>{
        props.searchValue(e.target.name,e.target.value)
    }

    useEffect(()=>{

    },[])

    return (
        <main>
            <div>
                <TextInput
                            placeholder='Search'
                            type='text'
                            name='search'
                            value={search}
                            onChange={handleChange}
                            className="form-control me-2"
                        />
                <button>search</button>
            </div>
        </main>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)