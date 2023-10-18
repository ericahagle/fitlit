import { generateRandomUserID, selectCurrentUser } from './scriptDefinitions'

// Users
const usersApi = "https://fitlit-api.herokuapp.com/api/v1/users";
const userId = generateRandomUserID();
let currentUser = null;

const fetchUsers = () => {
	fetch(usersApi)
		.then(response => {
			if (!response.ok) {
				throw Error(`Something is amiss. Request Code: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			// console.log(data);
			currentUser = selectCurrentUser(userId, data.users);
			console.log(currentUser);
		})
		.catch(error => {
			console.log(error);
		})
		return currentUser;
}

fetchUsers();


// export {
//   fetchUsers
// }