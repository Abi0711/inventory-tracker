import React, { useState, useMemo, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { InventoryItem } from '../types/inventoryItem';
import InventoryItemView from './InventoryItemView';

export const InventoryItemList: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleTagClick = (tag: string) => {
        setSearchTerm('');
        setSelectedTag(tag);
    };

    useEffect(() => {
        const q = query(collection(db, 'inventory'));
        // Real-time listener of the database
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InventoryItem[];
            setInventory(data);
        });
        return () => unsubscribe();
    }, []);

    // Filter, useMemo because its a function
    const filteredItems = useMemo(() => {
        const lowerSearch = searchTerm.trim().toLowerCase();

        if (lowerSearch) {
            return inventory.filter((item) => {
                const matchesName = item.itemName.toLowerCase().includes(lowerSearch);
                const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(lowerSearch));
                return matchesName || matchesTags;
            });
        }

        if (selectedTag) {
            return inventory.filter((item) =>
                item.tags.some(itemTag => itemTag.toLowerCase() === selectedTag.toLowerCase())
            );
        }

        return inventory;

    }, [inventory, searchTerm, selectedTag]);

    return (
        <div>
            <h2>Inventory Search</h2>
            <input
                type="text"
                placeholder="Search by name or tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
            />
            <div className="inventory-grid">
                {filteredItems.length === 0 ? (
                    <p key={"none"}>No items found matching "{searchTerm}"</p>
                ) : (
                    filteredItems.map((item) => (
                        <div className="item-view" key={item.id}>
                            <InventoryItemView inventoryItem={item} onTagClick={handleTagClick}></InventoryItemView>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};