////////////////////* Generate random number *////////////////////
function generateRandomUserID(usersArray) {
	let randomUserId = Math.floor(Math.random() * usersArray.length) + 1;
	return randomUserId;
}

////////////////////* Create complete userObject card *////////////////////
function addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData) {

	const userHydrationData = hydrationData.filter((hData) => {
		return hData.userID === currentUser.id;
	});

	const userActivityData = activityData.filter((aData) => {
		return aData.userID === currentUser.id;
	});

	const userSleepData = sleepData.filter((sData) => {
		return sData.userID === currentUser.id;
	});

	const completeCurrentUser = {
		...currentUser,
		hydrationData: userHydrationData || [],
		activityData: userActivityData || [],
		sleepData: userSleepData || []
	};

	return completeCurrentUser;
}

////////////////* Current Day Value *///////////////////////////

const currentDay = (user) => user.hydrationData[user.hydrationData.length-1].date;

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

////////////////////* How far did you walk today miles ITERATION 5 *////////////////////
function findDistanceTraveled(currentUser) {
  const distance = ((currentUser.strideLength * currentUser.activityData[currentUser.activityData.length - 1].numSteps) / 5280).toFixed(2);
  return distance;
}

 ///////////////*Minutes user was active on given day ITERATION 5*/////////////////////

 function minutesActiveGivenDate(currentUser, date) {

  if (currentUser.activityData &&
      currentUser.activityData.length > 0) {

    const activityDate = currentUser.activityData.find((specificDate) => {
      return specificDate.date === date;
    });
    if (activityDate) {
      return activityDate.minutesActive;
    }
  }
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

function checkStepGoal7Days(currentUser) {

  if (currentUser.activityData.length === 0) {
    return 'No activity data available!';
  }
  currentUser.activityData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const lastWeekActivity = currentUser.activityData.slice(0, 7);

  const results = lastWeekActivity.map((activity) => {
    let metGoal;

    if (activity.numSteps >= currentUser.dailyStepGoal) {
      metGoal = 'You did it!';
    } else {
      metGoal = 'Keep trying!';
    }
    return {
      date: activity.date,
      numSteps: activity.numSteps,
      metGoal: metGoal
    };
  });
  return results;
};


/////////////////*ITERATION 5 num steps on given date*/////////////////

function numberOfStepsGivenDate(currentUser, date) {

  if (currentUser.activityData && 
      currentUser.activityData.length > 0) {

    const activityDate = currentUser.activityData.find((specificDate) => {
      return specificDate.date === date;
    });
    if (activityDate) {
      return activityDate.numSteps;
    }
  }
}

function initializeDatePicker() {
  function handleDateSelection(instance, date) {
      const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
      dateInput.value = formattedDate;
  }

  const dateInput = document.querySelector('#datepicker');
  
  // Set the start date to 2023/07/02
  const startDate = new Date('2023-07-03');

  const picker = datepicker(dateInput, {
      minDate: startDate,
      onSelect: handleDateSelection
  });
}


///NEW hydration average
function findTopDrinkers(hydrationData, users) {
  // Map over users to calculate total ounces and average for each
  let userHydrationDetails = users.map((user) => {
    let userHydrationEntries = hydrationData.filter((entry) => {
      return entry.userID === user.id;
    });

    let totalOunces = userHydrationEntries.reduce((acc, curr) => acc + curr.numOunces, 0);

    // Calculate the average ounces per entry
    let averageOunces = totalOunces / userHydrationEntries.length;

    return { 
      userID: user.id, 
      totalOunces: totalOunces,
      averageOunces: averageOunces
    };
  });

  // Sort users by total ounces
  let sortedByOunces = userHydrationDetails.sort((a, b) => a.totalOunces - b.totalOunces);

  // Slice to get top entries
  let bottomDrinkers = sortedByOunces.slice(0, 10);

  // Map to include user names
  return bottomDrinkers.map((drinker) => {
    // Find the user to include the name
    let user = users.find((u) => u.id === drinker.userID);

    return { 
      ...drinker, 
      userName: user.name,
      averageOunces: drinker.averageOunces
    };
  });
}


// Sleep
function findTopSleepers(sleepData, users) {
  // Map over users to calculate total hours slept and average hours slept for each
  let userSleepDetails = users.map((user) => {
    // Filter sleep entries for the current user
    let userSleeps = sleepData.filter((sleep) => sleep.userID === user.id);

    // Sum up all hours slept for the user
    let totalHoursSlept = userSleeps.reduce((acc, curr) => acc + curr.hoursSlept, 0);
    // Calculate the average hours slept per entry for the user
    let averageHoursSlept = totalHoursSlept / userSleeps.length;

    // Return object for the user
    return {
      userID: user.id,
      totalHoursSlept: totalHoursSlept,
      averageHoursSlept: averageHoursSlept
    };
  });

  // Sort the summary objects by total hours slept in descending order
  let sortedBySleep = userSleepDetails.sort((a, b) => a.totalHoursSlept - b.totalHoursSlept);
  // Slice the top 10 users with the most hours slept
  let bottomSleepers = sortedBySleep.slice(0, 10);

  // Map over the top sleepers to add user names
  return bottomSleepers.map((sleeper) => {
    // Find the user object to retrieve the user's name
    let user = users.find((u) => u.id === sleeper.userID);
    // Return object including the user's name
    return {
      ...sleeper,
      userName: user.name
    };
  });
}


// Activity
function findTopStepTakers(activityData, users) {
  // Map over users to calculate total steps and average steps for each
  let userStepDetails = users.map((user) => {
    // Filter activity entries for the current user
    let userActivities = activityData.filter((activity) => activity.userID === user.id);

    // Sum up all steps for the user
    let totalSteps = userActivities.reduce((acc, curr) => acc + curr.numSteps, 0);
    // Calculate the average steps per entry for the user
    let averageSteps = totalSteps / userActivities.length;

    // Return object for the user
    return {
      userID: user.id,
      totalSteps: totalSteps,
      averageSteps: averageSteps
    };
  });

  // Sort the summary objects by total steps in descending order
  let sortedBySteps = userStepDetails.sort((a, b) => a.totalSteps - b.totalSteps);
  // Slice the top 10 users with the most steps
  let bottomStepTakers = sortedBySteps.slice(0, 10);

  // Map over the top step takers to add user names
  return bottomStepTakers.map((taker) => {
    // Find the user object to retrieve the user's name
    let user = users.find((u) => u.id === taker.userID);
    // Return a new object including the user's name
    return {
      ...taker,
      userName: user.name
    };
  });
}



module.exports = {
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
  minutesActiveGivenDate,
  checkStepGoal,
  checkStepGoal7Days,
  numberOfStepsGivenDate,
  initializeDatePicker,
  findTopDrinkers,
  findTopSleepers,
  findTopStepTakers
};
