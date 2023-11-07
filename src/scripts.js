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
  findBottomStepTakers,
  findUserByEmail
  } from './scriptDefinitions';

///////////// Import from domUpdates.js ///////////////

import {  
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
  mainButton2,
  userEmailInput,
  adminSearchButton
} from './domUpdates';

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
    displayBottomDrinkers(findBottomDrinkers(hydrationData, allUsers));
    displayBottomSleepers(findBottomSleepers(sleepData, allUsers));
    displayBottomSteppers(findBottomStepTakers(activityData, allUsers));
    adminBasicInfoDisplay(currentUser);
    adminWaterInfoDisplay(getHydrationFor7Days(completeCurrentUser, displayDay));
    adminStepsInfoDisplay(checkStepGoal7Days(completeCurrentUser));
    adminSleepInfoDisplay(getSleepFor7Days(completeCurrentUser, displayDay), getSleepQualityFor7Days(completeCurrentUser, displayDay));
    submitData.disabled = false;
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
        submitData.disabled = true;
    })
    .catch(error => {
      alert("Something went wrong: Failed to post hydration data.")
      console.log(error);
    });
  }
});

adminSearchButton.addEventListener("click", () => {
  fetchAllTheData()
  .then(data => {
    const foundUser = findUserByEmail(userEmailInput.value, allUsers)
    const completeFoundUser = addDataToCurrentUser(foundUser, hydrationData, activityData, sleepData);
    console.log(completeFoundUser);
    const displayDay = currentDay(completeFoundUser);
    console.log(adminBasicInfoDisplay(foundUser));
    adminWaterInfoDisplay(getHydrationFor7Days(completeFoundUser, displayDay));
    adminStepsInfoDisplay(checkStepGoal7Days(completeFoundUser));
    adminSleepInfoDisplay(getSleepFor7Days(completeFoundUser, displayDay), getSleepQualityFor7Days(completeFoundUser, displayDay));
  })
  .catch(error => {
    alert("Something went wrong: Failed to get data.");
    console.log(error);
  });
});

toggleButton.addEventListener('click', toggleAdmin);
mainButton.addEventListener('click', toggleAdmin);
mainButton2.addEventListener('click', toggleAdmin);
userAdminButton.addEventListener('click', toggleAdminData);
overallAdminButton.addEventListener('click', toggleAdminData);
