import customSelect from "custom-select";
const items = document.querySelectorAll(".custom-select");

if (items) {
  items.forEach((item) => {
    customSelect(item);
  });

  const firstItems = document.querySelectorAll(
    ".custom-select-panel .custom-select-option:first-child"
  );

  firstItems.forEach((it) => {
    if (
      !it.parentNode.previousElementSibling.classList.contains(
        "custom-pagination-select"
      )
    ) {
      it.innerHTML = "Не выбрано";
    }
  });
}

const pagSelect = document.querySelector(".lw-pagination-select");

if (pagSelect) {
  const options = pagSelect.querySelectorAll(".custom-select-option");

  const panel = pagSelect.querySelector(".custom-select-panel");

  const height =
    options[0].offsetHeight * options.length + 2 > 172
      ? 172
      : options[0].offsetHeight * options.length + 2;

  panel.style.top = `-${height}px`;
  console.log(options.length);
}
