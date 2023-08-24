function changeStatus(event) {
  if (event.target.classList.contains('checkBox')) {
    const itemText = event.target.parentElement.querySelector('.toDoText');
    itemText.classList.toggle('checked');
    itemText.contentEditable = !event.target.checked;
    const { index } = event.target.dataset;
    const taskIndex = storedData.findIndex((item) => item.index.toString() === index);
    if (taskIndex !== -1) {
      storedData[taskIndex].completed = event.target.checked;
      updateLocalStorage(storedData);
    }
  }
}

export default changeStatus;
