///////////////// Global Variables ///////////////////
let currentUser = null;

/////////// Import CSS File /////////////
import './css/styles.css';

//////////// Import fetch call from apiCalls.js //////////////
import { fetchAllTheData, allUsers, hydrationData, activityData, sleepData } from './apiCalls';

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
  } from './scriptDefinitions';

///////////// Import functions from domUpdates.js ///////////////
import {  toggleButton,
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
    stepsWeekUpdate,
    stepsGoalCompare,
    sleepLifeUpdate  } from './domUpdates';

    ////////// Event Listeners //////////
window.addEventListener('load', () => {
  fetchAllTheData()
  .then(data => {
    currentUser = allUsers[generateRandomUserID(allUsers) - 1];
    const completeCurrentUser = addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData);
    const displayDay = currentDay(completeCurrentUser);
    updateUserName(currentUser, displayDay);
    quipBox();
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

toggleButton.addEventListener('click', toggleAdmin);