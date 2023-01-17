const saveData = (addProducts) => {
  localStorage.setItem("dataProducts", JSON.stringify(addProducts));
};

const getData = () => {
  let addProducts = localStorage.getItem("dataProducts");
  return JSON.parse(addProducts) ?? [];
};

const saveOneData = (product) => {
  let allData = getData();
  allData.push(product);
  saveData(allData);
};

export { saveData, getData, saveOneData };
