const btns = document.querySelectorAll(".text-expand-btn");

if (btns.length) {
  const onClickExpandText = (evt) => {
    const target = evt.currentTarget;
    const text = target.parentNode.querySelector(".lw-text-truncate");

    const textNode = target.querySelector("span");
    text.classList.toggle("truncated");

    if (text.classList.contains("truncated")) {
      textNode.innerHTML = "Читать далее...";
    } else {
      textNode.innerHTML = "Свернуть";
    }
  };

  btns.forEach((btn) => {
    btn.addEventListener("click", onClickExpandText);
  });
}
