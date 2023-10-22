//////////////////// USERS ////////////////////
const users = [
  {
    "id": 1,
    "name": "Trystan Gorczany",
    "address": "9484 Lucas Flat, West Kittymouth WA 67504",
    "email": "Taurean_Pollich31@gmail.com",
    "strideLength": 4,
    "dailyStepGoal": 7000,
    "friends": [5, 43, 46, 11]
  },
  {
    "id": 2,
    "name": "Tyreek VonRueden",
    "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
    "email": "Nicolette_Halvorson43@yahoo.com",
    "strideLength": 4.5,
    "dailyStepGoal": 9000,
    "friends": [13, 19, 3]
  },
  {
    "id": 3,
    "name": "Colt Rohan",
    "address": "48010 Balistreri Harbor, Cleobury IN 43317",
    "email": "Wilford.Barton@gmail.com",
    "strideLength": 2.7,
    "dailyStepGoal": 3000,
    "friends": [31, 16, 15, 7]
  }
];

//////////////////// HYDRATION ////////////////////
const hydrationData = [
  {
    "userID": 1,
    "date": "2023/03/24",
    "numOunces": 28
  },
  {
    "userID": 2,
    "date": "2023/03/24",
    "numOunces": 35
  },
  {
    "userID": 2,
    "date": "2023/03/25",
    "numOunces": 92
  },
  {
    "userID": 2,
    "date": "2023/03/26",
    "numOunces": 88
  }
];


//////////////////// SLEEP ////////////////////
const sleepData = [
  {
  "userID": 1,
  "date": "2023/03/24",
  "hoursSlept": 9.6,
  "sleepQuality": 4.3
  },
  {
  "userID": 2,
  "date": "2023/03/24",
  "hoursSlept": 8.4,
  "sleepQuality": 3.5
  },
  {
  "userID": 3,
  "date": "2023/03/24",
  "hoursSlept": 9.7,
  "sleepQuality": 4.7
  }
];

//////////////////// ACTIVITY ////////////////////
const activityData = [
  {
  "userID": 1,
  "date": "2023/03/24",
  "numSteps": 7362,
  "minutesActive": 261,
  "flightsOfStairs": 26
  },
  {
  "userID": 2,
  "date": "2023/03/24",
  "numSteps": 3049,
  "minutesActive": 125,
  "flightsOfStairs": 43
  },
  {
  "userID": 3,
  "date": "2023/03/24",
  "numSteps": 12970,
  "minutesActive": 282,
  "flightsOfStairs": 38
  }
];

module.exports = {
  users,
  hydrationData,
  activityData,
  sleepData
}
