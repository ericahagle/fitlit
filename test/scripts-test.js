import { expect } from 'chai';
const { generateRandomUserID, selectCurrentUser, findStepGoalAverage, calculateTotalHydration } = require('../src/scriptDefinitions');

describe('userObject creation', () => {
  it('should generate a random userId', function() {
    const randomUserID = generateRandomUserID();
    expect(randomUserID).to.be.a('number');
  });

  it('should return a currentUser object with the specified ID', function() {
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

  it('should return "User not found!" if the user is not in the list', function() {
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

describe('specific data', () => {
  it('should find the average step goal amongst all users', function() {
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
