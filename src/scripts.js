///////////////// Global Variables ///////////////////
let allUsers = null;
let currentUser = null;
let hydrationData = null;
let activityData = null;
let sleepData = null;

/////////// Import CSS File /////////////
import './css/styles.css';

//////////// Import fetch call from apiCalls.js //////////////
import { fetchAllTheData } from './apiCalls';

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
  getSleepFor7Days } from './scriptDefinitions';

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
    stepsWeekUpdate} from './domUpdates';

    ////////// Event Listeners //////////
window.addEventListener('load', () => {
  fetchAllTheData()
	.then(data => {
		allUsers = allUsers;
		// console.log(allUsers);
		currentUser = allUsers[generateRandomUserID(allUsers) - 1];
		// console.log(currentUser);
		hydrationData = hydrationData;
		// console.log(hydrationData);
		activityData = activityData;
		// console.log(activityData);
		sleepData = sleepData;
		// console.log(sleepData);
    const completeCurrentUser = addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData);
		// console.log("Complete user:", completeCurrentUser);
	});
});

