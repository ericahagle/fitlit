//NOTE: Your DOM manipulation will occur in this file
const userInfo = document.querySelector('#userData');

//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.
const exampleFunction1 = (person) => {
  console.log(`oh hi there ${person}`)
}

const exampleFunction2 = (person) => {
  console.log(`bye now ${person}`)
}

const displayUserInfo = (user) => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<p>${user.address}</p> <p>${user.email}</p>`;
}
export {
  exampleFunction1,
  exampleFunction2,
  displayUserInfo
}

  