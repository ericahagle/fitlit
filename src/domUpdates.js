//NOTE: Your DOM manipulation will occur in this file
const userInfo = document.querySelector('#userData');

const displayUserInfo = (user) => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<p>${user.address}</p> <p>${user.email}</p>`;
}
export {
  displayUserInfo
}

  