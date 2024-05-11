const openers = document.querySelectorAll(".collapsed-block-opener");

if (openers.length) {
  openers.forEach((opener) => {
    opener.addEventListener("click", (evt) => {
      const collapsedBlock = evt.currentTarget.nextElementSibling;
      collapsedBlock.classList.toggle("expanded");

      const textNode = opener.querySelector("span");

      if (collapsedBlock.classList.contains("expanded")) {
        textNode.innerHTML = "Свернуть";
        !opener.classList.contains("active")
          ? opener.classList.add("active")
          : null;
      } else {
        textNode.innerHTML = "Подробнее";
        opener.classList.contains("active")
          ? opener.classList.remove("active")
          : null;
      }
    });
  });
}
