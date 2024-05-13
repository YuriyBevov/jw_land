const modal = document.querySelector(".modal-overlay");

if(modal) {
  const opener = document.querySelector(".modal-opener");
  const closer = modal.querySelector(".modal-closer");

  const closeModal = (evt) => {
    modal.classList.remove('active');

    opener.addEventListener('click', onClickOpenModal);
    closer.removeEventListener('click', onClickCloseModal);
    document.removeEventListener('click', onOverlayClickCloseModal);
  }

  const onOverlayClickCloseModal = (evt) => {
    if(evt.target === modal) {
      closeModal();
    }
  }

  const onClickOpenModal = (evt) => {
    modal.classList.add('active');

    opener.removeEventListener('click', onClickOpenModal);
    closer.addEventListener('click', onClickCloseModal);
    document.addEventListener('click', onOverlayClickCloseModal);
  }

  const onClickCloseModal = () => {
    closeModal();
  }

  opener.addEventListener('click', onClickOpenModal);
}
