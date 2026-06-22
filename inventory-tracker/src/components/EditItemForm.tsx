import { InventoryItem } from '../types/inventoryItem'
import { BaseItemForm } from './BaseItemForm';
import { updateItem } from '../services/taskService';
interface EditItemFormProps{
    inventoryItem: InventoryItem;
}
export const EditItemForm = ({inventoryItem} : EditItemFormProps) => {

    const handleUpdate = async (data: Omit<InventoryItem, 'id'>) => {
        if(inventoryItem.id==undefined){
            console.error("Database failed: cannot find item in database");
            alert("Could not update item. Check your internet connection.");
        }
        else{
            try {
                console.log(data);
                await updateItem(inventoryItem.id, data);
                alert('Item added successfully!');
            } catch (error) {
                console.error("Database failed:", error);
                alert("Could not update item. Check your internet connection.");
            }
        }
    };
    return <BaseItemForm initialData={inventoryItem} buttonLabel="Save Changes" onSubmit={handleUpdate} />;
};