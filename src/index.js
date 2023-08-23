import changeStatus from './utils.js';

const storedData = JSON.parse(localStorage.getItem('storedData')) || [];

function updateLocalStorage(data) {
  localStorage.setItem('storedData', JSON.stringify(data));
}

function add(data) {
  const listItems = document.getElementById('listItems');
  const checked = data.completed;
  const item = `
    <li class="item" data-index=${data.index}>
      <input  ${checked === true ? 'checked' : ''} type="checkbox" class="checkBox" data-index=${data.index}>
      <p contenteditable class="toDoText ${checked === true ? 'checked' : ''}" data-index=${data.index}>${data.description}</p>
      <button class="deleteBtn" data-index=${data.index}><i class="far fa-trash-alt"></i></button>
    </li>
  `;
  listItems.innerHTML += item;
}

function refreshUI() {
  const listItems = document.getElementById('listItems');
  listItems.innerHTML = ''; // Clear the list
  storedData.sort((a, b) => (a.index - b.index)).forEach((data) => {
    add(data);
  });
}

// Add New Task
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const newItemInput = document.getElementById('newItem');
  const newDescription = newItemInput.value.trim();
  if (newDescription !== '') {
    const newIndex = storedData.length + 1;
    const newTask = {
      description: newDescription,
      completed: false,
      index: newIndex,
    };
    storedData.push(newTask);
    updateLocalStorage(storedData);
    refreshUI();
    newItemInput.value = '';
  }
});

// Delete Task
document.getElementById('listItems').addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    const index = parseInt(e.target.parentElement.dataset.index);
    const taskIndex = storedData.findIndex(item => item.index === index);
    if (taskIndex !== -1) {
      storedData.splice(taskIndex, 1);
      storedData.forEach((item, idx) => {
        item.index = idx + 1;
      });
      updateLocalStorage(storedData);
      refreshUI();
    }
  }
});

// Edit Task Description
document.getElementById('listItems').addEventListener('input', (e) => {
  if (e.target.classList.contains('toDoText')) {
    const index = parseInt(e.target.dataset.index);
    const newDescription = e.target.textContent.trim();
    const taskIndex = storedData.findIndex(item => item.index === index);
    if (taskIndex !== -1) {
      storedData[taskIndex].description = newDescription;
      updateLocalStorage(storedData);
    }
  }
});

// Checkbox Change
document.getElementById('listItems').addEventListener('change', changeStatus);

// Initial Load
refreshUI();
