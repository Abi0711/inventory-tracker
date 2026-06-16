import React from 'react';
import './App.css';
import { collection, addDoc } from "firebase/firestore"; 
import { InventoryActions } from './components/inventoryActions';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <InventoryActions></InventoryActions>
      </header>
    </div>
  );
}

export default App;
