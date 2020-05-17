export const addRemoveClassOnElement = (className, element, flag) => {
  if (flag) {
    element.classList.add(className)
  } else {
    element.classList.remove(className)
  }
}

export const getInitials = (string) => {
  const splitLen = string.split(" ").length
  const firstName = string.split(" ")[0]
  const lastName = string.split(" ")[splitLen - 1]
  let initial = firstName[0]
  if (lastName) {
    initial += lastName[0]
  }
  return initial
}

export const getCookie = (cookie) => {
  const cookieArr = document.cookie.split(";")
  let cookieFinalValue = null
  cookieArr.map((cookieStr) => {
    const [cookieName, cookieValue] = cookieStr.split("=")
    if (cookieName.trim() == cookie) {
      cookieFinalValue = cookieValue
    }
  })
  return cookieFinalValue
}
const myStorage = window.localStorage
export const getLocalStorage = (key) => {
  const storageData = myStorage.getItem(key)
  const JSONdata = JSON.parse(storageData)
  return JSONdata
}
export const setLocalStorage = (key, data) => {
  myStorage.setItem(key, JSON.stringify(data))
}
