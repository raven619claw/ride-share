import { getCookie } from "./utils.js"

const checkLogin = () => JSON.parse(getCookie("login"))

//checks for login status to redirect user to correct page
if (window.location.pathname == "/") {
  if (checkLogin()) {
    window.location = "/home.html"
  } else {
    window.location = "/login.html"
  }
}

if (window.location.pathname == "/home.html") {
  if (!checkLogin()) {
    window.location = "/login.html"
  } else {
    document.querySelector("body").classList.remove("hidden")
  }
}

if (
  window.location.pathname == "/login.html" ||
  window.location.pathname == "/register.html"
) {
  if (checkLogin()) {
    window.location = "/home.html"
  } else {
    document.querySelector("body").classList.remove("hidden")
  }
}
