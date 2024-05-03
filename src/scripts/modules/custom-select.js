import customSelect from 'custom-select';
const items = document.querySelectorAll('.custom-select');

if(items) {
  items.forEach(item => {
    customSelect(item);
  });

  const firstItems = document.querySelectorAll('.custom-select-panel .custom-select-option:first-child');

  firstItems.forEach(it => {
    it.innerHTML = 'Не выбрано';
  });
}
