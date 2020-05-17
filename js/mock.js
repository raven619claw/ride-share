import { updateKey } from "./store.js"

//acts as the promise based mock API
export const loginUser = ({ username, password }) => {
  return new Promise((resolve) => {
    const users = window.store.users
    let userExists = false
    let usersUpdated = users.map((user) => {
      if (user.username == username && user.password == password) {
        userExists = true
        user.active = true
      }
      return user
    })
    updateKey("users", usersUpdated)
    resolve(userExists)
  })
}

export const logoutUser = () => {
  return new Promise((resolve) => {
    const users = window.store.users
    let usersUpdated = users.map((user) => {
      user.active = false

      return user
    })
    updateKey("users", usersUpdated)
    document.cookie = "login=false"
    resolve()
  })
}

export const registerUser = (user) => {
  return new Promise((resolve) => {
    updateKey("users", [...store.users, user])
    resolve(true)
  })
}

export const updateDriverAvail = (driverToUpdate) => {
  return new Promise((resolve, reject) => {
    let flag = false
    const drivers = window.store.drivers
    const users = window.store.users
    const updatedUsersActiveRide = users.map((user) => {
      if (user.active) {
        if (!user.activeRide) {
          user.activeRide = driverToUpdate.id
        } else {
          flag = true
          reject()
        }
      }
      return user
    })
    if (flag) {
      return
    }
    const updatedDrivers = drivers.map((driver) => {
      if (driverToUpdate.id === driver.id) {
        driver.seats--
      }
      return driver
    })
    updateKey("drivers", updatedDrivers)
    updateKey("users", updatedUsersActiveRide)
    resolve(true)
  })
}

export const endActiveRide = () => {
  return new Promise((resolve, reject) => {
    const drivers = window.store.drivers
    const users = window.store.users
    const activeUser = users.find(({ active }) => active)
    const activeDriver = drivers.find(({ id }) => id == activeUser.activeRide)
    const updatedDrivers = drivers.map((driver) => {
      if (activeDriver.id === driver.id) {
        driver.seats++
      }
      return driver
    })
    const updatedUsers = users.map((user) => {
      if (user.active) {
        user.activeRide = false
      }
      return user
    })
    updateKey("drivers", updatedDrivers)
    updateKey("users", updatedUsers)
    resolve(true)
  })
}
