import { generateRandomUserID, selectCurrentUser } from './scriptDefinitions'

/////////////////// Global Variables for apiCalls.js /////////////////////
const usersApi = "https://fitlit-api.herokuapp.com/api/v1/users";
const hydrationApi = "https://fitlit-api.herokuapp.com/api/v1/hydration";
const activityApi = "https://fitlit-api.herokuapp.com/api/v1/activity";
const sleepApi = "https://fitlit-api.herokuapp.com/api/v1/sleep";
let allUsers = null;
let currentUser = null;
let hydrationData = null;
let activityData = null;
let sleepData = null;

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

///////// FETCH HYDRATION DATA ////////////
const fetchHydrationData = () => {
	return fetch(hydrationApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		hydrationData = data.hydrationData;
	})
	.catch(error => {
		console.log(error);
	})
	return hydrationData;
}

////////// FETCH ACTIVITY DATA ////////////
const fetchActivityData = () => {
	return fetch(activityApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		activityData = data.activityData;
	})
	.catch(error => {
		console.log(error);
	})
	return activityData;
}

//////////// FETCH ALL THE DATA ////////////
const fetchAllTheData = () => {
	return Promise.all([
		fetchUsers(usersApi),
		fetchHydrationData(hydrationApi),
		fetchActivityData(activityApi),
		// fetchSleepData(sleepApi)
	])
}

export {
  fetchAllTheData
}