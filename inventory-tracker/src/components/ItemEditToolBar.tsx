import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from "react";
import PopUp from "./PopUp/PopUp";
import { InventoryItem } from "../types/inventoryItem";
import { EditItemForm } from "./Forms/EditItemForm";
import { deleteItem, updateQuantity } from '../services/taskService';

interface ItemEditToolBarProps{
    inventoryItem: InventoryItem;
}

function ItemEditToolBar({inventoryItem}: ItemEditToolBarProps){
    const [showPopUp, setShowPopUp] = useState(false);

    const onDelete = async () => {
        if(!inventoryItem.id) {
            alert("Item ID not valid. Cannot delete");
            return;
        }
        try {
            await deleteItem(inventoryItem.id);
            alert('Item deleted successfully!');
            
        } catch (error) {
            console.error("Database failed:", error);
            alert("Could not deleted item. Check your internet connection.");
        }
    };
    const onQuantityChange = async (amount:number) => {
        if(!inventoryItem.id) {
            alert("Item ID not valid. Cannot delete");
            return;
        }
        try {
            await updateQuantity(inventoryItem.id, amount);           
        } catch (error) {
            console.error("Database failed:", error);
            alert("Could not deleted item. Check your internet connection.");
        }
    };

    return(
    <div className="toolbar">
        <button className="edit-button" onClick={()=>setShowPopUp(true)}><Edit size={20} /></button>
        <PopUp showPopUp={showPopUp} closePopUp={()=>setShowPopUp(false)}>
            <EditItemForm inventoryItem={inventoryItem}></EditItemForm>
        </PopUp>
        <button className="delete-button"  onClick={()=>onDelete()} ><Trash2 size={20} /></button>
        <div className="up-down-arrows">
            <button className="up-button"onClick={()=>onQuantityChange(1)}><ArrowUp size={20} /></button>
            {inventoryItem.quantity > 1 &&
                <button className="down-button" onClick={()=>onQuantityChange(-1)}><ArrowDown size={20} /></button>
            }
        </div>
    </div>
    );
};
export default ItemEditToolBar