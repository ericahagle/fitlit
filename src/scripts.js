// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
import userData from './data/users';
console.log("User Data:", userData);

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
import { displayUserInfo, exampleFunction1, exampleFunction2} from './domUpdates';

exampleFunction1('Travis');
exampleFunction2('Travis');
displayUserInfo(currentUser);


//////////////////////Generate random number//////////////////////////////
function generateRandomUserID() {
    return Math.floor(Math.random() * 10) + 1;
  }
  // random userID
  const randomUserID = generateRandomUserID();
  console.log(randomUserID);
  
  
  //////////////////////create user card////////////////////////////////////
  
  function selectCurrentUser(userId, users, hydrationData = [], sleep = [], activity = []) {
      // user in the users array
      const user = users.find((u) => {
          return u.id === userId;  
      });
  
      if (!user) {
          return 'User not found!';
      }
  
      // hydration data for the user
      const userHydrationData = hydrationData.filter((hData) => {
          return hData.userID === userId;
      });
  
      // currentUser object merging the user and hydration data with spread operator....
      //added activity and sleep keys data will be added later
      const currentUser = {
          ...user,
          hydrationData: userHydrationData,
          activity: activity,
          sleep: sleep
      };
  
      return currentUser;
    }
    const currentUser = selectCurrentUser(randomUserID, users, hydrationData );
    console.log(currentUser); 
  
  
  //////////////////////////Find average step count among users///////////////////
  
  function findAverageStepCount(users){
    let totalStepCount = 0;
  
    users.forEach((user) => {
        totalStepCount += user.dailyStepGoal;
    });
    const averageStepCount = totalStepCount / users.length;
    return averageStepCount;
  }
  
  console.log(findAverageStepCount(users))   
  
  //////////////How far did you walk today/////////////////////////////////////
  
  function findDistanceTraveled(currentUser) {
   const distance = (currentUser.strideLength * currentUser.dailyStepGoal) / 5280
          console.log(`Distance traveled by ${currentUser.name}: ${distance.toFixed(2)} miles`);
    console.log(distance)
    return distance
  
  }

  findDistanceTraveled(currentUser)
