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
  },
  {
    "userID": 2,
    "date": "2023/03/26",
    "numOunces": 88
  },
  {
    "userID": 2,
    "date": "2023/03/27",
    "numOunces": 68
  },
  {
    "userID": 2,
    "date": "2023/03/28",
    "numOunces": 50
  },
  {
    "userID": 2,
    "date": "2023/03/29",
    "numOunces": 57
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
    "userID": 2,
    "date": "2023/03/25",
    "hoursSlept": 8.1,
    "sleepQuality": 4.7
  },
  {
    "userID": 2,
    "date": "2023/03/26",
    "hoursSlept": 9.8,
    "sleepQuality": 4.8
  },
  {
    "userID": 2,
    "date": "2023/03/27",
    "hoursSlept": 10.7,
    "sleepQuality": 2.8
  },
  {
    "userID": 2,
    "date": "2023/03/28",
    "hoursSlept": 5.1,
    "sleepQuality": 2.1
  },
  {
    "userID": 2,
    "date": "2023/03/29",
    "hoursSlept": 4.3,
    "sleepQuality": 2.2
  },
  {
    "userID": 2,
    "date": "2023/03/30",
    "hoursSlept": 10.1,
    "sleepQuality": 3.2
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
    "userID": 2,
    "date": "2023/03/25",
    "numSteps": 14719,
    "minutesActive": 201,
    "flightsOfStairs": 39
  },
  {
    "userID": 2,
    "date": "2023/03/26",
    "numSteps": 9543,
    "minutesActive": 203,
    "flightsOfStairs": 34
  },
  {
    "userID": 2,
    "date": "2023/03/27",
    "numSteps": 12127,
    "minutesActive": 120,
    "flightsOfStairs": 3
  },
  {
    "userID": 2,
    "date": "2023/03/28",
    "numSteps": 5494,
    "minutesActive": 89,
    "flightsOfStairs": 46
  },
  {
    "userID": 2,
    "date": "2023/03/29",
    "numSteps": 6959,
    "minutesActive": 269,
    "flightsOfStairs": 16
  },
  {
    "userID": 2,
    "date": "2023/03/30",
    "numSteps": 4676,
    "minutesActive": 288,
    "flightsOfStairs": 5
  }
];

module.exports = {
  users,
  hydrationData,
  activityData,
  sleepData
}
