import { expect } from 'chai';

const { generateRandomUserID, selectCurrentUser, findStepGoalAverage, getHydrationFor7Days, calculateTotalHydration, findDistanceTraveled, ouncesPerDay, calculateAverageHoursSlept, calculateAverageSleepQuality, hoursSleptGivenDate, sleepQualityGivenDate } = require('../src/scriptDefinitions');

describe('userObject creation', () => {
  it('should generate a random userId that falls within the array of users', function() {
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
    const randomUserID = generateRandomUserID(users);
    expect(randomUserID).to.be.above(0);
    expect(randomUserID).to.be.below(4);
  });

  it('should return a currentUser object with the specified ID', function () {
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
        "userID": 3,
        "date": "2023/03/24",
        "numOunces": 95
      }
    ]

    const userId1 = 1;
    const userId2 = 2;

    expect(selectCurrentUser(userId1, users, hydrationData)).to.deep.equal(
      {
        id: 1,
        name: 'Trystan Gorczany',
        address: '9484 Lucas Flat, West Kittymouth WA 67504',
        email: 'Taurean_Pollich31@gmail.com',
        strideLength: 4,
        dailyStepGoal: 7000,
        friends: [5, 43, 46, 11],
        hydrationData: [{ userID: 1, date: '2023/03/24', numOunces: 28 }],
        activity: [],
        sleep: []
      }
    );

    expect(selectCurrentUser(userId2, users, hydrationData)).to.deep.equal(
      {
        id: 2,
        name: 'Tyreek VonRueden',
        address: '623 Koelpin Skyway, Lake Luigichester MN 77576-1678',
        email: 'Nicolette_Halvorson43@yahoo.com',
        strideLength: 4.5,
        dailyStepGoal: 9000,
        friends: [13, 19, 3],
        hydrationData: [{ userID: 2, date: '2023/03/24', numOunces: 35 }],
        activity: [],
        sleep: []
      }
    );
  });

  it('should return "User not found!" if the user is not in the list', function () {
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
        "userID": 3,
        "date": "2023/03/24",
        "numOunces": 95
      }
    ]

    const userId4 = 4;

    expect(selectCurrentUser(userId4, users, hydrationData)).to.deep.equal('User not found!');
  });
});

describe('specific data', () => {
  it('should find the average step goal amongst all users', function () {
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
    expect(findStepGoalAverage(users)).to.deep.equal('6333.33');
  });
});

describe('ouncesPerDay', () => {

  it('should return numOunces when the date is found', function () {
    const user = {
      hydrationData: [
        { date: '2023/03/24', numOunces: 40 },
        { date: '2023/03/25', numOunces: 50 }
      ]
    };
    const result = ouncesPerDay(user, '2023/03/24');
    expect(result).to.equal(40);
  });

  it('should return undefined when the date is not found', function () {
    const user = {
      hydrationData: [
        { date: '2023/03/24', numOunces: 40 }
      ]
    };
    const result = ouncesPerDay(user, '2023/03/25');
    expect(result).to.be.undefined;
  });

  it('should return undefined when the hydrationData array is empty', function () {
    const user = { hydrationData: [] };
    const result = ouncesPerDay(user, '2023/03/24');
    expect(result).to.be.undefined;
  });
});

describe('getHydrationFor7Days', () => {

  it('should return hydration data for 7 days when data is available', function () {
    const user = {
      hydrationData: [
        { date: '2023/03/20', numOunces: 30 },
        { date: '2023/03/21', numOunces: 40 },
        { date: '2023/03/22', numOunces: 50 },
        { date: '2023/03/23', numOunces: 30 },
        { date: '2023/03/24', numOunces: 40 },
        { date: '2023/03/25', numOunces: 50 },
        { date: '2023/03/26', numOunces: 30 },
      ]
    };
    const result = getHydrationFor7Days(user, '2023/03/20');
    expect(result.length).to.equal(7);
  });

  it('should return empty array when no matching hydration data is found', function () {
    const user = {
      hydrationData: []
    };
    const result = getHydrationFor7Days(user, '2023/03/20');
    expect(result).to.deep.equal([]);
  });

  it('should return partial data when only some days have hydration data', function () {
    const user = {
      hydrationData: [
        { date: '2023/03/20', numOunces: 30 },
        { date: '2023/03/22', numOunces: 50 },
      ]
    };
    const result = getHydrationFor7Days(user, '2023/03/20');
    expect(result.length).to.equal(2);
  });

});

describe('calculateTotalHydration', () => {

  it('should be a function', function () {
    expect(calculateTotalHydration).to.be.a('function')
  })

  it('should return 0 when there is no hydration data', function () {
    const user = { hydrationData: [] };
    const result = calculateTotalHydration(user);
    expect(result).to.equal('0.00');
  });

  it('should return the average hydration when there is one hydration data entry', function () {
    const user = {
      hydrationData: [{ numOunces: 40 }]
    };
    const result = calculateTotalHydration(user);
    expect(result).to.equal('40.00');
  });

  it('should return the average hydration when there are multiple hydration data entries', function () {
    const user = {
      hydrationData: [{ numOunces: 40 }, { numOunces: 60 }, { numOunces: 100 }]
    };
    const result = calculateTotalHydration(user);
    expect(result).to.equal('66.67');
  });
});

describe('distance traveled', () => {
  it('should return the distance traveled by a user on a given day', function () {
    const currentUser = {
      "id": 3,
      "name": "Colt Rohan",
      "address": "48010 Balistreri Harbor, Cleobury IN 43317",
      "email": "Wilford.Barton@gmail.com",
      "strideLength": 2.7,
      "dailyStepGoal": 3000,
      "friends": [31, 16, 15, 7],
      "hydrationData": [{
        "userID": 3,
        "date": "2023/03/24",
        "numOunces": 95
      }],
      "activity": [{
        "userID": 3,
        "date": "2023/03/24",
        "numSteps": 12970,
        "minutesActive": 282,
        "flightsOfStairs": 38
      }],
      "sleep": [{
        "userID": 3,
        "date": "2023/03/24",
        "hoursSlept": 9.7,
        "sleepQuality": 4.7
      }]
    }
    expect(findDistanceTraveled(currentUser)).to.equal('6.63');
  });
});

        describe('calculateAverageHoursSlept', () => {

        it('should be a function', function () {
          expect(calculateAverageHoursSlept).to.be.a('function');
        });

        it('should return 0 when there is no sleep data', function () {
          const user = { sleepData: [] };
          const result = calculateAverageHoursSlept(user);
          expect(result).to.equal('0.00');
        });

        it('should return the average hours slept when there is one sleep data entry', function () {
          const user = {
            sleepData: [{ hoursSlept: 7 }]
          };
          const result = calculateAverageHoursSlept(user);
          expect(result).to.equal('7.00');
        });

        it('should return the average hours slept when there are multiple sleep data entries', function () {
          const user = {
            sleepData: [{ hoursSlept: 7 }, { hoursSlept: 8 }, { hoursSlept: 6 }]
          };
          const result = calculateAverageHoursSlept(user);
          expect(result).to.equal('7.00');
        });

        it('should correctly calculate the average hours slept with diferent sleep data entries', function () {
          const user = {
            sleepData: [{ hoursSlept: 5 }, { hoursSlept: 8 }, { hoursSlept: 7 }]
          };
          const result = calculateAverageHoursSlept(user);
          expect(result).to.equal('6.67');
        });
      });

         describe('calculateAverageSleepQuality', () => {

        it('should be a function', function () {
          expect(calculateAverageSleepQuality).to.be.a('function');
        });

        it('should return 0 when there is no sleep data', function () {
          const user = { sleepData: [] };
          const result = calculateAverageSleepQuality(user);
          expect(result).to.equal('0.00');
        });

        it('should return the average sleep quality when there is one sleep data entry', function () {
          const user = {
            sleepData: [{ sleepQuality: 7 }]
          };
          const result = calculateAverageSleepQuality(user);
          expect(result).to.equal('7.00');
        });

        it('should return the average sleep quality when there are multiple sleep data entries', function () {
          const user = {
            sleepData: [{ sleepQuality: 7 }, { sleepQuality: 8 }, { sleepQuality: 6 }]
          };
          const result = calculateAverageSleepQuality(user);
          expect(result).to.equal('7.00');
        });

        it('should correctly calculate the average sleep quality with varied sleep data entries', function () {
          const user = {
            sleepData: [{ sleepQuality: 5 }, { sleepQuality: 8 }, { sleepQuality: 7 }]
          };
          const result = calculateAverageSleepQuality(user);
          expect(result).to.equal('6.67');
        });
      });


      describe('hoursSleptGivenDate', () => {

        it('should return hoursSlept when the date is found', function () {
          const user = {
            sleepData: [
              { date: '2023/03/26', hoursSlept: 7 },
              { date: '2023/03/27', hoursSlept: 8 }
            ]
          };
          const result = hoursSleptGivenDate(user, '2023/03/26');
          expect(result).to.equal(7);
        });

        it('should return undefined when the date is not found', function () {
          const user = {
            sleepData: [
              { date: '2023/03/26', hoursSlept: 7 }
            ]
          };
          const result = hoursSleptGivenDate(user, '2023/03/27');
          expect(result).to.be.undefined;
        });

        it('should return undefined when the sleepData array is empty', function () {
          const user = { sleepData: [] };
          const result = hoursSleptGivenDate(user, '2023/03/26');
          expect(result).to.be.undefined;
        });
      });

      describe('sleepQualityGivenDate', () => {

        it('should be a function', function () {
          expect(sleepQualityGivenDate).to.be.a('function');
        });
        
        it('should return sleepQuality when the date is found', function () {
          const user = {
            sleepData: [
              { date: '2023/03/24', hoursSlept: 7, sleepQuality: 2 },
              { date: '2023/03/25', hoursSlept: 8, sleepQuality: 3 }
            ]
          };
          const result = sleepQualityGivenDate(user, '2023/03/24');
          expect(result).to.equal(2);
        });
      
        it('should return undefined when the date is not found', function () {
          const user = {
            sleepData: [
              { date: '2023/03/24', hoursSlept: 7, sleepQuality: 2 }
            ]
          };
          const result = sleepQualityGivenDate(user, '2023/03/25');
          expect(result).to.be.undefined;
        });
      
        it('should return undefined when the sleepData array is empty', function () {
          const user = { sleepData: [] };
          const result = sleepQualityGivenDate(user, '2023/03/24');
          expect(result).to.be.undefined;
        });
      
      });
