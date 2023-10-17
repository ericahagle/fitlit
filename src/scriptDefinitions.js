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

////////////////////* Find average step count among users *////////////////////
function findAverageStepCount(users) {
  let totalStepCount = 0;

  users.forEach((user) => {
    totalStepCount += user.dailyStepGoal;
  });
  const averageStepCount = totalStepCount / users.length;
  return averageStepCount;
}

// ///////////////////*Log the hydration for 7 days*////////////////////////////

function getHydrationFor7Days(currentUser, startDate) {
  
  let startDateObj = new Date(startDate);
  
  let endDateObj = new Date(startDateObj);
  endDateObj.setDate(endDateObj.getDate() + 6);

  return currentUser.hydrationData.filter((entry) => {
      let entryDateObj = new Date(entry.date);
      return entryDateObj >= startDateObj && entryDateObj <= endDateObj;
  });
}


////////////////////* How far did you walk today *////////////////////
function findDistanceTraveled(currentUser) {
  const distance = (currentUser.strideLength * currentUser.dailyStepGoal) / 5280
  console.log(`Distance traveled by ${currentUser.name}: ${distance.toFixed(2)} miles`);
  console.log(distance)
  return distance

}

module.exports = {
  generateRandomUserID,
  selectCurrentUser,
  findAverageStepCount,
  findDistanceTraveled,
  getHydrationFor7Days
};