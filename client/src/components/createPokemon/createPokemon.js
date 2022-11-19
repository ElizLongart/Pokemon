import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { clearState, createPokemon, getTypes } from "../../redux/actions";
import NavBarSearch from "../NavBarSearch/navBarSearch";
import './createPokemon.css';



export default function CreatePokemon(){
    const dispatch = useDispatch();
   // const isCreated = useSelector((state) => state.addedPokemon)
    const types = useSelector((state) => state.types);
    const history = useHistory()
   
    useEffect(()=>{
        dispatch(getTypes())
        console.log("Pre renderizado", errors);
    }, []);

    const finishedForm = () => {
        setTimeout(() => dispatch(clearState()), 2000);
      };


    //controlando el formulario:
    const [errors, setErrors] = useState({ name: ''});

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height:'',
        weight: '',
        image: '',
        types: [],
    });  
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });
        setErrors(
            validateForm({
              ...input,
              [e.target.name]: e.target.value,
            })
          );
    };

    function handleSelect(e) {
      setInput({
        ...input,
        type: [...input.types, e.target.value],
      });
    }

    function handleSubmit(e){
        if (!input.name) return alert("You must complete the form");
        e.preventDefault();
        dispatch(createPokemon(input))
        alert('Successfully Created Pokemon!!')
        setInput({          //lo seteo en cero nuevamente
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height:'',
            weight: '',
            image: '',
            types: [],
        });
        history.push("/home");
    }

    
    
    return (
        <div className="allCreate">
            <NavBarSearch/>
            <div className="mainCreate">
            <Link to= '/home'>
                <button> Return </button>
            </Link>
            <form className="containerForm" onSubmit={(e)=> handleSubmit(e)}>
                <h1 className="tittleForm">Create your pokemon</h1>
                <div></div>
                <div className="form">
                    <input 
                        type='text' 
                        placeholder="Name"
                        value={input.name} 
                        name='name'
                        onChange={handleChange}
                        className='nameDanger'
                    />
                    {errors.name && <p className='errors'>{errors.name}</p>}
                    <input 
                        name="hp" 
                        id="inputHp" 
                        value={input.hp} 
                        type="number" 
                        min="1" 
                        max="120" 
                        placeholder="Health: 1 to 120"
                        onChange={handleChange}
                        className='hpDanger'
                    />
                    {errors.hp && <p className='errors'>{errors.hp}</p>}
                    <input 
                        type="number" 
                        id="inputAttack" 
                        name="attack" 
                        value={input.attack} 
                        min="1" 
                        max="190" 
                        placeholder="Attack: 1 to 190"
                        onChange={handleChange}
                        className='attackDanger'
                    />
                    {errors.attack && <p className='errors'>{errors.attack}</p>}
                    <input 
                        type="number" 
                        id="inputDefense" 
                        name="defense" 
                        value={input.defense} 
                        min="5" 
                        max="230"  
                        placeholder="Defense: 5 to 230"
                        onChange={handleChange}
                        className='defenseDanger'
                    />
                    {errors.defense && <p className='errors'>{errors.defense}</p>}
                    <input 
                        type="number" 
                        id="inputSpeed" 
                        name="speed" 
                        value={input.speed} 
                        min="58" 
                        max="140" 
                        placeholder="Speed: 58 to 140"
                        onChange={handleChange}
                        className='speedDanger'
                    />
                    {errors.speed && <p className='errors'>{errors.speed}</p>}
                    <input 
                        type="number" 
                        id="inputHeight" 
                        name="height" 
                        value={input.height} 
                        min="1" 
                        max="20" 
                        placeholder="Height: 1 to 20"
                        onChange={handleChange}
                        className='heightDanger'
                    />
                    {errors.height && <p className='errors'>{errors.height}</p>}
                    <input 
                        type="number" 
                        id="inputWeight" 
                        name="weight" 
                        value={input.weight} 
                        min="1" 
                        max="100" 
                        placeholder="Weight: 1 to 100"
                        onChange={handleChange}
                        className='weightDanger'
                    />
                    {errors.weight && <p className='errors'>{errors.weight}</p>}
                    <input 
                        type="text" 
                        id="inputImage" 
                        name="image" 
                        value={input.image} 
                        placeholder="insert Image url"
                        onChange={handleChange}
                        className='imageDanger'
                    />
                    <div>
                    <p>Choose up to 2 Pokemon types</p>
                <p className="typeForm">
                    <select
                        name="type"
                        onChange={handleChange}
                        value={input.type}
                    >
                        <option value="Type">Type</option>
                        {types.map((type)=>{
                                    return(
                                        <option value={type.id} key={type.id}>
                                            {type}
                                        </option>
                                          )
                                    })
                        }
                    </select>
                    <ul>
                        <li>{input.types.map((type) => type + " , ")}</li>
                    </ul>
                    {errors.type && <p className='errors'>{errors.type}</p>}
                </p>
                </div>
            </div>
                 <button className='btn' onClick={finishedForm}>
                    Create
                 </button>
              </form>
            </div>
        </div>
    )
}


export function validateForm(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z]+$/.test(input.name)) {
      errors.name = "Name must be plain text";
    }
    if (!input.type || input.type === "type") {
      errors.type = "Type can not be empty";
    }
    if (!input.height) {
      errors.height = "Height is required";
    } else if (!/^([1-9]\d{0,2}|1000)$/.test(input.height)) {
      errors.height = "Height must be between 1 and 20";
    }
    if (!input.weight) {
      errors.weight = "Weight is required";
    } else if (!/^([1-9]\d{0,2}|1000)$/.test(input.weight)) {
      errors.weight = "Weight must be between 1 and 100";
    }
  
    if (!input.hp) {
      errors.hp = "Hp is required";
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(input.hp)) {
      errors.hp = "Hp must be between 1 and 20";
    }
    if (!input.attack) {
      errors.attack = "Attack is required";
    } else if (
      !/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(input.attack)
    ) {
      errors.attack = "Attack must be between 1 and 190";
    }
    if (!input.defense) {
      errors.defense = "Defense is required";
    } else if (
      !/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(input.defense)
    ) {
      errors.defense = "Defense must be between 5 and 230";
    }
    if (!input.speed) {
      errors.speed = "Speed is required";
    } else if (
      !/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(input.speed)
    ) {
      errors.speed = "Speed must be between 58 and 140";
    }
  
    return errors;
  }