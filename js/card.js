import { addRemoveClassOnElement } from "./utils.js"

import { results } from "./selectors.js"
const resultList = document.querySelector(results)
export const getCardHtml = ({
  username,
  distance,
  rating,
  route,
  car,
  seats,
  id,
}) => {
  return `
    <img class="card-img" src="./img/uesr-card.png" />
    <img class="card-img-right" src="./img/selected.png" />
    <img class="card-img-call" src="./img/call.png" />
    <input class='id hidden' hidden value="${id}"/>
    <div class="card-content">
      <div class="card-main">
        <div class="card-name">${username}</div>
        <div class="card-distance">${distance}</div>
        <div class="card-rating link">${rating}</div>
        <img class="rating" src="./img/rating.png" />
      </div>
      <div class="card-route-wrap">
        route:<span class="card-route">${route.join(" to ")}</span>
      </div>
      <div class="card-car-wrap">
        car:<span class="card-car">${car}</span> seats available:<span
          class="card-seats"
          >${seats}</span
        >
      </div>
    </div>
  `
}

//renders list of available drivers(where seats > 0)
export const renderAvailableDrivers = (dataList) => {
  resultList.innerHTML = ""
  dataList.map((driver) => {
    const div = document.createElement("div")
    addRemoveClassOnElement("card", div, true)
    div.innerHTML = getCardHtml(driver)
    resultList.appendChild(div)
    bindClickEvent(div)
  })
}
let activeCard = null
//bind event to select card
const bindClickEvent = (element) => {
  element.addEventListener("click", function () {
    if (element == activeCard) {
      addRemoveClassOnElement("active", activeCard)
      activeCard = null
    } else {
      activeCard && addRemoveClassOnElement("active", activeCard)
      addRemoveClassOnElement("active", element, true)

      activeCard = this
    }
  })
}
