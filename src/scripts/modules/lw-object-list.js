const btns = document.querySelectorAll(".object-station-list-btn");

if (btns.length) {
  btns.forEach((btn) => {
    btn.addEventListener("click", (evt) => {
      const list = evt.currentTarget.previousElementSibling;

      if (list) {
        const items = list.querySelectorAll("li");
        if (!list.classList.contains("expanded")) {
          items.forEach((item) => {
            item.classList.contains("object-station-list-item--hidden")
              ? item.classList.remove("object-station-list-item--hidden")
              : null;
          });

          list.classList.add("expanded");
          evt.currentTarget.innerHTML = "Свернуть";
        } else {
          items.forEach((item, index) => {
            if (index > 1) {
              !item.classList.contains("object-station-list-item--hidden")
                ? item.classList.add("object-station-list-item--hidden")
                : null;
            }
          });

          list.classList.remove("expanded");
          evt.currentTarget.innerHTML = "Показать еще...";
        }
      }
    });
  });
}
