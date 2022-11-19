import { ALPHABETICAL_ORDER, CLEAR_POKEMON_BY_ID, CLEAR_STATE, CREATE_POKEMON, FILTER_BY_STORAGE, FILTER_BY_TYPE, GET_ALL_POKEMONS, GET_NAME_POKEMONS, GET_POKEMON_DETAIL, GET_TYPES, SORT_BY_ATTACK } from "../actions/actionsType";


export const initialState={
    allPokemons: [],
    pokemons: [],
    types: [],
    pokemonById: [],
    addedPokemon: false,
    filteredPokemons: [],
}

export default function rootReducer (state = initialState, action){
    switch (action.type) {
            case GET_ALL_POKEMONS:
                return {
                    ...state,
                    pokemons: action.payload, //mandame todo lo que te da get_all_pokemon
                    allPokemons: action.payload
                };

            case GET_TYPES:
                const pokemonTypes = action.payload.map((type)=> type.name);
                return {
                    ...state,
                    types: pokemonTypes
                };    

            case FILTER_BY_TYPE:
                const filteredByType = state.allPokemons.filter(pokemon=>{
                    for(let type of pokemon.types){
                        if (type.name === action.payload)
                        return true
                    }
                    return false;
                });
                return {
                    ...state,
                    pokemons: filteredByType
                };

            case FILTER_BY_STORAGE:
                const allPokemons2 = state.allPokemons
                const filteredByStorage = action.payload === 'New' ?
                    allPokemons2.filter(pokemon => pokemon.createdInDb) :
                    allPokemons2.filter(pokemon => !pokemon.createdInDb)
                    return {
                        ...state,
                        pokemons: action.payload === 'All' ? allPokemons2 : filteredByStorage
                    };

            case ALPHABETICAL_ORDER: 
                const sortAlphabetic = action.payload === 'Asc' ?
                    state.pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        } else if (a.name < b.name){
                            return -1
                        } else {
                            return 0;
                        }
                    }) :
                    state.pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        } else if (a.name < b.name){
                            return 1
                        } else {
                            return 0;
                        }
                    })
                    return {
                        ...state,
                        pokemons: sortAlphabetic
                    };

            case SORT_BY_ATTACK:
                const sortAttack = action.payload === 'Highest' ?
                state.pokemons.sort(function (a, b){
                    if (a.attack > b.attack) {
                        return 1
                    } else if (a.attack < b.attack){
                        return -1
                    } else {
                        return 0
                    }
                }) :
                state.pokemons.sort(function (a, b){
                    if (a.attack > b.attack) {
                        return -1
                    } else if (a.attack < b.attack){
                        return 1
                    } else {
                        return 0
                    }
                })
                return {
                    ...state, 
                pokemons : sortAttack
                };
            
            case GET_NAME_POKEMONS:
                return {
                    ...state,
                    pokemons: action.payload
                };
            
            case CREATE_POKEMON:
                return {
                    ...state,
                };

            case GET_POKEMON_DETAIL:
                return {
                    ...state, 
                    pokemonById: action.payload,
                };

            case CLEAR_STATE:
                return{
                    ...state,
                    filteredPokemons: state.allPokemons,
                    addedPokemon: false,
                };
            
            case CLEAR_POKEMON_BY_ID:
                return{
                    ...state,
                    pokemonById:[],
                }
        default:
            return state;
    }
}