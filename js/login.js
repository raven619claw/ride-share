import { jsLogin, loginPassword, loginUsername } from "./selectors.js"
import { loginUser } from "./mock.js"

const init = () => {
  bindEvents()
}
const bindEvents = () => {
  document.querySelector(jsLogin).addEventListener("click", async () => {
    const username = document.querySelector(loginUsername).value
    const password = document.querySelector(loginPassword).value
    if (loginValidation({ username, password })) {
      const userLoggedIn = await loginUser({ username, password })
      if (userLoggedIn) {
        document.cookie = "login=true"
        window.location = "/home.html"
      } else {
        document.cookie = "login=false"
      }
    }
  })
}
const loginValidation = ({ username, password }) => {
  //validate inputs
  //show hide err fields
  return (username && password && true) || false
}
if (window.location.pathname == "/login.html") {
  init()
}
