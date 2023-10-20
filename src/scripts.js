/* This is the JavaScript entry file - your code begins here */
////////////////////* Do NOT delete or rename this file *////////////////////


// An example of how you tell webpack to use a CSS file
  import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
  import './images/turing-logo.png';

import {  updateUserName,
    displayUserInfo,
    waterDayUpdate,
    waterWeekUpdate,
    sleepDayUpdate,
    sleepWeekUpdate,
    stepGoalUpdate,
    stepsDayUpdate,
    activeMinutesUpdate,
    stepsWeekUpdate} from './domUpdates';

