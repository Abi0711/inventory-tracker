import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase'; // Path to your firebase config file
import { InventoryItem } from '../types/inventoryItem';

export const InventoryList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Reference the 'inventory' collection in Firestore
    const inventoryCollection = collection(db, 'inventory');
    
    // 2. Set up a query listener
    const q = query(inventoryCollection);
    
    // 3. Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inventoryData: InventoryItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as InventoryItem[];
      
      setItems(inventoryData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching inventory: ", error);
      setLoading(false);
    });

    // 4. Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <h2>Current Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.itemName}</strong> - Count: {item.quantity}
            <div>Tags: {item.tags.join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};