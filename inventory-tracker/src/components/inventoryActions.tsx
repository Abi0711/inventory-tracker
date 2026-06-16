import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const InventoryActions: React.FC = () => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(0);

  // Function to ADD a brand new item
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'inventory'), {
        itemName: name,
        quantity: Number(qty),
        tags: ['New Row'], // Default tag example
        lastUpdated: serverTimestamp() // Uses Firebase server time
      });
      setName('');
      setQty(0);
      alert('Item added successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Function to UPDATE an existing item's quantity (e.g., matching a button click)
  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    try {
      // Create a reference to the specific document inside the collection
      const itemRef = doc(db, 'inventory', itemId);
      
      // Update only the quantity field
      await updateDoc(itemRef, {
        quantity: newQty,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  return (
    <form onSubmit={handleAddItem} style={{ margin: '20px 0' }}>
      <h3>Add New Stock</h3>
      <input 
        type="text" 
        placeholder="Item Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Quantity" 
        value={qty} 
        onChange={(e) => setQty(Number(e.target.value))} 
        required 
      />
      <button type="submit">Add to Database</button>
    </form>
  );
};