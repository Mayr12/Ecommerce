import { listProducts } from "./constants.js";
import { saveOneData } from "./persistence.js";

const stringToHTML = (string) => {
  return new DOMParser().parseFromString(string, "text/html").body.firstChild;
};
const loadProducts = (listProducts) => {
  listProducts.forEach((product) => {
    let productContainerWoman = document.getElementById("containerOne");
    let productContainerMen = document.getElementById("containerTwo");
    let HTMLproduct = `<div>
      <figure class="cartImg">
        <img src=${product.imagen}  id= "modalInf${product.id}"/>
      </figure>
      <div class="titleProduct">${product.name}</div>
      <div class="productDescription">
        <div class="price">$${product.price}
        </div>
        <div>
          <img class="buyProductButton" src="./image/Icon/Cart.png" id="addCartButton${product.id}" 
          onclick=''/>
        </div>
      </div>
    </div>`;

    let varTester = stringToHTML(HTMLproduct);

    if (product.sex == "woman") {
      productContainerWoman.appendChild(varTester);
    } else {
      productContainerMen.appendChild(varTester);
    }

    let modalInfWindow = varTester.querySelector(`#modalInf${product.id}`);
    modalInfWindow.addEventListener("click", () => {
      modalWindow(product.id);
    });

    let buyProductButton = varTester.querySelector(
      `#addCartButton${product.id}`
    );
    buyProductButton.addEventListener("click", () => {
      addCart(product.id);
    });
  });
};

const addCart = (productId) => {
  const product = listProducts[productId - 1];
  let productsInCart = document.getElementById("container");
  const HTMLproduct = `<div class="listItem" id="productCart${product.id}">
    <figure>
      <img src=${product.imagen} alt="jacket" class="imgProduct">
    </figure>
    <div class="textDescription">
      <h3 class="titleItem">${product.name}</h3>
      <p class="parrafoItem">${product.description}</p>
    </div>
    <div class="trash">
      <img src="./image/Icon/trash.png" alt="trash" class="imgtrash" id='deleteProductButton${productId}'>
    </div>
  </div>`;

  let varTester = stringToHTML(HTMLproduct);
  let deleteProductButton = varTester.querySelector(
    `#deleteProductButton${productId}`
  );
  deleteProductButton.addEventListener("click", () => {
    deleteProduct(product.id);
  });
  productsInCart.appendChild(varTester);

  saveOneData(product);
};

const deleteProduct = (productId) => {
  document.getElementById("productCart" + productId).remove();

  let getProduct = localStorage.getItem("dataProducts");
  let arrayProduct = JSON.parse(getProduct);
  if (!arrayProduct) {
    return;
  }
  let index = arrayProduct.findIndex((x) => x.id === productId);
  arrayProduct.splice(index, 1);
  localStorage.setItem("dataProducts", JSON.stringify(arrayProduct));
};

let showData = () => {
  let Data = localStorage.getItem("dataProducts");
  let dataPrint = JSON.parse(Data);
  if (!dataPrint) {
    return;
  }

  dataPrint.forEach((product) => {
    let addDataIndex = document.getElementById("container");
    let HTMLproduct = `<div class="listItem" id="productCart${product.id}">
      <figure>
        <img src=${product.imagen} alt="jacket" class="imgProduct">
      </figure>
      <div class="textDescription">
        <h3 class="titleItem">${product.name}</h3>
        <p class="parrafoItem">${product.description}</p>
      </div>
      <div class="trash">
        <img src="./image/Icon/trash.png" alt="trash" class="imgtrash" id='deleteProductButton${product.id}'>
      </div>
    </div>`;

    let varTester = stringToHTML(HTMLproduct);

    let deleteProductButton = varTester.querySelector(
      `#deleteProductButton${product.id}`
    );
    deleteProductButton.addEventListener("click", () => {
      deleteProduct(product.id);
    });

    addDataIndex.appendChild(varTester);
  });
};

let modalWindow = (productId) => {
  let productInf = listProducts[productId - 1];

  let modalInf = document.getElementById("modal");
  let HTMLproduct = `<div id="modalOne" class="descriptionProduct">
      <div class="modalDescription">
          <div class="imgModalProduct">
            <img class="imgModal" src='${productInf.imagen}' />
          </div>
    
          <div class="textModal">
            <h3>${productInf.name}</h3>
            <p>${productInf.description}</p>
            <div class="cartModal">
            <img class="buyProductButton" src="./image/Icon/Cart.png" id='modalProduct${productInf.id}'/>
            </div>
          <span class="buttonClosed" id="buttonCloseModal">x</span>
        </div>
    </div> `;

  let varTester = stringToHTML(HTMLproduct);

  let modalProduct = varTester.querySelector(`#modalProduct${productInf.id}`);
  console.log(modalProduct);
  modalProduct.addEventListener("click", () => {
    addCart(productInf.id);
  });
  modalInf.replaceChildren(varTester);

  let modalOne = document.getElementById(`modalOne`);

  let modalClose = varTester.querySelector(`#buttonCloseModal`);
  console.log(modalClose);
  modalClose.addEventListener("click", () => {
    closeElement(modalOne);
  });
};

let closeElement = (modalOne) => {
  console.log("prueba");
  console.log(modalOne);
  document.getElementById("modalOne").style.display = "none";
  console.log(modalOne);
};

export { loadProducts, showData, closeElement };
