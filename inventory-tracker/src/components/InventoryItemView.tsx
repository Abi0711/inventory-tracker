import { InventoryItem } from "../types/inventoryItem";
import ItemEditToolBar from "./ItemEditToolBar";
import './style.css'
interface InventoryItemViewProps{
    inventoryItem: InventoryItem;
    onTagClick: (tag: string) => void;
}

function InventoryItemView({inventoryItem, onTagClick} : InventoryItemViewProps){
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
            <ItemEditToolBar inventoryItem={inventoryItem}/>
        </div>
    );
}

export default InventoryItemView;