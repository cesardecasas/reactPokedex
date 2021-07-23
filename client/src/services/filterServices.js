export const Sorting = (a, b, orderBy)=>{
    if(orderBy === 'Pokedex #'){
        if(a.pokemon){
            return a.pokemon.url.split('pokemon/')[1].split('/')[0] - b.pokemon.url.split('pokemon/')[1].split('/')[0]
        }
        if(a.url.includes('species')){
            return a.url.split('species/')[1].split('/')[0] - b.url.split('species/')[1].split('/')[0]
        }
        return a.url.split('pokemon/')[1].split('/')[0] - b.url.split('pokemon/')[1].split('/')[0]
    }else if(orderBy === 'Name'){
        let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
    }
}

export const Filtering = (poke, filter, pokeCache)=>{
    const num = poke.url.split('pokemon/')[1].split('/')[0]
    

        if(filter.weight[0] || filter.type[0] || filter.height[0]){
            
            if(filter.weight[0]){
                
                let pokeWeight = pokeCache[`${num}`].weight
                filter.weight.forEach(weight =>{ 
                    console.log('yes', weight)
                    if(weight === 'light' && pokeWeight <= 100 ){
                        console.log('true')
                        return true
                    }
                    if(weight === 'medium' && pokeWeight > 100 && pokeWeight < 300){
                        return true
                    }
                    if(weight === 'heavy' && pokeWeight >= 300){
                        return true
                    }
                })
            }
            if(filter.type[0]){
                filter.type.forEach(type=>{
                   
                    pokeCache[`${num}`].types.forEach(pokeType=>{
                        if(pokeType.type.name === type){
                            return true
                        }
                    })
                })
            }
            if(filter.height[0]){

            }
                return false
            
        }else{
            return true
        }
}