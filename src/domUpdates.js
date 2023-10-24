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
const stepsAverage = document.querySelector('#avgStepGoal');
const stepsWeek = document.querySelector('#stepsWeek');
const sleepLife = document.querySelector('#sleepLife');

const updateUserName = (userData) => {
  userName.innerHTML ='';
  userName.innerHTML += `<h1>Hello</h1><h1>${userData.name}!</h1><p>look after your flesh prison today!</p>`;
}

const displayUserInfo = (user) => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<p>${user.address}</p><p>${user.email}</p>`;
}

const waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<h2>${date}</h1><p>${hydrationData}</p><p class='snarky-remark'>no UTIs today!</p>
  <img src='https://media.tenor.com/BIRrUUfHY9YAAAAd/key-and-peele-jordan-peele.gif' alt='Jordan Peele sweating profusely'>`
}
const waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  const hydrationHTML = hydrationArray.map((oz) => `${oz.numOunces}oz`).join(' ');
  waterWeek.innerHTML = `<h2>your week in oz</h2><p>M T W Th F S Su</p><p>${hydrationHTML}</p>`;
}

const sleepDayUpdate = (date, sleepHours, sleepQuality) => {
  sleepDay.innerHTML = '';
  sleepDay.innerHTML = `<h2>${date}</h2><p>${sleepHours}</p><p>${sleepQuality}</p>`;
}
 
const sleepWeekUpdate = (sleepTime, sleepQuality) => {
  sleepWeek.innerHTML = '';
  const sleepQualityHTML = sleepQuality.map((html) => `${html.sleepQuality}`).join(' ');
  const sleepTimeHTML = sleepTime.map((html) => `${html.hoursSlept}h`).join(' ');
  sleepWeek.innerHTML = `<h2>your week in hrs</h2><p>${sleepQualityHTML}</p><p>${sleepTimeHTML}</p>`
}

const stepGoalUpdate = (goal) => {
  stepGoal.innerHTML = '';
  stepGoal.innerHTML = `<h2>your step goal</h2><p>${goal}</p><p>just try your best</p>`;
}

const stepsDayUpdate = (date, steps, distance) => {
  stepsDay.innerHTML = '';
  stepsDay.innerHTML = `<h2>steps today</h2><p>${date}</p><p>${steps}</p><p>${distance}</p>`
}

const activeMinutesUpdate = (time) => {
  activeMinutes.innerHTML = '';
  activeMinutes.innerHTML = `<h2>active minutes</h2><p>${time}</p><p>ouchie!</p>`;
}

const stepsGoalCompare = (averageGoal) => {
  stepsAverage.innerHTML = '';
  stepsAverage.innerHTML = `<h2>average all-time step goal</h2><p>${averageGoal}</p><p>but who's really counting?</p>`;
}

const stepsWeekUpdate = (activityArray) => {
  stepsWeek.innerHTML = '';
  const stepsWeekDay = activityArray.map(day => day.numSteps).join(' ');
  const stepsGoalDay = activityArray.map(day => day.metGoal).join(' ');
  stepsWeek.innerHTML = `<h2>your week in steps</h2><p>${stepsWeekDay}</p><p>${stepsGoalDay}</p>`;
}

const sleepLifeUpdate = (sleepLifeQuality, sleepLifeTime) => {
  sleepLife.innerHTML = '';
  sleepLife.innerHTML = `<h2>average all-time sleep</h2><p>${sleepLifeQuality}</p><p>${sleepLifeTime}</p>`;
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
  stepsGoalCompare,
  stepsWeekUpdate,
  sleepLifeUpdate
}
