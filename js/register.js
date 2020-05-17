import {
  jsRegister,
  registerUsername,
  registerEmail,
  registerPassword,
  registerCPassword,
  registerPhone,
  registerCar,
} from "./selectors.js"
import { registerUser } from "./mock.js"

const init = () => {
  bindEvents()
}

//bind event to register user if validations are successful
const bindEvents = () => {
  document.querySelector(jsRegister).addEventListener("click", async () => {
    const username = document.querySelector(registerUsername).value
    const email = document.querySelector(registerEmail).value
    const password = document.querySelector(registerPassword).value
    const cPassword = document.querySelector(registerCPassword).value
    const phone = document.querySelector(registerPhone).value
    const car = document.querySelector(registerCar).value
    if (
      registerValidation({ username, email, password, cPassword, phone, car })
    ) {
      const userRegistered = await registerUser({ username, password })
      if (userRegistered) {
        window.location = "/login.html"
      }
    }
  })
}
const registerValidation = ({
  username,
  password,
  email,
  cPassword,
  phone,
  car,
}) => {
  //validate inputs
  //show hide err fields
  return (
    (username &&
      password &&
      password.length > 5 &&
      email &&
      password == cPassword &&
      phone &&
      car &&
      true) ||
    false
  )
}
if (window.location.pathname == "/register.html") {
  init()
}
