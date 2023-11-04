/////////////////// Global Variables /////////////////////
const usersApi = "http://localhost:3001/api/v1/users";
const hydrationApi = "http://localhost:3001/api/v1/hydration";
const activityApi = "http://localhost:3001/api/v1/activity";
const sleepApi = "http://localhost:3001/api/v1/sleep";
let allUsers = null;
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
      return allUsers;
		})
		.catch(error => {
			console.log(error);
		});
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
    return hydrationData;
	})
	.catch(error => {
		console.log(error);
	});
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
    return activityData;
	})
	.catch(error => {
		console.log(error);
	});
}

//////////// FETCH SLEEP DATA //////////////
const fetchSleepData = () => {
	return fetch(sleepApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		sleepData = data.sleepData;
    return sleepData;
	})
	.catch(error => {
		console.log(error);
	});
}


/////////////POST/////////////////////


function postHydrationData(combinedData) {
    fetch(hydrationApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status} Error`);
        }
        return response.json();
    })
    .then(addedData => {
        console.log('Data added:', addedData);
       
		return fetchHydrationData()
    })

	.then(() => {
		// updateDOMWithNewHydrationData()

	})	
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
}

//////////// FETCH ALL THE DATA ////////////
const fetchAllTheData = () => {
	return Promise.all([
		fetchUsers(usersApi),
		fetchHydrationData(hydrationApi),
		fetchActivityData(activityApi),
		fetchSleepData(sleepApi),
		
	])
}


export {
  fetchAllTheData,
  allUsers,
  hydrationData,
  activityData,
  sleepData,
  postHydrationData
}