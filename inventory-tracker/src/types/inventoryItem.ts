export interface InventoryItem {
  id?: string; // Optional because Firestore auto-generates IDs
  itemName: string;
  description: string;
  quantity: number;
  tags: string[];
  lastUpdated?: any;
}