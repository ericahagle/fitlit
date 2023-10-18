/* This is the JavaScript entry file - your code begins here */
////////////////////* Do NOT delete or rename this file *////////////////////


// An example of how you tell webpack to use a CSS file
   import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
  // import './images/turing-logo.png';

// An example of how you tell webpack to use a JS file
  // import userData from './data/users';
  // console.log("User Data:", userData);

  import { fetchUsers } from './apiCalls';

// Example of one way to import functions from the domUpdates file.  You will delete these examples.
  import { updateUserName, displayUserInfo } from './domUpdates';

  // exampleFunction1('Travis');
  // exampleFunction2('Travis')

// Import functions from scriptDefinitions

import { generateRandomUserID, selectCurrentUser } from './scriptDefinitions';



