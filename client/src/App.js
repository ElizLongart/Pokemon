import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import CreatePokemon from './components/createPokemon/createPokemon';
import HomePage from './components/homePage/homePage';
import LandingPage from './components/landingPage/landingPage';
import PokemonDetail from './components/pokemonDetails/pokemonDetails';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path= '/' component={LandingPage} />
          <Route exact path= '/home' component={HomePage} />
          <Route exact path= '/pokemons' component={CreatePokemon} />
          <Route exact path= '/pokemons/:id' component={PokemonDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
