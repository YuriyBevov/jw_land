const map = document.querySelector("#yMaps");

if (map) {
  const centerCoords = map.dataset.center.split(",");
  const placemarkCoords = map.dataset.coords.split(",");
  const objectImg = map.dataset.img;
  const detailLink = map.dataset.link;
  const objects = JSON.parse(map.dataset.objects);

  let objectsNode = null;

  if (objects) {
    tbody = document.createElement("tbody");

    objects.forEach((obj) => {
      const tr = document.createElement("tr");
      const tdType = document.createElement("td");
      tdType.innerHTML = obj.type;
      const tdValue = document.createElement("td");
      tdValue.innerHTML = obj.value;

      tr.appendChild(tdType);
      tr.appendChild(tdValue);
      tbody.appendChild(tr);
    });
    objectsNode = tbody.innerHTML;
  }

  let myMap = null;

  window.addEventListener("load", () => {
    ymaps.ready(init);
  });

  function init() {
    // Создание карты.

    myMap = new ymaps.Map("yMaps", {
      center: centerCoords,
      zoom: 17,
      controls: [],
      behaviors: ["drag"]
    });

    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="ymaps-icon-content-layout">$[properties.iconContent]</div>'
    );

    // Метка
    const officePlacemark = new ymaps.Placemark(
      placemarkCoords,
      {
        iconContent: "",
        balloonContent: `
          <div class="object-preview-card">
            <div class="object-preview-card__header">
              <img src=${objectImg} alt="Объект" width="360" height="220">
            </div>
            <div class="object-preview-card__content">
              <table>
                <thead>
                  <tr>
                    <td>Найдено:</td>
                    <td>Кол-во:</td>
                  </tr>
                </thead>
                <tbody>
                ${objectsNode}
                </tbody>
              </table>
              <a class="lw-main-btn lw-main-btn--outlined object-preview-card__detail-link" href=${detailLink}><span>Квартиры</span></a>
            </div>
          </div>
        `
      },

      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#imageWithContent",
        // Своё изображение иконки метки.
        iconImageHref: "assets/img/icon-pin.svg",
        // Размеры метки.
        iconImageSize: [26, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-13, -20],
        iconContentOffset: [20, 15],

        iconContentLayout: MyIconContentLayout
      }
    );

    myMap.geoObjects.add(officePlacemark);

    // ZOOM-CONTROL
    let ZoomLayout = ymaps.templateLayoutFactory.createClass(
      //Шаблон html кнопок зума
      "<div class='zoom-btns'>" +
        "<button id='zoom-in' class='zoom-btn zoom-btn-in' aria-label='Увеличить масштаб'>" +
        "<svg width='14' height='14'>" +
        "<use xlink:href='./assets/sprite.svg#icon-zoom-in'>" +
        "</svg>" +
        "</button>" +
        "<button id='zoom-out' class='zoom-btn zoom-btn-out' aria-label='Уменьшить масштаб'>" +
        "<svg width='14' height='2'>" +
        "<use xlink:href='./assets/sprite.svg#icon-zoom-out'>" +
        "</svg>" +
        "</button>" +
        "</div>",
      {
        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
          // Вызываем родительский метод build.
          ZoomLayout.superclass.build.call(this);

          // Привязываем функции-обработчики к контексту и сохраняем ссылки
          // на них, чтобы потом отписаться от событий.
          this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
          this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

          // Начинаем слушать клики на кнопках макета.
          let zoomInBtn = document.getElementById("zoom-in");
          let zoomOutBtn = document.getElementById("zoom-out");

          zoomInBtn.addEventListener("click", this.zoomInCallback);
          zoomOutBtn.addEventListener("click", this.zoomOutCallback);
        },

        clear: function () {
          // Снимаем обработчики кликов.
          zoomInBtn.removeEventListener("click", this.zoomInCallback);
          zoomOutBtn.removeEventListener("click", this.zoomOutCallback);
          // Вызываем родительский метод clear.
          ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
          myMap.balloon.close();

          let map = this.getData().control.getMap();
          map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
        },

        zoomOut: function () {
          myMap.balloon.close();

          let map = this.getData().control.getMap();
          map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
        }
      }
    );

    let zoomControl = new ymaps.control.ZoomControl({
      options: {
        layout: ZoomLayout,
        position: { right: "30px", bottom: "50px" }
      }
    });
    myMap.controls.add(zoomControl);

    const btn = document.querySelector(".ymaps-opener");

    if (btn) {
      btn.addEventListener("click", () => {
        myMap.container.fitToViewport();
      });
    }
  }
}
