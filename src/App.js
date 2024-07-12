import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);
        console.log(response.data);
        setData(response.data);
        setName(response.data.name);
        setWeight(response.data.weight);
      } catch (err) {
        window.alert(err);
      }
    };

    fetchData();
  }, [number]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (newValue > 0 && newValue <= 898) {
      setNumber(newValue);
    } else {
      window.alert('Please enter a valid Pokémon number between 1 and 898.');
    }
  };

  return (
    <div className="App">
      <h1>Pokemon</h1>
      <input
        type="number"
        onChange={handleInputChange}
      />
      <button onClick={() => setNumber(number)}>Show</button>
      <h2>Name : {name}</h2>
      <h3>Weight : {weight}</h3>
      {data && (
        <img
          src={data.sprites?.other?.['official-artwork']?.front_default || 
                data.sprites?.front_default || 
                data.sprites?.other?.dream_world?.front_default || ''}
          alt={name}
        />
      )}
      <p>My abilities are:</p>
      {data && data.abilities.map((value, key) => (
        <div key={key}>
          {value.ability.name}
        </div>
      ))}
    </div>
  );
}

export default App;
