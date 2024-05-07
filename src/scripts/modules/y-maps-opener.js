const opener = document.querySelector(".ymaps-opener");
const map = document.querySelector(".objects__map");

if (opener && map) {
  opener.addEventListener("click", () => {
    map.classList.toggle("is-open");
  });
}
