import { db } from '../firebase';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { Task } from '../types/task';
import { InventoryItem } from '../types/inventoryItem';

// Create a new task
export const addTask = async (task: Omit<Task, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Create a new task
export const addItem = async (task: Omit<InventoryItem, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Read a single task
export const getTask = async (taskId: string): Promise<Task | null> => {
  try {
    const taskDoc = await getDoc(doc(db, "tasks", taskId));
    if (taskDoc.exists()) {
      return { id: taskDoc.id, ...taskDoc.data() } as Task;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting task:", error);
    throw error;
  }
};

// Read all tasks for a user
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