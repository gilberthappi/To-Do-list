import { data } from './getElements.js';

class UpdateList {
  constructor(showList) {
    this.showList = showList;
  }

  updateList = (index, description) => {
    let listArr = [];
    let str = '';
    const listShow = new this.ShowList();

    const listArrStr = localStorage.getItem('list');
    listArr = JSON.parse(listArrStr);

    const updateTask = listArr.filter((item) => {
      if (item.index === index) {
        item.description = description;
      }
      return item;
    });

    localStorage.setItem('list', JSON.stringify(updateTask));

    str = '';
    data.innerHTML = str;
    listShow.showList();
  };
}

export default UpdateList;
