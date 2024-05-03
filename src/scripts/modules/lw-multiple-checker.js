document.addEventListener("DOMContentLoaded", function () {

  const items = document.querySelectorAll(".lw-multiple-checker");

  if(!items.length) return;

  const openers = document.querySelectorAll(".lw-multiple-checker-panel");

  let activePanel = null;

  const closeAllPanels = () => {
    openers.forEach(opener => {
      opener.classList.contains('is-open') ? opener.classList.remove('is-open') : null;
    });
  }

  const onClickSetActivePanel = (evt) => {
    if(activePanel === null ) activePanel = evt.target;

    if(evt.target.classList.contains('lw-multiple-checker-panel')) {
      if(activePanel !== evt.target) {
        closeAllPanels();
        activePanel = evt.target;
      }
      activePanel.classList.toggle("is-open");
    }
  }

  openers.forEach(opener => {
    opener.addEventListener("click", onClickSetActivePanel);
  });

  let labels = document.querySelectorAll(".lw-multiple-checker label");

  const addLabelToPanel = (target, container) => {
    const panel = container.parentNode.querySelector('.lw-multiple-checker-panel.is-open');
    const control = container.querySelector(`input[id="${target.getAttribute('for')}"]`);

    if(!control.checked) {
      const label = document.createElement("label");
      label.setAttribute('for', target.getAttribute('for'));
      label.innerHTML = target.innerHTML;
      activePanel.appendChild(label);

      label.addEventListener('click', onClickFillLabel);
    } else {
      removeLabelFromPanel(target, panel);
    }
  }

   removeLabelFromPanel = (target, panel) => {
    setTimeout(() => {
      const elem = panel.querySelector( `label[for="${target.getAttribute('for')}"]` );
      panel.removeChild(elem);
    }, 0);
  }

  const onClickFillLabel = (evt) => {
    const parent = evt.currentTarget.parentNode;

    if(parent.classList.contains('lw-multiple-checker-container')) {
      addLabelToPanel(evt.currentTarget, parent);
    }

    if(parent.classList.contains('lw-multiple-checker-panel')) {
      removeLabelFromPanel(evt.currentTarget, parent);
    }
  }

  labels.forEach(label => {
    label.addEventListener('click', onClickFillLabel);
  });

  const onOverlayClickClosePanels = (evt) => {
    if(activePanel && activePanel.classList.contains('is-open')) {
      const activeContainer = activePanel.nextElementSibling;

      if(!activePanel.contains(evt.target) && !activeContainer.contains(evt.target)) {
        closeAllPanels();
        activePanel = null;
      }
    }
  }

  document.addEventListener('click', onOverlayClickClosePanels, true);
});
