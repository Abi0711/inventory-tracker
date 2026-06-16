import React, { useState, useMemo, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { InventoryItem } from '../types/inventoryItem';
import InventoryItemElement from './inventoryItemElement';

export const InventoryList: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InventoryItem[];
      setInventory(data);
    });
    return () => unsubscribe();
  }, []);

  // Filter, useMemo because
  const filteredItems = useMemo(() => {
    // If search bar is blank, just show the whole inventory
    if (!searchTerm.trim()) return inventory;

    const lowerSearch = searchTerm.toLowerCase();

    return inventory.filter((item) => {
      // Check equivalent item name
      const matchesName = item.itemName.toLowerCase().includes(lowerSearch);
      //Check if any tags are equivalent
      const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(lowerSearch));

      // Return true if either the name or a tag matches!
      return matchesName || matchesTags;
    });
  }, [inventory, searchTerm]); // Only recalculate when the data or search box changes

  return (
    <div style={{ padding: '20px' }}>
      <h2>Inventory Search</h2>
      
      {/* 4. The Search Bar Input */}
      <input
        type="text"
        placeholder="Search by name or tag..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />

      {/* 5. Render the FILTERED list, not the master inventory */}
      <ul>
        {filteredItems.length === 0 ? (
          <p>No items found matching "{searchTerm}"</p>
        ) : (
          filteredItems.map((item) => (
            <InventoryItemElement inventoryItem={item}></InventoryItemElement>
          ))
        )}
      </ul>
    </div>
  );
};