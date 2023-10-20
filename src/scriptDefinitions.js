////////////////////* Generate random number *////////////////////
function generateRandomUserID(usersArray) {
	let randomUserId = Math.floor(Math.random() * usersArray.length) + 1;
	return randomUserId;
}

////////////////////* Create userObject card *////////////////////
function selectCurrentUser(userId, users, hydrationData, sleep, activity) {
  const user = users.find((u) => {
    return u.id === userId;
  });

  if (!user) {
    return 'User not found!';
  }

  const userHydrationData = hydrationData.filter((hData) => {
    return hData.userID === userId;
  });

  // added activity and sleep keys data will be added later
  const currentUser = {
    ...user,
    hydrationData: userHydrationData || [],
    activity: activity || [],
    sleep: sleep || []
  };

  return currentUser;
}

////////////////* Current Day Value *///////////////////////////

const currentDay = (user) => user.hydrationData[user.hydrationData.length-1];

////////////////* Ounces per day *//////////////////////////////////////

function ouncesPerDay(currentUser, date) {

  if (currentUser.hydrationData && currentUser.hydrationData.length > 0) {

    const hydrationDay = currentUser.hydrationData.find((hydrationDate) => {
      return hydrationDate.date === date;
    });
    if (hydrationDay) {
      return hydrationDay.numOunces;
    }
  }
}

////////////////////* Find average step goal amongst all users *////////////////////
function findStepGoalAverage(users) {

  let totalStepCount = 0;

  users.forEach((user) => {
    totalStepCount += user.dailyStepGoal;
  });
  const averageStepCount = (totalStepCount / users.length).toFixed(2);
  return averageStepCount;
}

/////////////////////* LOG HYDRATION FOR 7 DAYS ITERATION 2 *////////////////////////////

function getHydrationFor7Days(currentUser, endDate) {
  
  let endDateObj = new Date(endDate);

  let startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() -6  );

  return currentUser.hydrationData.filter((entry) => {
      let entryDateObj = new Date(entry.date);
      return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
     })
        .map((entry) => {
          return {
            date: entry.date,
            numOunces: entry.numOunces
          };
        });
    }

//////////////////////* HYDRATION AVERAGE ITERATION 2 */////////////////////////////

function calculateTotalHydration(currentUser) {
  let totalHydration = 0;

  currentUser.hydrationData.forEach((hydrationEntry) => {
    totalHydration += hydrationEntry.numOunces / currentUser.hydrationData.length
  });

  return totalHydration.toFixed(2);
}

////////////////////* SLEEP ITERATION 4*///////////////////////////

function calculateAverageHoursSlept(currentUser) {
  let totalHoursSlept = 0; 

  currentUser.sleepData.forEach((sleepEntry) => {
    totalHoursSlept += sleepEntry.hoursSlept /currentUser.sleepData.length
  });

  return totalHoursSlept.toFixed(2);  
}

function calculateAverageSleepQuality(currentUser) {
  let avgSleepQuality = 0; 

  currentUser.sleepData.forEach((sleepEntry) => {
    avgSleepQuality += sleepEntry.sleepQuality / currentUser.sleepData.length
  });

  return avgSleepQuality.toFixed(2);  
}

function hoursSleptGivenDate(currentUser, date) {

  if (currentUser.sleepData && 
      currentUser.sleepData.length > 0) {

    const sleepDate = currentUser.sleepData.find((sleepDate) => {
      return sleepDate.date === date;
    });
    if (sleepDate) {
      return sleepDate.hoursSlept;
    }
  }
}

function sleepQualityGivenDate(currentUser, date) {

  if (currentUser.sleepData && 
      currentUser.sleepData.length > 0) {

    const sleepDate = currentUser.sleepData.find((sleepDate) => {
      return sleepDate.date === date;
    });
    if (sleepDate) {
      return sleepDate.sleepQuality;
    }
  }
}

function getSleepQualityFor7Days(currentUser, endDate) {
  let endDateObj = new Date(endDate);

  let startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() -6  );
  return currentUser.sleepData
    .filter((entry) => {
      let entryDateObj = new Date(entry.date);
      return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
    })
    .map((entry) => {
      return {
        date: entry.date,
        sleepQuality: entry.sleepQuality
      };
    });
}

function getSleepFor7Days(currentUser, endDate) {
  let endDateObj = new Date(endDate);

  let startDateObj = new Date(endDateObj);
  startDateObj.setDate(endDateObj.getDate() -6  );
  return currentUser.sleepData.filter((entry) => {
      let entryDateObj = new Date(entry.date);
      return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
     })
        .map((entry) => {
          return {
            date: entry.date,
            hoursSlept: entry.hoursSlept
          };
        });
    }

////////////////////* How far did you walk today *////////////////////
function findDistanceTraveled(currentUser) {
  const distance = ((currentUser.strideLength * currentUser.activity[currentUser.activity.length - 1].numSteps) / 5280).toFixed(2);
  return distance;
}

///////////////*Step goal ITERATION 5*//////////////////////

function checkStepGoal(currentUser) {
  // Checking if empty
  if (currentUser.activityData.length === 0) {
    return 'No!';
  }

  // Sort
  currentUser.activityData.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Retrieving the most recent activity data.
  const latestActivity = currentUser.activityData[0];

  // Comparing steps to goal
  if (latestActivity.numSteps >= currentUser.dailyStepGoal) {
    return 'Success!';
  } else {
    return 'No!';
  }
};





module.exports = {
  generateRandomUserID,
  selectCurrentUser,
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
  checkStepGoal
};

