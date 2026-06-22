import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from "react";
import PopUp from "./PopUp/PopUp";
import { InventoryItem } from "../types/inventoryItem";
import { EditItemForm } from "./Forms/EditItemForm";

interface ItemEditToolBarProps{
    inventoryItem: InventoryItem;
}

function ItemEditToolBar({inventoryItem}: ItemEditToolBarProps){

    const [showPopUp, setShowPopUp] = useState(false)
    return(
    <div className="toolbar">
        <button className="edit-button" onClick={()=>setShowPopUp(true)}><Edit size={20} /></button>
        <PopUp showPopUp={showPopUp} closePopUp={()=>setShowPopUp(false)}>
            <EditItemForm inventoryItem={inventoryItem}></EditItemForm>
        </PopUp>
        <button className="delete-button" ><Trash2 size={20} /></button>
        <div className="up-down-arrows">
            <button className="up-button"><ArrowUp size={20} /></button>
            <button className="down-button"><ArrowDown size={20} /></button>
        </div>
    </div>
    );
};
export default ItemEditToolBar