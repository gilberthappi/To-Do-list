const completedList = (index) => {
  // Retrieve the list from local storage
  const listArr = JSON.parse(localStorage.getItem('list')) || [];

  // Loop through the list to update the completed status for items with matching index
  listArr.forEach((update) => {
    if (update.index === index) {
      update.completed = true;
    }
  });

  // Store the updated list back in local storage
  localStorage.setItem('list', JSON.stringify(listArr));
};

export default completedList;