////////////////////* Generate random number *////////////////////
function generateRandomUserID() {
  return Math.floor(Math.random() * 10) + 1;
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

/////////////////////* Log the hydration for 7 days *////////////////////////////

function getHydrationFor7Days(currentUser, startDate) {

  let startDateObj = new Date(startDate);

  let endDateObj = new Date(startDateObj);
  endDateObj.setDate(endDateObj.getDate() + 6);

  return currentUser.hydrationData.filter((entry) => {
    let entryDateObj = new Date(entry.date);
    return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
  });
}

//////////////////////* HYDRATION AVERAGE */////////////////////////////

function calculateTotalHydration(currentUser) {
  let totalHydration = 0;

  currentUser.hydrationData.forEach((hydrationEntry) => {
    totalHydration += hydrationEntry.numOunces / currentUser.hydrationData.length
  });

  return totalHydration.toFixed(2);
}

////////////////////* How far did you walk today *////////////////////
function findDistanceTraveled(currentUser) {
  const distance = ((currentUser.strideLength * currentUser.activity[currentUser.activity.length - 1].numSteps) / 5280).toFixed(2);
  return distance;
}

module.exports = {
  generateRandomUserID,
  selectCurrentUser,
  findStepGoalAverage,
  calculateTotalHydration,
  findDistanceTraveled,
  getHydrationFor7Days,
  ouncesPerDay
};

