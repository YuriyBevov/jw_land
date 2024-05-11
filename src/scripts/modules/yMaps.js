const map = document.querySelector("#yMaps");

if (map) {
  let myMap;
  window.addEventListener("load", () => {
    const centerCoords = map.dataset.center.split(","); //[59.90297506420561, 30.39827949999997]; //map.dataset.center;
    const placemarkCoords = map.dataset.coords.split(",");

    ymaps.ready(function () {
      myMap = new ymaps.Map(
        "yMaps",
        {
          zoom: 17,
          center: centerCoords,
          controls: []
        },
        {
          searchControlProvider: "yandex#search"
        }
      );

      const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="ymaps-icon-content-layout">$[properties.iconContent]</div>'
      );

      const myPlacemark = new ymaps.Placemark(
        placemarkCoords,
        {
          balloonContent: "<div>Я вышел за границы карты</div>"
        },
        {
          balloonPanelMaxMapArea: 0
        },
        {
          iconContent: ""
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
      myMap.geoObjects.add(myPlacemark);

      observeEvents(myMap);

      // const officePlacemark = new ymaps.Placemark(
      //   placemarkCoords,
      //   {
      //     iconContent: ""
      //   },
      //   {
      //     // Опции.
      //     // Необходимо указать данный тип макета.
      //     iconLayout: "default#imageWithContent",
      //     // Своё изображение иконки метки.
      //     iconImageHref: "assets/img/icon-pin.svg",
      //     // Размеры метки.
      //     iconImageSize: [26, 40],
      //     // Смещение левого верхнего угла иконки относительно
      //     // её "ножки" (точки привязки).
      //     iconImageOffset: [-13, -20],
      //     iconContentOffset: [20, 15],

      //     iconContentLayout: MyIconContentLayout
      //   }
      // );

      // myMap.geoObjects.add(officePlacemark);

      // myPlacemark.balloon.open();
    });
  });
  function observeEvents(map) {
    let mapEventsGroup;
    map.geoObjects.each(function (geoObject) {
      geoObject.balloon.events
        // При открытии балуна начинаем слушать изменение центра карты.
        .add("open", function (e1) {
          const placemark = e1.get("target");
          // Вызываем функцию в двух случаях:
          mapEventsGroup = map.events
            .group()
            // 1) в начале движения (если балун во внешнем контейнере);
            .add("actiontick", function (e2) {
              if (placemark.options.get("balloonPane") == "outerBalloon") {
                setBalloonPane(map, placemark, e2.get("tick"));
              }
            })
            // 2) в конце движения (если балун во внутреннем контейнере).
            .add("actiontickcomplete", function (e2) {
              if (placemark.options.get("balloonPane") != "outerBalloon") {
                setBalloonPane(map, placemark, e2.get("tick"));
              }
            });
          // Вызываем функцию сразу после открытия.
          setBalloonPane(map, placemark);
        })
        // При закрытии балуна удаляем слушатели.
        .add("close", function () {
          mapEventsGroup.removeAll();
        });
    });
  }

  function setBalloonPane(map, placemark, mapData) {
    mapData = mapData || {
      globalPixelCenter: map.getGlobalPixelCenter(),
      zoom: map.getZoom()
    };

    const mapSize = map.container.getSize(),
      mapBounds = [
        [
          mapData.globalPixelCenter[0] - mapSize[0] / 2,
          mapData.globalPixelCenter[1] - mapSize[1] / 2
        ],
        [
          mapData.globalPixelCenter[0] + mapSize[0] / 2,
          mapData.globalPixelCenter[1] + mapSize[1] / 2
        ]
      ],
      balloonPosition = placemark.balloon.getPosition(),
      // Используется при изменении зума.
      zoomFactor = Math.pow(2, mapData.zoom - map.getZoom()),
      // Определяем, попадает ли точка привязки балуна в видимую область карты.
      pointInBounds = ymaps.util.pixelBounds.containsPoint(mapBounds, [
        balloonPosition[0] * zoomFactor,
        balloonPosition[1] * zoomFactor
      ]),
      isInOutersPane = placemark.options.get("balloonPane") == "outerBalloon";

    // Если точка привязки не попадает в видимую область карты, переносим балун во внутренний контейнер
    if (!pointInBounds && isInOutersPane) {
      placemark.options.set({
        balloonPane: "balloon",
        balloonShadowPane: "shadows"
      });
      // и наоборот.
    } else if (pointInBounds && !isInOutersPane) {
      placemark.options.set({
        balloonPane: "outerBalloon",
        balloonShadowPane: "outerBalloon"
      });
    }
  }
}
