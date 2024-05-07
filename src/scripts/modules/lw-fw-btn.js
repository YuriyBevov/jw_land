const favs = document.querySelectorAll(".lw-fv-btn");
if (favs.length) {
  favs.forEach((f) => {
    f.addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("active");
    });
  });
}
