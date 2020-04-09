window.onload = () => displayStores();

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
            <div class="store-number">${count+1}</div>
          </div>
        </div>
    `;
    document.querySelector('.stores-list').innerHTML = storesHTML;
  });
};
