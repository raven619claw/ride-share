import { getLocalStorage, setLocalStorage } from "./utils.js"
import initialStore from "./initialStore.js"

//acts as the store to update mock data
window.store = getLocalStorage("store") || initialStore
export const updateKey = (key, data) => {
  window.store[key] = data
  setLocalStorage("store", window.store)
}
window.resetStore = () => {
  window.store = initialStore
  setLocalStorage("store", window.store)
  document.cookie = "login=false"
}
