import { expect } from 'chai';
const { generateRandomUserID, selectCurrentUser } = require('../src/scriptDefinitions');

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
        "friends": [ 5, 43, 46, 11 ]
      },
      {
        "id": 2,
        "name": "Tyreek VonRueden",
        "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
        "email": "Nicolette_Halvorson43@yahoo.com",
        "strideLength": 4.5,
        "dailyStepGoal": 9000,
        "friends": [ 13, 19, 3 ]
      },
      {
        "id": 3,
        "name": "Colt Rohan",
        "address": "48010 Balistreri Harbor, Cleobury IN 43317",
        "email": "Wilford.Barton@gmail.com",
        "strideLength": 2.7,
        "dailyStepGoal": 3000,
        "friends": [ 31, 16, 15, 7 ]
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

    // console.log(selectCurrentUser(userId, users, hydrationData));

    expect(selectCurrentUser(userId1, users, hydrationData)).to.deep.equal(
      {
        id: 1,
        name: 'Trystan Gorczany',
        address: '9484 Lucas Flat, West Kittymouth WA 67504',
        email: 'Taurean_Pollich31@gmail.com',
        strideLength: 4,
        dailyStepGoal: 7000,
        friends: [ 5, 43, 46, 11 ],
        hydrationData: [ { userID: 1, date: '2023/03/24', numOunces: 28 }],
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
        friends: [ 13, 19, 3 ],
        hydrationData: [ { userID: 2, date: '2023/03/24', numOunces: 35 }],
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
        "friends": [ 5, 43, 46, 11 ]
      },
      {
        "id": 2,
        "name": "Tyreek VonRueden",
        "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
        "email": "Nicolette_Halvorson43@yahoo.com",
        "strideLength": 4.5,
        "dailyStepGoal": 9000,
        "friends": [ 13, 19, 3 ]
      },
      {
        "id": 3,
        "name": "Colt Rohan",
        "address": "48010 Balistreri Harbor, Cleobury IN 43317",
        "email": "Wilford.Barton@gmail.com",
        "strideLength": 2.7,
        "dailyStepGoal": 3000,
        "friends": [ 31, 16, 15, 7 ]
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