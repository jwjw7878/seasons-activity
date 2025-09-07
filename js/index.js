import loadDetail from "./detail.js";
import initializeEvent from "./homevent.js";
import initializeSwipers from "./getswiper.js";
import getCart from "./cart.js";
// header 배너 닫기 이벤트
let banner = document.querySelector(".banner");
let closeBtn = document.querySelector(".banner i");
let nav = document.querySelector("nav");
closeBtn.addEventListener("click", function () {
  banner.style.display = "none";
  nav.style.top = "0px";
});
// header nav이벤트
const logo = document.querySelector(".logo");
const homeIcon = document.querySelector("nav .fa-house");
logo.addEventListener("click", function () {
  loadContent("home.html");
});
homeIcon.addEventListener("click", function () {
  loadContent("home.html");
});
const cartIcon = document.querySelector("nav .fa-bag-shopping");
cartIcon.addEventListener("click", function () {
  loadContent("cart.html");
});

// main 페이지 동적 로드
export async function loadContent(pageUrl) {
  try {
    const res = await fetch(`/html/${pageUrl}`);
    const html = await res.text();
    document.querySelector("main").innerHTML = html;

    // 페이지 별 초기화
    if (pageUrl.startsWith("home")) {
      initializeSwipers();
      initializeEvent();
    }
    if (pageUrl.startsWith("detail")) {
      const params = new URLSearchParams(pageUrl.split("?")[1]);
      const productId = params.get("id");
      loadDetail(productId);
    }
    if (pageUrl.startsWith("cart")) {
      getCart();
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent("home.html");
});
