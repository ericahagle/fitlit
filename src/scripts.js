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
  findBottomDrinkers,
  findBottomSleepers,
  findBottomStepTakers
  } from './scriptDefinitions';

///////////// Import from domUpdates.js ///////////////

import {  
  toggleButton,
  userAdminButton,
  overallAdminButton,
  toggleAdmin,
  toggleAdminData,
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
  sleepLifeUpdate,
  dateInput,
  adminBasicInfoDisplay,
  adminWaterInfoDisplay,
  adminStepsInfoDisplay,
  adminSleepInfoDisplay,
  displayBottomDrinkers,
  displayBottomSleepers,
  displayBottomSteppers,  
  submitData,
  userHydrationData,  
  mainButton,
  mainButton2,} from './domUpdates';

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
    displayBottomDrinkers(findBottomDrinkers(hydrationData, allUsers));
    displayBottomSleepers(findBottomSleepers(sleepData, allUsers));
    displayBottomSteppers(findBottomStepTakers(activityData, allUsers));
    adminBasicInfoDisplay(currentUser);
    adminWaterInfoDisplay(getHydrationFor7Days(completeCurrentUser, displayDay));
    adminStepsInfoDisplay(checkStepGoal7Days(completeCurrentUser))
    adminSleepInfoDisplay(getSleepFor7Days(completeCurrentUser, displayDay), getSleepQualityFor7Days(completeCurrentUser, displayDay));
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

  postHydrationData(combinedData)
    .then(addedData => {
      // Update the currentUser with the new hydration data
      const completeCurrentUser = addDataToCurrentUser(currentUser, addedData, activityData, sleepData);
      // Now update the DOM
      const displayDay = currentDay(completeCurrentUser);
      waterDayUpdate(displayDay, ouncesPerDay(completeCurrentUser, displayDay));
      waterWeekUpdate(getHydrationFor7Days(completeCurrentUser, displayDay));
    })
    .catch(error => {
      console.error("Failed to post hydration data:", error);
    });
});


toggleButton.addEventListener('click', toggleAdmin);
mainButton.addEventListener('click', toggleAdmin);
mainButton2.addEventListener('click', toggleAdmin);
userAdminButton.addEventListener('click', toggleAdminData);
overallAdminButton.addEventListener('click', toggleAdminData);
