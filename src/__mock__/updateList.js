import showList from './showList.js';

const updateList = (index) => {
  let listArr = [];
  const listArrStr = localStorage.getItem('list');
  listArr = JSON.parse(listArrStr);
  listArr.forEach((item) => {
    if (item.index === index) {
      item.description = "I will complete my today's task";
    }
  });
  localStorage.setItem('list', JSON.stringify(listArr));
  showList();
};

export default updateList;
