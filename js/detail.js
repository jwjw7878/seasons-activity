// 상세페이지 가져오기
export default function loadDetail(productId) {
  fetch("/public/data.json")
    .then((res) => res.json())
    .then((data) => {
      const [category, id] = productId.split("-");
      const product = data[category].find((p) => p.id == id);
      if (!product) return;

      const totalPrice = product.price * (1 - product.discount);
      const detailEl = document.querySelector(".detail");
      const detailDiscount = document.querySelector(".detail-discount");
      const detailImg = document.querySelector("#detail-img");

      // 이미지/할인율 표시
      detailImg.setAttribute("src", product.images);
      product.discount > 0
        ? (detailDiscount.textContent = product.discount * 100 + "%")
        : (detailDiscount.style.display = "none");

      detailEl.innerHTML = `
        <h2 class="detail-product">${product.name}</h2>
        <p class="detail-desc">${product.desc}</p>
        <p class="detail-price">${totalPrice.toLocaleString()}₩</p>
        <input type="number" id="count" min="1" max="10" value="1" />
        <p>
          <button id="cart-btn">Cart</button>
          <button id="buy-btn">Buy</button>
        </p>
      `;

      // 이벤트 등록
      const countInput = document.querySelector("#count");
      const cartBtn = document.querySelector("#cart-btn");

      cartBtn.addEventListener("click", () => {
        const count = Number(countInput.value);
        addCart(product, count);
      });
      const detailProductImg = document.querySelector("#detail-product-img");
      detailProductImg.setAttribute("src", product.images);
    });

  // 상세페이지 상품 관련 정보 설명란
  const tabs = document.querySelectorAll(".detail-info ul li");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      // 탭 스타일 초기화
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      // 현재 탭과 내용 활성화
      tab.classList.add("active");
      contents[i].classList.add("active");
    });
  });
}

// 장바구니 저장 함수
function addCart(product, count) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exist = cart.find((item) => item.id === product.id);
  if (exist) {
    exist.count += count; // 수량만 증가
  } else {
    cart.push({ ...product, count });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("장바구니에 담았습니다!");
}
