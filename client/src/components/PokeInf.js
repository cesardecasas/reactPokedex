import React from'react'
import Spinner from 'react-bootstrap/Spinner'


const PokeInf=(props)=>{

    const{inf, handleChange}=props


    return(
        <div className='detail'>
                {inf ? <div className='countour'>
                    <div className='contents'>
                        <button type="button" class="btn-float-left" name='pokemon' value={false} onClick={handleChange}>X</button>
                    </div>
                    <h3>{inf.name} #{inf.id}</h3>
                    <img  src={inf.sprites.front_default} alt='sprite'/>
                    <div className='types'>
                        {inf.types.map((type, index)=><p key={index} className='type'>{type.type.name}</p>)}
                    </div>
                    <div className='stats'>
                        {inf.stats.map((stat, index)=><p key={index} className='stat'>{stat.stat.name}: {stat.base_stat}</p>)}
                    </div>
                    <p>{inf.weight} kg</p>

                    
                    <p>Description</p>
                </div> :
                
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>}
            </div>
    )
}

export default PokeInf