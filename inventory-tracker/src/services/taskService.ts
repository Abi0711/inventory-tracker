import { db } from '../firebase';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where, serverTimestamp } from "firebase/firestore";
import { Task } from '../types/task';
import { InventoryItem } from '../types/inventoryItem';

// Create a new task
export const addItem = async (task: Omit<InventoryItem, 'id'>): Promise<string> => {
  const finalDocData = {
    ...task,
    lastUpdated: serverTimestamp()
  };
  // If this fails, it automatically throws the error directly to your component
  const docRef = await addDoc(collection(db, "inventory"), finalDocData);
  return docRef.id;
};

// Create a new task
export const getItem = async (task: Omit<InventoryItem, 'id'>): Promise<string> => {
  // If this fails, it automatically throws the error directly to your component
  const docRef = await addDoc(collection(db, "inventory"), task);
  return docRef.id;
};

export const updateItem = async (taskName: string, updates: Partial<InventoryItem>): Promise<void> => {
  try {
    await updateDoc(doc(db, "inventory", taskName), updates);
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Read all tasks for a user - TODO oconvert this to tags or smth
export const getUserTasks = async (userId: string): Promise<Task[]> => {
  try {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Task);
  } catch (error) {
    console.error("Error getting user tasks:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
  try {
    await updateDoc(doc(db, "tasks", taskId), updates);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};