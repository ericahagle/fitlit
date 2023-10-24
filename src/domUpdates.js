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

const updateUserName = (userData, date) => {
  userName.innerHTML ='';
  userName.innerHTML += `<h1>Hello ${userData.name}!</h1><h2 class='headerIsh'>${date}</h2><p>${userData.address} ${userData.email}</p>`;
}

const quipBox = () => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<h2 id='snarkyRemark'>look after your flesh prison today!</h2>`;
}

const waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<h2>water today</h2><p>${hydrationData}oz</p><p class='snarky-remark'>no UTIs today!</p>`
}
const waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  const hydrationHTML = hydrationArray.map((oz) => `${oz.numOunces}oz`).join(' / ');
  waterWeek.innerHTML = `<h2>your week in water</h2><p>${hydrationHTML}</p>`;
}

const sleepDayUpdate = (date, sleepHours, sleepQuality) => {
  sleepDay.innerHTML = '';
  sleepDay.innerHTML = `<h2>sleep today</h2><p>${sleepHours} hours</p><p>${sleepQuality} quality rating</p>`;
}
 
const sleepWeekUpdate = (sleepTime, sleepQuality) => {
  sleepWeek.innerHTML = '';
  const sleepQualityHTML = sleepQuality.map((html) => `${html.sleepQuality}`).join(' / ');
  const sleepTimeHTML = sleepTime.map((html) => `${html.hoursSlept}h`).join(' / ');
  sleepWeek.innerHTML = `<h2>your week in sleep</h2><p>${sleepTimeHTML}</p><p>${sleepQualityHTML} quality rating</p>`
}

const stepGoalUpdate = (goal) => {
  stepGoal.innerHTML = '';
  stepGoal.innerHTML = `<h2>your step goal</h2><p>${goal} steps</p><p>just try your best</p>`;
}

const stepsDayUpdate = (date, steps, distance) => {
  stepsDay.innerHTML = '';
  stepsDay.innerHTML = `<h2>steps today</h2><p>${steps} steps</p><p>${distance} miles</p>`
}

const activeMinutesUpdate = (time) => {
  activeMinutes.innerHTML = '';
  activeMinutes.innerHTML = `<h2>active minutes today</h2><p>${time} minutes</p><p>ouchie!</p>`;
}

const stepsGoalCompare = (averageGoal) => {
  stepsAverage.innerHTML = '';
  stepsAverage.innerHTML = `<h2>users' average step goal</h2><p>${averageGoal} steps</p><p>but who's really counting?</p>`;
}

const stepsWeekUpdate = (activityArray) => {
  stepsWeek.innerHTML = '';
  const stepsWeekDay = activityArray.map(day => day.numSteps).join(' steps / ');
  const stepsGoalDay = activityArray.map(day => day.metGoal).join(' / ');
  stepsWeek.innerHTML = `<h2 class='headerIsh'>your week in steps</h2><p class='rectangle'>${stepsWeekDay}</p><p class='rectangle'>${stepsGoalDay}</p>`;
}

const sleepLifeUpdate = (sleepLifeQuality, sleepLifeTime) => {
  sleepLife.innerHTML = '';
  sleepLife.innerHTML = `<h2>users' average sleep</h2><p>${sleepLifeTime}h</p><p>${sleepLifeQuality} quality rating</p>`;
}

export {
  updateUserName,
  quipBox,
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
