import CreateItemForm from './Forms/CreateItemForm';
import { InventoryItemList } from './InventoryItemList';

function InventoryItemDashboard() {

    return (
        <div className="inventory-dashboard">
            <header className="App-header">
                <CreateItemForm />
                <InventoryItemList />
            </header>
        </div>
    );
}

export default InventoryItemDashboard;
