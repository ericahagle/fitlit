///////////////// Global Variables ///////////////////
let allUsers = null;
let currentUser = null;
// let hydrationData = null;
// let sleepData = null;
// let activityData = null;

/////////// Import CSS File /////////////
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
  // import './images/turing-logo.png';

//////////// Import fetch call from apiCalls.js //////////////
import { fetchAllTheData } from './apiCalls';

///////////// Import functions from domUpdates.js ///////////////
import { updateUserName, displayUserInfo } from './domUpdates';

//////////// Import functions from scriptDefinitions //////////////
import { generateRandomUserID, selectCurrentUser } from './scriptDefinitions';

////////// Event Listeners //////////
window.addEventListener('load', () => {
  fetchAllTheData()
	.then(data => {
		allUsers = allUsers;
		// console.log(allUsers);
		currentUser = allUsers[generateRandomUserID(allUsers) - 1];
		// console.log(currentUser);
		// hydrationData = hydrationData;
		// console.log(hydrationData);
		// activityData = activityData;
		// console.log(activityData);
		// sleepData = sleepData;
		// console.log(sleepData);
	});
});
