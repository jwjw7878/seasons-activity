export default function getCart() {
  const removeBtn = document.querySelector("#remove-cart-btn");
  let list = document.querySelector("#cart-list");
  let cart = JSON.parse(localStorage.getItem("cart"));
  const totalPriceEl = document.querySelector("#items-total-price");

  list.innerHTML = "";
  if (!cart) {
    list.textContent = "카트에 담긴 상품이 없습니다.";
    totalPriceEl.textContent = "Total Price: 0₩";
    return;
  }
  // 카트 목록
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    const itemPrice = item.price * (1 - item.discount);
    li.innerHTML = `
    <p class="id">${i + 1}</p>
    <p class="cart-img">
    <img src=${item.images} alt="item-img">
    </p>
    <p class="item-title">${item.name}</p>
    <p class="item-count">x${item.count}</p>
    <p class="item-price">${(itemPrice * item.count).toLocaleString()}</p>
    <button class="item-delete" data-id=${i}>X</button>`;
    list.appendChild(li);
  });
  //   카트 합계
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (1 - item.discount) * item.count,
    0
  );

  totalPriceEl.textContent = `Total Price: ${totalPrice.toLocaleString()}₩`;
  // 전체 삭제
  removeBtn.addEventListener("click", function () {
    localStorage.removeItem("cart");
    list.textContent = "카트에 담긴 상품이 없습니다.";
    getCart();
  });
  //   개별 삭제
  const deleteItems = document.querySelectorAll(".item-delete");
  deleteItems.forEach((btn) => {
    btn.onclick = (e) => {
      const id = Number(e.target.dataset.id);
      const filtered = cart.filter((_, idx) => idx !== id);
      localStorage.setItem("cart", JSON.stringify(filtered));
      getCart();
    };
  });
}
