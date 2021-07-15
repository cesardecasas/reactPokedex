import React from'react'


const PokeInf=(props)=>{

    const{inf}=props

    return(
        <div className='detail'>
             <div className='countour'>
                    <div className='types'>
                        {inf.types.map((type, index)=><p key={index} className='type'>{type.type.name}</p>)}
                    </div>
                    <div className='stats'>
                        {inf.stats.map((stat, index)=><p key={index} className='stat'>{stat.stat.name}: {stat.base_stat}</p>)}
                    </div>
                    <p>{inf.weight} kg</p>
                </div> 
            </div>
    )
}

export default PokeInf