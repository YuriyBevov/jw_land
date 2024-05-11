document.addEventListener("DOMContentLoaded", function () {
  const checker = document.querySelector(".lw-multiple-checker");

  if (!checker) return;

  const panel = checker.querySelector(".lw-multiple-checker-panel");
  const controlsContainer = checker.querySelector(
    ".lw-multiple-checker-container"
  );
  const panelTextNode = panel.querySelector("span");
  const baseText = panelTextNode.innerHTML;
  const ctrls = checker.querySelectorAll("input");

  const fillPanel = () => {
    let text = "";

    ctrls.forEach((ctrl) => {
      if (ctrl.checked) {
        text = `
          ${text !== "" ? text + ", " : ""}
          ${ctrl.nextElementSibling.innerHTML}`;
      }
    });

    if (text !== "") {
      panelTextNode.innerHTML = text;
    } else {
      panelTextNode.innerHTML = baseText;
    }
  };

  fillPanel();

  const onClickOpenChecker = () => {
    panel.classList.toggle("is-open");
  };

  panel.addEventListener("click", onClickOpenChecker);

  document.addEventListener("click", (evt) => {
    if (controlsContainer.contains(evt.target) || panel.contains(evt.target))
      return;

    panel.classList.remove("is-open");
  });

  const controls = checker.querySelectorAll(
    ".lw-multiple-checker-container input"
  );

  controls.forEach((ctrl) => {
    ctrl.addEventListener("change", fillPanel);
  });
});
