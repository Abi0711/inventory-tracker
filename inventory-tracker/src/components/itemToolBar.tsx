import { MdEdit, MdDelete, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useState } from "react";
import PopUp from "./PopUp";
import { InventoryItem } from "../types/inventoryItem";
import { EditItemForm } from "./EditItemForm";

interface ItemToolBarProps{
    inventoryItem: InventoryItem;
}

function ItemToolBar({inventoryItem}: ItemToolBarProps){
    const [showPopUp, setShowPopUp] = useState(false)
    return(
<div className="toolbar">
    <button className="edit-button"><Edit size={20} /></button>
    <button className="delete-button" onClick={()=>setShowPopUp(true)}><Trash2 size={20} /></button>
    <PopUp showPopUp={showPopUp} closePopUp={()=>setShowPopUp(false)}>
        <EditItemForm inventoryItem={inventoryItem}></EditItemForm>
        </PopUp>

    <div className="up-down-arrows">
         <button className="up-button"><ArrowUp size={20} /></button>
        <button className="down-button"><ArrowDown size={20} /></button>
    </div>
</div>
    );
};
export default ItemToolBar