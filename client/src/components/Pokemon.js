import React from 'react'



const Pokemon =(props)=>{
    const{poke, index, n, submit}=props

    return(
        <div key={index} className='poke' onClick={()=>submit(n)}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${n}.png`} alt='pokemon'/>
            <p>{poke.name} #{n}</p>
        </div>
    )
}

export default Pokemon