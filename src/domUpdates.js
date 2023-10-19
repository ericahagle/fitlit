//NOTE: Your DOM manipulation will occur in this file
const userName = document.querySelector('#welcomeMat');
const userInfo = document.querySelector('#userData');
const waterDay = document.querySelector('#waterDay');
const waterWeek = document.querySelector('#waterWeek')
const sleepDay = document.querySelector('#sleepDay');
const sleepWeek = document.querySelector('#sleepWeek');
const stepGoal = document.querySelector('#stepGoal');
const stepsDay = document.querySelector('#stepsDay');
const activeMinutes = document.querySelector('#activeMinutes');
const stepsWeek = document.querySelector('#stepsWeek');
//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

const updateUserName = (userData) => {
  userName.innerHTML += `<h1>Hello!</h1><h1>${userData.name}</h1>`;
}

const displayUserInfo = (user) => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<p>${user.address}</p><p>${user.email}</p>`;
}

const  waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<h2>${date}</h1><p>${hydrationData}</p>`
}
const  waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  const hydrationHTML = hydrationArray.map((html) => `<p>${html}</p>`).join('');
  waterWeek.innerHTML = `<h2>your week in oz</h2>${hydrationHTML}`;
}

const sleepDayUpdate = (date, sleepData) => {
  sleepDay.innerHTML = '';
  sleepDay.innerHTML = `<h1>${date}</h1><p>${sleepData}</p>`;
}
 
const sleepWeekUpdate = (sleepQuality, sleepTime) => {
  sleepWeek.innerHTML = '';
  const sleepQualityHTML = sleepQuality.map((html) => `<p>${html}</p>`).join('');
  const sleepTimeHTML = sleepTime.map((html) => `<p>${html}</p>`).join('');
  sleepWeek.innerHTML = `<h2>your week in hrs</h2>${sleepQualityHTML}${sleepTimeHTML}`
}

const stepGoalUpdate = (goal) => {
  stepGoal.innerHTML = '';
  stepGoal.innerHTML = `<h2>Your Step Goal</h2>
                              <p>${goal}</p>`;
}

const stepsDayUpdate = (date, steps, distance) => {
  stepsDay.innerHTML = '';
  stepsDay.innerHTML = `<h2>your step goal</h2><p>${date}</p><p>${steps}</p><p>${distance}</p>`
}

const activeMinutesUpdate = (time) => {
  activeMinutes.innerHTML = '';
  activeMinutes.innerHTML = `<h2>active minutes</h2><p>${time}</p>`;
}

const stepsWeekUpdate = (activityArray) => {
  stepsWeek.innerHTML = '';
  const activityDisplay = activityArray.map((html) => `<p>${html}</p>`).join('');
  stepsWeek.innerHTML = `<h2>Step Goals Week</h2>${activityDisplay}`;
}

export {
  updateUserName,
  displayUserInfo,
  waterDayUpdate,
  waterWeekUpdate,
  sleepDayUpdate,
  sleepWeekUpdate,
  stepGoalUpdate,
  stepsDayUpdate,
  activeMinutesUpdate,
  stepsWeekUpdate
}
