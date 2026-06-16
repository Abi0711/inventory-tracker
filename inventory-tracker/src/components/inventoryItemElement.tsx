import { InventoryItem } from "../types/inventoryItem";

interface InventoryItemElementProps{
    inventoryItem: InventoryItem;
}
function InventoryItemElement({inventoryItem} : InventoryItemElementProps){
    return (
        <li key={inventoryItem.id} style={{ margin: '10px 0' }}>
            <strong>{inventoryItem.itemName}</strong> (Qty: {inventoryItem.quantity})
            <div style={{ fontSize: '0.85em', color: '#666' }}>
            Tags: {inventoryItem.tags.join(', ')}
            </div>
        </li>
    );
}

export default InventoryItemElement;