window.onload = () => displayStores();

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
  showStoresMarker();
}

const displayStores = () => {
  storesHTML = "";
  stores.forEach((store, count) => {
    storesHTML += `
        <div class="stores-container">
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
    `;
    document.querySelector(".stores-list").innerHTML = storesHTML;
  });
};

const showStoresMarker = () => {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach((store, count) => {
    let latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    );
    let name = store.name;
    let address = store.address[0];
    bounds.extend(latlng);
    createMarker(latlng, name, address, count + 1);
  })
  map.fitBounds(bounds);
};

const createMarker = (latlng, name, address, count) => {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: count.toString()
  });
  /* google.maps.event.addListener(marker, "click", function () {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  }); */
  markers.push(marker);
};
