//NOTE: Your DOM manipulation will occur in this file
const userName = document.querySelector('#welcomeMat');

const updateUserName = (userData) => {
  userName.innerHTML += `<h1>${userData.name}</h1>`;
}

export {
  updateUserName
}

const userInfo = document.querySelector('#userData');

const displayUserInfo = (user) => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<p>${user.address}</p> <p>${user.email}</p>`;
}
export {
  displayUserInfo
}
