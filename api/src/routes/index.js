const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { getAllPokemons } = require('../routesFunctions');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers

router.post("/pokemons", async (req, res) => {
	const { name, hp, attack, defense, speed, height, weight, image, type  } =
	  req.body;
  
	try {
	  const newPokemon = await Pokemon.create({
		name,
		hp,
		attack,
		defense,
		speed,
		height,
		weight,
		image,
	  });
  
	  let typeDb = await Type.findAll({
		where: 
			{ name: type },
	  }); 
	  //vincular el tipo a la otra tabla
	  newPokemon.addType(typeDb);
  
	  console.log(newPokemon);
  
	  res.status(201).json(newPokemon);
	} catch (error) {
	  console.log(error);
	  res.status(400).send(error);
	}
  });

router.get('/pokemons', async (req, res) => {
	const name  = req.query.name
 	try {
		let allPokemones = await getAllPokemons();
		if (name) {
		const pokemon = allPokemones.filter((pokemon)=> pokemon.name.toLowerCase().includes(name.toLowerCase()))
				if (pokemon[0]) return res.json(pokemon);
				//acá buscar en la api por nombre
				return res.status(404).send("Upps!! We can't find your pokemon" + 'https://www.fatosdesconhecidos.com.br/wp-content/uploads/2019/03/6saddestpokemonmoments-21280jpg-d63e69_1280w.jpg')
	} else {			
			res.json(allPokemones);
		}
		} catch(e) {
			res.status(400).send(e);		
		} 
}); 

router.get('/types', async (req, res)=> {
 	try {
	const types = await Type.findAll({
		attributes: ['name']
		})
	
	if (types[0]) {
		return res.json(types);
	} else {
		const typeApi = await axios.get('https://pokeapi.co/api/v2/type');
		const Originaltypes= typeApi.data.results.map((type) => 
			{return { 
				name: type.name
			}});
		Type.bulkCreate(Originaltypes);
		
		return res.json(Originaltypes);
	}
	} catch(e) {
		res.status(400).send(e);
	} 
});

router.get('/pokemons/:idPokemon', async (req, res) => {
	const idPokemon = req.params.idPokemon;
	const idAllPokemon = await getAllPokemons();
	
	try {
		if(idPokemon){
			let pokemonId = await idAllPokemon.filter(p => p.id == idPokemon)
			pokemonId.length ?
			res.status(200).json(pokemonId) :
			res.status(404).send('We can not find that pokemon')
		}		
	} catch(e) {
		res.status(400).send(e);
	}
})


router.delete('/pokemons/delete/:idPokemon', async (req, res)=>{ 
	const { idPokemon } = req.params;
	try {
		const deletedPokemon = await Pokemon.findByPk(idPokemon); //obtengo sólamente la entrada del id de la db
		await deletedPokemon.destroy();

		res.send("You deleted a Pokemon. We are going to miss it!!");
		
	} catch(e) {
		res.status(400).send(e);
	}
});


module.exports = router;
