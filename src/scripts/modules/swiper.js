import Swiper, {
  Navigation,
} from "swiper";
Swiper.use([Navigation]);

document.addEventListener("DOMContentLoaded", () => {
  console.log('SWIPER', Swiper);
  const sliders = document.querySelectorAll(".lw-main-slider .swiper");

  if(sliders.length) {
    sliders.forEach(slider => {
      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: slider.querySelector(".swiper-button-next"),
          prevEl: slider.querySelector(".swiper-button-prev"),
        }
      });
    });
  }
});
