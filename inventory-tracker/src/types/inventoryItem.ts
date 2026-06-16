export interface InventoryItem {
  id?: string; // Optional because Firestore auto-generates IDs
  itemName: string;
  quantity: number;
  tags: string[];
  lastUpdated?: any; // You can use Firestore's Timestamp type here
}