// status.js
import { updateLocalStorage, refreshUI, storedData } from './index.js';

export function updateStatus(index, completed) {
  const taskIndex = storedData.findIndex((item) => item.index === index);
  if (taskIndex !== -1) {
    storedData[taskIndex].completed = completed;
    updateLocalStorage(storedData);
    refreshUI();
  }
}

export function clearCompletedTasks() {
  storedData = storedData.filter((task) => !task.completed);
  storedData.forEach((task, idx) => {
    task.index = idx + 1;
  });
  updateLocalStorage(storedData);
  refreshUI();
}
