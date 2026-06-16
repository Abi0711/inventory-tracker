import React from 'react';
import './App.css';
import { collection, addDoc } from "firebase/firestore"; 
import { InventoryActions } from './components/inventoryActions';
import { InventoryList } from './components/inventoryList';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <InventoryActions/>
        <InventoryList/>
      </header>
    </div>
  );
}

export default App;
