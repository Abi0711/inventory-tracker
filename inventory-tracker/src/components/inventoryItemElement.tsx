import { InventoryItem } from "../types/inventoryItem";
import './style.css'
interface InventoryItemElementProps{
    inventoryItem: InventoryItem;
    onTagClick: (tag: string) => void;
}

function InventoryItemElement({inventoryItem, onTagClick} : InventoryItemElementProps){
    return (
        <div className="inventory-card">
            <div className="card-header">
                <h3 className="item-name">{inventoryItem.itemName}</h3>
                <span className="quantity">{inventoryItem.quantity}</span>
            </div>
            <p className="description">{inventoryItem.description}</p>
            <div className="tag-list">
                {
                    inventoryItem.tags.map((tag) => (
                        <span key={tag} className="tag" onClick={() => onTagClick(tag)} >{tag}</span>
                    ))
                }
            </div>
        </div>
    );
}

export default InventoryItemElement;