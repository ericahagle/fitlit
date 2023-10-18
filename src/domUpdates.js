//NOTE: Your DOM manipulation will occur in this file
const userName = document.querySelector('#welcomeMat');
const userInfo = document.querySelector('#userData');
const waterDay = document.querySelector('#waterDay');
const waterWeek = document.querySelector('#waterWeek')
const sleepDay = document.querySelector('#sleepDay');
const sleepWeek = document.querySelector('#sleepWeek');
const activityWidget = document.querySelector('#stepsDay');
//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

const updateUserName = (userData) => {
  userName.innerHTML += `<h1>${userData.name}</h1>`;
}

const displayUserInfo = (user) => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<p>${user.address}</p> <p>${user.email}</p>`;
}

const  waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<div> <h1>${date}</h1> <p>${hydrationData}</p> </div>`
}
const  waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  for(i = hydrationArray.length - 8 ; i < hydrationArray.length; i++) {
    waterWeek.innerHTML += `<div class = 'week-view'>
                            <p>${hydrationArray[i].date}</p>
                            <p>${hydrationArray[i].numOunces}</p>
                            </div>` 
}
}

const sleepDayUpdate = (date, sleepData) => {
  sleepDay.innerHTML = '';
  sleepDay.innerHTML = `<div> <h1>${date}</h1> <p>${sleepData}</p> </div>`;
}

const sleepWeekUpdate = (sleepArray) => {
  sleepWeek.innerHTML = '';
  for(i = sleepArray.length -8; i < sleepArray.length; i++) {
    sleepWeek.innerHTML += `<div class = 'week-view'>
                            <p>${sleepArray[i].date}</p>
                            <p>${sleepArray[i].hours}</p>
                            <p>${sleepArray[i].quality}</p>
                            </div>` 
  }
}

const activityUpdate = (date, distance, steps, time) => {
  activityWidget.innerHTML = '';
  activityWidget.innerHTML = `<h1>${date}</h1><div><p>${distance}</p><p>${steps}</p><p>${time}</p></div>`;
}

export {
  updateUserName,
  displayUserInfo,
  waterDayUpdate,
  waterWeekUpdate,
  sleepDayUpdate,
  sleepWeekUpdate,
  activityUpdate
}
