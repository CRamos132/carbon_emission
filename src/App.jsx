import React from 'react';
import Chart from './components/Chart';
import {Provider} from 'react-redux'
import storeSaved from './stores';
import Form from './components/Form';
import './App.css'

function App() {

  
  return (
    <main>
      <Provider store={storeSaved}>
        <h1>Carbon Intensity UK</h1>
        <Chart/>
        <Form />
      </ Provider>
    </main>
  );
}

export default App;
