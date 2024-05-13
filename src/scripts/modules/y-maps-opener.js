const opener = document.querySelector(".ymaps-opener");
const map = document.querySelector(".objects__map");

if (opener && map) {
  opener.addEventListener("click", () => {
    map.classList.toggle("is-open");
  });

  const closer = document.querySelector(".objects__map-closer");

  closer.addEventListener('click', () => {
    map.classList.remove("is-open");
  });
}
