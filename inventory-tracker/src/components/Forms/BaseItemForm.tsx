import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../../types/inventoryItem'

interface BaseItemFormProps {
    initialData?: InventoryItem | null;
    buttonLabel: string;
    onSubmit: (data: Omit<InventoryItem, 'id'>) => void;
}

function BaseItemForm({ initialData, buttonLabel, onSubmit }:BaseItemFormProps){
    const [name, setName] = useState(initialData ? initialData.itemName : '');
    const [qty, setQty] = useState<number>(initialData ? initialData.quantity : 0);
    const [desc, setDesc] = useState(initialData ? initialData.description || '' : '');
    const [tagInput, setTagInput] = useState(initialData ? initialData.tags.join(',') : '');

    // If user clicks a different card's Edit button
    // reset the form fields to match the newly selected item.
    useEffect(() => {
        if (initialData) {
            setName(initialData.itemName);
            setQty(initialData.quantity);
            setDesc(initialData.description || '');
            setTagInput(initialData.tags.join(','));
        } else {
            // Clear fields if mode switches back to "Create"
            setName('');
            setQty(0);
            setDesc('');
            setTagInput('');
        }
    }, [initialData]);
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        onSubmit({ itemName: name, description: desc, quantity: qty, tags: tagInput.split(/\s*,\s*/) })
    }
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
            <h3>{buttonLabel}</h3>

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

            <textarea
                placeholder="Item Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />

            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default BaseItemForm