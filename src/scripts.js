///////////////// Global Variables ///////////////////
let currentUser = null;

/////////// Import CSS File /////////////
import './css/styles.css';

//////////// Import fetch call from apiCalls.js //////////////
import { fetchAllTheData, allUsers, hydrationData, activityData, sleepData,  postHydrationData } from './apiCalls';

//////////// Import functions from scriptDefinitions //////////////
import {
  generateRandomUserID,
  addDataToCurrentUser,
  currentDay,
  findStepGoalAverage,
  calculateTotalHydration,
  findDistanceTraveled,
  getHydrationFor7Days,
  ouncesPerDay,
  calculateAverageHoursSlept,
  calculateAverageSleepQuality,
  hoursSleptGivenDate,
  sleepQualityGivenDate,
  getSleepQualityFor7Days,
  getSleepFor7Days,
  numberOfStepsGivenDate,
  checkStepGoal,
  minutesActiveGivenDate,
  checkStepGoal7Days, 
  initializeDatePicker,
  } from './scriptDefinitions';

///////////// Import from domUpdates.js ///////////////

import {  
  toggleButton,
  toggleAdmin,
  updateUserName,
  waterDayUpdate,
  waterWeekUpdate,
  sleepDayUpdate,
  sleepWeekUpdate,
  stepGoalUpdate,
  stepsDayUpdate,
  activeMinutesUpdate,
  stepsWeekUpdate,
  stepsGoalCompare,
  sleepLifeUpdate,
  dateInput,
  submitData,
  userHydrationData  } from './domUpdates';

////////////// Event Listeners //////////
   
window.addEventListener('load', () => {
  initializeDatePicker()
  fetchAllTheData()
  .then(data => {
    currentUser = allUsers[generateRandomUserID(allUsers) - 1];
    const completeCurrentUser = addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData);
    const displayDay = currentDay(completeCurrentUser);
    updateUserName(currentUser, displayDay);
    waterDayUpdate(displayDay, ouncesPerDay(completeCurrentUser, displayDay));
    waterWeekUpdate(getHydrationFor7Days(completeCurrentUser, displayDay));
    sleepDayUpdate(displayDay, hoursSleptGivenDate(completeCurrentUser, displayDay), sleepQualityGivenDate(completeCurrentUser, displayDay));
    sleepWeekUpdate(getSleepFor7Days(completeCurrentUser, displayDay), getSleepQualityFor7Days(completeCurrentUser, displayDay));
    stepGoalUpdate(completeCurrentUser.dailyStepGoal);
    stepsDayUpdate(displayDay, numberOfStepsGivenDate(completeCurrentUser, displayDay), findDistanceTraveled(completeCurrentUser));
    activeMinutesUpdate(minutesActiveGivenDate(completeCurrentUser, displayDay));
    stepsWeekUpdate(checkStepGoal7Days(completeCurrentUser));
    stepsGoalCompare(findStepGoalAverage(allUsers));
    sleepLifeUpdate(calculateAverageSleepQuality(completeCurrentUser), calculateAverageHoursSlept(completeCurrentUser));
  })
  .catch(error => {
    alert("Something went wrong: Failed to get data.")
    console.log(error);
  });
});

submitData.addEventListener("click", () => {
  const hydrationInput = userHydrationData.value;
  const selectedDate = dateInput.value;
  const combinedData = {
    userID: currentUser.id,
    date: selectedDate,
    numOunces: parseInt(hydrationInput),
  };
  if(!combinedData.date || !combinedData.numOunces){
    alert("Please be sure to fill out all submission fields before proceeding.");
  } else {
  postHydrationData(combinedData)
    .then(addedData => {
      const completeCurrentUser = addDataToCurrentUser(currentUser, addedData, activityData, sleepData);
      const displayDay = currentDay(completeCurrentUser);
      waterDayUpdate(displayDay, ouncesPerDay(completeCurrentUser, displayDay));
      waterWeekUpdate(getHydrationFor7Days(completeCurrentUser, displayDay));   
      userHydrationData.value = '';
      dateInput.value = '';
    })
    .catch(error => {
      alert("Something went wrong: Failed to post hydration data.")
      console.log(error);
    });
  }
});

toggleButton.addEventListener('click', toggleAdmin);
