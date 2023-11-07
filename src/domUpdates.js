const userName = document.querySelector('#welcomeMat');
// const userInfo = document.querySelector('#userData');
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
const userHydrationData = document.querySelector('#hydrationInput');
const submitData = document.querySelector("#submitData");
const dateInput = document.querySelector("#datepicker");
const mainButton = document.querySelector('#mainButton');
const mainButton2 = document.querySelector('#mainButton2');
const userDataWrapper = document.querySelector('#userDataWrapper');
const overallDataWrapper = document.querySelector('#overallDataWrapper');
const userAdminButton = document.querySelector('#userDataButton');
const overallAdminButton = document.querySelector('#overallDataButton');
const bottomSleepersList = document.querySelector('#sleepAverages');
const bottomDrinkersList = document.querySelector('#waterAverages');
const bottomSteppersList = document.querySelector('#stepsAverages');
const adminBasicInfo = document.querySelector('#basicInfo');
const adminSleepInfo = document.querySelector('#sleepInfo');
const adminWaterInfo = document.querySelector('#waterInfo');
const adminStepsInfo = document.querySelector('#stepsInfo');
const userEmailInput = document.querySelector('#userEmail');
const adminSearchButton = document.querySelector('#adminSearch');

const toggleAdmin = () => {
  userPage.classList.toggle('hidden');
  adminPage.classList.toggle('hidden');
}

const toggleAdminData = () => {
  if(userAdminButton.disabled) {
    userAdminButton.style.backgroundColor='#003249';
    userAdminButton.style.color='white';
    overallAdminButton.style.backgroundColor='white';
    overallAdminButton.style.color='black';
    userAdminButton.disabled=!userAdminButton.disabled;
    overallAdminButton.disabled=!overallAdminButton.disabled;
  }
  else if(overallAdminButton.disabled) {
    overallAdminButton.style.backgroundColor='#003249';
    overallAdminButton.style.color='white';
    userAdminButton.style.backgroundColor='white';
    userAdminButton.style.color='black';
    overallAdminButton.disabled=!overallAdminButton.disabled;
    userAdminButton.disabled=!userAdminButton.disabled;
  }
  userDataWrapper.classList.toggle('hidden');
  overallDataWrapper.classList.toggle('hidden');
}

const updateUserName = (userData, date) => {
  userName.innerHTML ='';
  userName.innerHTML += `<h1>Hello ${userData.name}!</h1><h2 class='header-ish'>${date}</h2><p class='rectangle'>${userData.address} / ${userData.email}</p>`;
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

const adminBasicInfoDisplay = (basicInfo) => {
  adminBasicInfo.innerHTML = '';
  adminBasicInfo.innerHTML += `<h2>${basicInfo.name}</h2><p>${basicInfo.address} / ${basicInfo.email}</p>`;
}

const adminWaterInfoDisplay = (waterWeek) => {
  adminWaterInfo.innerHTML = '';
  const waterData = waterWeek.map((oz) => `${oz.numOunces}oz`).join(' / ');
  adminWaterInfo.innerHTML = `<h2>Week in Water</h2><p>${waterData}</p>`;
}

const adminStepsInfoDisplay = (stepsWeek) => {
  adminStepsInfo.innerHTML = '';
  const dailySteps = stepsWeek.map(day => day.numSteps).join(' steps / ');
  adminStepsInfo.innerHTML = `<h2>Week in Steps</h2><p>${dailySteps}</p>`
}

const adminSleepInfoDisplay = (sleepTimeWeek, sleepQualityWeek) => {
  adminSleepInfo.innerHTML = '';
  const sleepQualityData = sleepQualityWeek.map((html) => `${html.sleepQuality}`).join(' / ');
  const sleepTimeData = sleepTimeWeek.map((html) => `${html.hoursSlept}h`).join(' / ');
  adminSleepInfo.innerHTML = `<h2>Week in Sleep</h2><p>${sleepTimeData}</p><h2>Week in Sleep Quality</h2><p>${sleepQualityData} quality rating</p>`
}

const displayBottomDrinkers = (bottomDrinkers) => {
  bottomDrinkersList.innerHTML = '';
  const drink10 = bottomDrinkers.map(data => `<li>${data.userName} ${data.averageOunces.toFixed(2)} Ounces`).join('');
  bottomDrinkersList.innerHTML += drink10;
}

const displayBottomSleepers = (bottomSleepers) => {
  bottomSleepersList.innerHTML = '';
  const sleep10 = bottomSleepers.map(data => `<li>${data.userName} ${data.averageHoursSlept.toFixed(2)} hours`).join('');
  bottomSleepersList.innerHTML += sleep10;
}

const displayBottomSteppers = (bottomSteppers) => {
  bottomSteppersList.innerHTML = '';
  const step10 = bottomSteppers.map(data => `<li>${data.userName} ${data.averageSteps.toFixed(2)} Steps`).join('');
  bottomSteppersList.innerHTML += step10;
}

export {
  toggleButton,
  userAdminButton,
  overallAdminButton,
  toggleAdmin,
  toggleAdminData,
  updateUserName,
  waterDayUpdate,
  waterWeekUpdate,
  sleepDayUpdate,
  sleepWeekUpdate,
  stepGoalUpdate,
  stepsDayUpdate,
  activeMinutesUpdate,
  stepsGoalCompare,
  stepsWeekUpdate,
  sleepLifeUpdate,
  adminBasicInfoDisplay,
  adminWaterInfoDisplay,
  adminStepsInfoDisplay,
  adminSleepInfoDisplay,
  displayBottomDrinkers,
  displayBottomSleepers,
  displayBottomSteppers,
  dateInput,
  submitData,
  userHydrationData,
  mainButton,
  mainButton2,
  userEmailInput,
  adminSearchButton
}