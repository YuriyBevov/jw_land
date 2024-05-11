const opener = document.querySelector(".mobile-menu-opener");

if (opener) {
  const closer = document.querySelector(".mobile-menu-closer");

  const menu = document.querySelector(".mobile-menu");

  const closeMobileMenu = () => {
    menu.classList.remove("is-open");
    document.removeEventListener("click", onOverlayClickCloseMobileMenu);
    closer.removeEventListener("click", closeMobileMenu);
    opener.addEventListener("click", onClickOpenMobileMenu);
  };

  const onOverlayClickCloseMobileMenu = (evt) => {
    console.log("ov cliclk");
    if (evt.target === menu) {
      closeMobileMenu();
    }
  };

  const onClickOpenMobileMenu = () => {
    menu.classList.add("is-open");

    closer.addEventListener("click", closeMobileMenu);
    document.addEventListener("click", onOverlayClickCloseMobileMenu);
    opener.removeEventListener("click", onClickOpenMobileMenu);
  };

  opener.addEventListener("click", onClickOpenMobileMenu);
}
