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

////////////////*ITERATION 7 POST support*/////////////////

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

// disabled dates after data entry
// unsure about formattedDate being usable here or if these need to be written pre-formatting
//.push() the selected date to blackoutDates each time user info is submitted so they cannot be selected again
// const blackoutDates = datepicker('.some-input', {
//   disabledDates: [
//     // new Date(2099, 0, 5),
//     // new Date(2099, 0, 6),
//     // new Date(2099, 0, 7),
//   ]
// })

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
  initializeDatePicker
};
