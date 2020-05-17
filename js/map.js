import { addRemoveClassOnElement } from "./utils.js"
import { closeMap, openMap, mapModal } from "./selectors.js"
import { getInitials } from "./utils.js"
let map
//loads and renders map
const loadDriverMarkers = () => {
  const drivers = window.store.drivers.filter(({ seats }) => seats)
  drivers.map(({ username, lat, lng }) => {
    new google.maps.Marker({
      position: { lat, lng },
      map: map,
      label: getInitials(username),
    })
  })
}
const bindEvent = () => {
  const mapModalElement = document.querySelector(mapModal)
  const closeMapBtn = document.querySelector(closeMap)
  const openMapBtn = document.querySelector(openMap)
  openMapBtn.addEventListener("click", () => {
    addRemoveClassOnElement("hidden", mapModalElement)
  })
  closeMapBtn.addEventListener("click", () => {
    addRemoveClassOnElement("hidden", mapModalElement, true)
  })
}
window.initMap = () => {
  map = new google.maps.Map(document.getElementById("map-container"), {
    center: { lat: 12.9716, lng: 77.5946 },
    zoom: 11,
  })
  bindEvent()
  loadDriverMarkers()
}
window.google && initMap()
