import { generateRandomUserID, selectCurrentUser } from './scriptDefinitions'

/////////////////// Global Variables for apiCalls.js /////////////////////
const usersApi = "https://fitlit-api.herokuapp.com/api/v1/users";
const hydrationApi = "https://fitlit-api.herokuapp.com/api/v1/hydration";
const sleepApi = "https://fitlit-api.herokuapp.com/api/v1/sleep";
const activityApi = "https://fitlit-api.herokuapp.com/api/v1/activity";
let allUsers = null;
let currentUser = null;
let hydrationData = null;
let sleepData = null;
let activityData = null;

////////// FETCH USERS ////////////
const fetchUsers = () => {
	return fetch(usersApi)
		.then(response => {
			if (!response.ok) {
				throw Error(`Something is amiss. Request Code: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			allUsers = data.users;
		})
		.catch(error => {
			console.log(error);
		})
		return allUsers;
}

//////////// FETCH ALL THE DATA ////////////
const fetchAllTheData = () => {
	return Promise.all([
		fetchUsers(usersApi),
		// fetchHydrationData(hydrationApi),
		// fetchActivityData(activityApi),
		// fetchSleepData(sleepApi)
	])
}

export {
  fetchAllTheData
}