window.onload = () => {
  displayStores(stores);
};

var map;
var markers = [];
var infoWindow;

function initMap() {
  var losAngeles = {
    lat: 34.06338,
    lng: -118.35808,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: losAngeles,
    zoom: 11,
    mapTypeId: "roadmap",
  });
  infoWindow = new google.maps.InfoWindow();
  searchStores();
}

const searchStores = () => {
  let foundStores = [];
  let zipCode = document.getElementById("zipcode-input").value;
  if (zipCode) {
    stores.forEach((store) => {
      let postal = store.address.postalCode.substring(0, 5);
      if (zipCode === postal) foundStores.push(store);
    });
  } else foundStores = stores;
  if (foundStores=== []) foundStores = stores;
  clearLocation();
  displayStores(foundStores);
  showStoresMarker(foundStores);
  setOnClickListener();
};

const clearLocation = () => {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
};

const setOnClickListener = () => {
  let storeElements = document.querySelectorAll(".stores-container");
  storeElements.forEach((element, index) => {
    element.addEventListener("click", () => {
      google.maps.event.trigger(markers[index], "click");
    });
  });
};

const displayStores = (stores) => {
  storesHTML = "";
  stores.forEach((store, count) => {
    storesHTML += `
      <div class="stores-container">
        <div class="store-container-background">
          <div class="store-info-container">
            <div class="store-address">
              <span>${store.addressLines[0]}</span>
              <span>${store.addressLines[1]}</span>
            </div>
            <div class="store-phone-number">${store.phoneNumber}</div>
          </div>
          <div class="store-number-container">
            <div class="store-number">${count + 1}</div>
          </div>
        </div>
      </div>
    `;
    document.querySelector(".stores-list").innerHTML = storesHTML;
  });
};

const showStoresMarker = (stores) => {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach((store, count) => {
    let latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    );
    let name = store.name;
    let address = store.addressLines[0];
    let openStatus = store.openStatusText;
    let phoneNumber = store.phoneNumber;
    bounds.extend(latlng);
    createMarker(latlng, name, address, openStatus, phoneNumber, count + 1);
  });
  map.fitBounds(bounds);
};

const createMarker = (
  latlng,
  name,
  address,
  openStatus,
  phoneNumber,
  count
) => {
  var html = `
    <div class = "store-info-window">
      <div class = "store-info-name">
        ${name}
      </div>
      <div class = "store-info-status">
        ${openStatus}
      </div>
      <div class = "store-info-address">
        <div class = "circle">
          <i class = "fas fa-location-arrow"></i>
        </div>
        ${address}
      </div>
      <div class ="store-info-phone">
        <div class = "circle">
          <i class = "fas fa-phone-alt"></i>
        </div>
        ${phoneNumber}
      </div>
    </div>
  `;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: count.toString(),
  });
  google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
};
