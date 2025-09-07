export default function initializeSwipers() {
  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      centeredSlides: true,
      breakpoints: {
        320: {
          // 모바일
          slidesPerView: 1,
        },
        640: {
          // 작은 태블릿
          slidesPerView: 2,
        },
        1024: {
          // 데스크탑
          slidesPerView: 3,
        },
        1440: {
          // 큰 화면
          slidesPerView: 5,
        },
      },
      coverflowEffect: {
        rotate: -10,
        stretch: -120,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  }
  if (document.querySelector(".mySwiper2")) {
    new Swiper(".mySwiper2", {
      centeredSlides: true,
      speed: 5000,
      autoplay: {
        delay: 0,
      },
      loop: true,
      slidesPerView: "auto",
      // disableOnInteraction: false,
    });
  }
}
