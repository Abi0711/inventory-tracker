import { InventoryItem } from '../../types/inventoryItem'
import BaseItemForm from './BaseItemForm';
import { addItem } from '../../services/taskService';

function CreateItemForm() {
  const handleCreate = async (data: Omit<InventoryItem, 'id'>) => {
    try {
      await addItem(data);
      alert('Item added successfully!');

    } catch (error) {
      // Any error from the database lands right here
      console.error("Database failed:", error);
      alert("Could not save item. Check your internet connection.");
    }
  };
  return (
    <div>
      <BaseItemForm buttonLabel="Add Item" onSubmit={handleCreate} />
    </div>
  );
};

export default CreateItemForm;