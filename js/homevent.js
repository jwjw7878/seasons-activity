import { loadContent } from "./index.js";

export default function initializeEvent() {
  // 할인 팝업 닫기 이벤트
  let discountPopup = document.querySelector(".discount-popup");
  let popupCloseBtn = document.querySelector(".discount-popup i");

  popupCloseBtn.addEventListener("click", function () {
    discountPopup.style.display = "none";
  });

  let products = {};
  // 베스트 아이템 메뉴 컬러 변경 이벤트
  let bestItemsMenu = document.querySelectorAll(".navbar li");
  bestItemsMenu.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      bestItemsMenu.forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");
      let category = this.querySelector("a").dataset.category;
      renderItems(products[category], category);
    });
  });
  async function getData() {
    try {
      const res = await fetch("/public/data.json");
      products = await res.json();
      renderItems(products.surfboards, "surfboards");
    } catch (err) {
      console.error(err);
    }
  }
  getData();
}

// 상품 랜더링
function attachBuyEvents() {
  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      loadContent(`detail.html?id=${productId}`);
    });
  });
}

function renderItems(items, category) {
  const itemsList = document.querySelector(".items");
  itemsList.innerHTML = "";

  items.forEach((item, i) => {
    // 할인된 가격
    const discountedPrice = item.price * (1 - item.discount);
    // 힐인율이 있는 가격만 class 적용해서 밑줄 스타일 적용
    const onlyPrice =
      item.discount === 0
        ? `<span>${item.price.toLocaleString()}</span>`
        : `<span class="original-price">${item.price.toLocaleString()}</span>`;
    const itemHTML = `
        <div class="item">
          <img src="${item.images}" alt="${item.name}" />
          <p>${item.name}</p>
          <p>
            ${onlyPrice}
            <span>${
              item.discount === 0 ? "" : discountedPrice.toLocaleString()
            }₩</span>
            <span>${item.discount === 0 ? "" : item.discount * 100 + "%"}</span>
          </p>
          <p><span class="buy-btn" data-id="${category}-${
      item.id
    }">Buy</span></p>
          <p class="rank">${i + 1}</p>
        </div>
      `;

    itemsList.insertAdjacentHTML("beforeend", itemHTML);
    attachBuyEvents();
  });
}
