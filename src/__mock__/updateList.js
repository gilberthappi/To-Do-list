import showList from './showList.js';

const updateList = (index) => {
  let listArr = [];
  const listArrStr = localStorage.getItem('list');
  listArr = JSON.parse(listArrStr);
  const updatedList = listArr.map((item) => {
    if (item.index === index) {
      item.description = "I will complete my today's task";
    }
    return item;
  });
  localStorage.setItem('list', JSON.stringify(updatedList));
  showList();
};

export default updateList;
