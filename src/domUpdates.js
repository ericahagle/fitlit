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
const userPage = document.querySelector('#userWrapper');
const adminPage = document.querySelector('#adminWrapper');
const toggleButton = document.querySelector('#toggleButton');

const toggleAdmin = () => {
  userPage.classList.toggle('hidden');
  adminPage.classList.toggle('hidden');
}

const updateUserName = (userData, date) => {
  userName.innerHTML ='';
  userName.innerHTML += `<h1>Hello ${userData.name}!</h1><h2 class='header-ish'>${date}</h2><p class='rectangle'>${userData.address} / ${userData.email}</p>`;
}

const quipBox = () => {
  userInfo.innerHTML = '';
  userInfo.innerHTML = `<h2 class='header-ish' id='snarkyRemark'>Look after your flesh prison today!</h2>`;
}

const waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<h2>Water Today</h2><p>${hydrationData}oz</p><p class='snarky-remark'>No UTIs today!</p>`
}
const waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  const hydrationHTML = hydrationArray.map((oz) => `${oz.numOunces}oz`).join(' / ');
  waterWeek.innerHTML = `<h2>Your Week in Water</h2><p>${hydrationHTML}</p>`;
}

const sleepDayUpdate = (date, sleepHours, sleepQuality) => {
  sleepDay.innerHTML = '';
  sleepDay.innerHTML = `<h2>Sleep Today</h2><p>${sleepHours} hours</p><p>${sleepQuality} quality rating</p>`;
}
 
const sleepWeekUpdate = (sleepTime, sleepQuality) => {
  sleepWeek.innerHTML = '';
  const sleepQualityHTML = sleepQuality.map((html) => `${html.sleepQuality}`).join(' / ');
  const sleepTimeHTML = sleepTime.map((html) => `${html.hoursSlept}h`).join(' / ');
  sleepWeek.innerHTML = `<h2>Your Week in Sleep</h2><p>${sleepTimeHTML}</p><p>${sleepQualityHTML} quality rating</p>`
}

const stepGoalUpdate = (goal) => {
  stepGoal.innerHTML = '';
  stepGoal.innerHTML = `<h2>Your Step Goal</h2><p>${goal} steps</p><p>Just try your best</p>`;
}

const stepsDayUpdate = (date, steps, distance) => {
  stepsDay.innerHTML = '';
  stepsDay.innerHTML = `<h2>Steps Today</h2><p>${steps} steps</p><p>${distance} miles</p>`
}

const activeMinutesUpdate = (time) => {
  activeMinutes.innerHTML = '';
  activeMinutes.innerHTML = `<h2>Active Minutes Today</h2><p>${time} minutes</p><p>ouchie!</p>`;
}

const stepsGoalCompare = (averageGoal) => {
  stepsAverage.innerHTML = '';
  stepsAverage.innerHTML = `<h2>Users' Average Step Goal</h2><p>${averageGoal} steps</p><p>But who's really counting?</p>`;
}

const stepsWeekUpdate = (activityArray) => {
  stepsWeek.innerHTML = '';
  const stepsWeekDay = activityArray.map(day => day.numSteps).join(' steps / ');
  const stepsGoalDay = activityArray.map(day => day.metGoal).join(' / ');
  stepsWeek.innerHTML = `<h2 class='headerIsh'>Your Week in Steps</h2><p class='rectangle'>${stepsWeekDay}</p><p class='rectangle'>${stepsGoalDay}</p>`;
}

const sleepLifeUpdate = (sleepLifeQuality, sleepLifeTime) => {
  sleepLife.innerHTML = '';
  sleepLife.innerHTML = `<h2>Users' Average Sleep</h2><p>${sleepLifeTime}h</p><p>${sleepLifeQuality} quality rating</p>`;
}

export {
  toggleButton,
  toggleAdmin,
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