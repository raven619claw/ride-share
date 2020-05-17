import { addRemoveClassOnElement } from "./utils.js"
import {
  logout,
  start,
  des,
  confirm,
  activeRide,
  endActive,
  confirmModal,
  modalClose,
} from "./selectors.js"
import { renderAvailableDrivers, getCardHtml } from "./card.js"
import { updateDriverAvail, endActiveRide, logoutUser } from "./mock.js"
import "./map.js"

let startLocation = ""
let desLocation = ""
const init = () => {
  bindEvents()
  renderAvailableDrivers(getAllAvailableDrivers())
  renderActiveRide()
}

//show the current active ride
//user cannot book new ride without closing previous
const renderActiveRide = () => {
  const div = document.createElement("div")
  const confirmBtn = document.querySelector(confirm)
  const activeUser = window.store.users.find(({ active }) => active)
  const activeDriverId = activeUser.activeRide
  if (activeDriverId) {
    const activeDriver = window.store.drivers.find(
      ({ id }) => activeDriverId == id
    )
    addRemoveClassOnElement("card", div, true)
    div.innerHTML = getCardHtml(activeDriver)
    document.querySelector(activeRide).innerHTML = div.outerHTML
    addRemoveClassOnElement("hidden", document.querySelector(endActive))
    addRemoveClassOnElement("disabled", confirmBtn, true)
  } else {
    addRemoveClassOnElement("hidden", document.querySelector(endActive), true)
    document.querySelector(activeRide).innerHTML = "No Active Rides"
    addRemoveClassOnElement("disabled", confirmBtn)
  }
}

const getAllAvailableDrivers = () =>
  window.store.drivers.filter(({ seats }) => !!seats)

const bindEvents = () => {
  const modalCloseBtn = document.querySelector(modalClose)
  const logoutBtn = document.querySelector(logout)
  const startInput = document.querySelector(start)
  const desInput = document.querySelector(des)
  const confirmBtn = document.querySelector(confirm)
  const cancelBtn = document.querySelector(endActive)
  //modal close event
  modalCloseBtn.addEventListener("click", () => {
    addRemoveClassOnElement(
      "hidden",
      document.querySelector(confirmModal),
      true
    )
  })
  //cancel ride event
  cancelBtn.addEventListener("click", async () => {
    await endActiveRide()
    trimDrivers()
    renderActiveRide()
  })
  //confirm ride event
  confirmBtn.addEventListener("click", async () => {
    if (confirmBtn.classList.contains("disabled")) {
      return
    }
    const activeCard = document.querySelector(".card.active")
    if (activeCard) {
      const id = parseInt(activeCard.querySelector(".id").value)
      try {
        await updateDriverAvail(
          window.store.drivers.find(({ id: driverId }) => driverId == id)
        )
        //after updating API
        //rerender available drivers
        trimDrivers()
        renderActiveRide()
        addRemoveClassOnElement("hidden", document.querySelector(confirmModal))
      } catch {
        //handle err for active rides
        console.log("you have an active ride")
      }
    }
  })
  //logout event
  logoutBtn.addEventListener("click", async () => {
    await logoutUser()
    window.location = "/"
  })
  //input event for rendering filtered drivers
  startInput.addEventListener("keyup", (e) => {
    startLocation = e.currentTarget.value
    trimDrivers()
    renderActiveRide()
  })
  desInput.addEventListener("keyup", (e) => {
    desLocation = e.currentTarget.value
    trimDrivers()
    renderActiveRide()
  })
}
if (window.location.pathname == "/home.html") {
  init()
}
//render filtered list of drivers based on start and destination
const trimDrivers = () => {
  const drivers = getAllAvailableDrivers()
  if (!startLocation && !desLocation) {
    return renderAvailableDrivers(drivers)
  }
  const selectedDrivers = drivers.filter((driver) => {
    const {
      route: [start, des],
    } = driver
    let flag = false
    if (desLocation && startLocation) {
      if (start.indexOf(startLocation) > -1 && des.indexOf(desLocation) > -1) {
        flag = true
      }
    } else if (startLocation && start.indexOf(startLocation) > -1) {
      flag = true
    } else if (desLocation && des.indexOf(desLocation) > -1) {
      flag = true
    }
    return flag
  })
  renderAvailableDrivers(selectedDrivers)
}
