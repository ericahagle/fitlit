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

    ////////// Event Listeners //////////
   
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
  });
});
    
//  Listen for the submit button click
submitData.addEventListener("click", () => {
  const hydrationInput = userHydrationData.value;
  const selectedDate = dateInput.value;
  const combinedData = {
    userID: currentUser.id,
    date: selectedDate,
    numOunces: parseInt(hydrationInput),
  };
  // if all inputs have a value, call postHydration data, if not, alert("Please be sure to fill out all submission fields before proceeding.")
  if(!combinedData.date || !combinedData.numOunces){
    alert("Please be sure to fill out all submission fields before proceeding.");
  } else {
  postHydrationData(combinedData)
    .then(addedData => {
      if(!response.ok){
        throw new Error(`Failed to post hydration data: ${error.name}`)
      }
      // Update the currentUser with the new hydration data
      const completeCurrentUser = addDataToCurrentUser(currentUser, addedData, activityData, sleepData);
      // Now update the DOM
      const displayDay = currentDay(completeCurrentUser);
      waterDayUpdate(displayDay, ouncesPerDay(completeCurrentUser, displayDay));
      waterWeekUpdate(getHydrationFor7Days(completeCurrentUser, displayDay));   
      // reset input fields 
      userHydrationData.value = '';
      dateInput.value = '';
    })
    .catch(error => {
      alert("Failed to post hydration data, please ensure all fields are filled out correctly and completely.")
      console.error(error);
    });
  }
});


// alternatively, disable and change color of button until all fields have a value, then enable
//reset form fields

toggleButton.addEventListener('click', toggleAdmin);
