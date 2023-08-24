import { updateStatus, clearCompletedTasks } from './status.js';

const listItems = document.getElementById('listItems');
const newItemInput = document.getElementById('newItem');
const clearCompletedBtn = document.getElementById('clearCompleted');

const storedData = JSON.parse(localStorage.getItem('storedData')) || [];

function updateLocalStorage(data) {
  localStorage.setItem('storedData', JSON.stringify(data));
}

function add(data) {
  const item = `
    <li class="item" data-index=${data.index}>
      <input ${data.completed ? 'checked' : ''} type="checkbox" class="checkBox" data-index=${data.index}>
      <p contenteditable class="toDoText ${data.completed ? 'checked' : ''}" data-index=${data.index}>${data.description}</p>
      <button class="deleteBtn" data-index=${data.index}><i class="far fa-trash-alt"></i></button>
    </li>
  `;
  listItems.innerHTML += item;
}

function refreshUI() {
  listItems.innerHTML = ''; // Clear the list
  storedData.sort((a, b) => a.index - b.index).forEach((data) => {
    add(data);
  });
}
export { updateLocalStorage, refreshUI, storedData };
function addTask(description) {
  const newIndex = storedData.length + 1;
  const newTask = {
    description,
    completed: false,
    index: newIndex,
  };
  storedData.push(newTask);
  updateLocalStorage(storedData);
  refreshUI();
}

function deleteTask(index) {
  const taskIndex = storedData.findIndex((item) => item.index === index);
  if (taskIndex !== -1) {
    storedData.splice(taskIndex, 1);
    storedData.forEach((item, idx) => {
      item.index = idx + 1;
    });
    updateLocalStorage(storedData);
    refreshUI();
  }
}

function editTask(index, newDescription) {
  const taskIndex = storedData.findIndex((item) => item.index === index);
  if (taskIndex !== -1) {
    storedData[taskIndex].description = newDescription;
    updateLocalStorage(storedData);
  }
}

// Add New Task
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const newDescription = newItemInput.value.trim();
  if (newDescription !== '') {
    addTask(newDescription);
    newItemInput.value = '';
  }
});

// Delete Task
listItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    const index = parseInt(e.target.dataset.index, 10);
    deleteTask(index);
  }
});

// Edit Task Description
listItems.addEventListener('input', (e) => {
  if (e.target.classList.contains('toDoText')) {
    const index = parseInt(e.target.dataset.index, 10);
    const newDescription = e.target.textContent.trim();
    editTask(index, newDescription);
  }
});

// Checkbox Change
listItems.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkBox')) {
    const index = parseInt(e.target.dataset.index, 10);
    const completed = e.target.checked;
    updateStatus(index, completed);
  }
});

// Clear All Completed Tasks
clearCompletedBtn.addEventListener('click', () => {
  clearCompletedTasks();
});

// Initial Load
refreshUI();
