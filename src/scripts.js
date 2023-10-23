///////////////// Global Variables ///////////////////
let currentUser = null;

/////////// Import CSS File /////////////
import './css/styles.css';

//////////// Import fetch call from apiCalls.js //////////////
import { fetchAllTheData, allUsers, hydrationData, activityData, sleepData } from './apiCalls';

//////////// Import functions from scriptDefinitions //////////////
import { generateRandomUserID,
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
  } from './scriptDefinitions';

///////////// Import functions from domUpdates.js ///////////////
import {  updateUserName,
    displayUserInfo,
    waterDayUpdate,
    waterWeekUpdate,
    sleepDayUpdate,
    sleepWeekUpdate,
    stepGoalUpdate,
    stepsDayUpdate,
    activeMinutesUpdate,
    stepsWeekUpdate,
    stepsGoalCompare,
    sleepLifeUpdate  } from './domUpdates';

    ////////// Event Listeners //////////
window.addEventListener('load', () => {
  fetchAllTheData()
	.then(data => {
		currentUser = allUsers[generateRandomUserID(allUsers) - 1];
    const completeCurrentUser = addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData);
  });
});
