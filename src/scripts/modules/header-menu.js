const burger = document.querySelector(".burger");
const menu = document.querySelector(".main-header__menu");

if (menu && burger) {
  const onClickOpenMenu = () => {
    menu.classList.toggle("is-open");
  };

  burger.addEventListener("click", onClickOpenMenu);
}
