export function setUserToLocalStorage(user) {
  return localStorage.setItem("user", JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
  return localStorage.removeItem("user");
}

export function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("user"));
}
