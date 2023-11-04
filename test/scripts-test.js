import { expect } from 'chai';
const { generateRandomUserID, findUserByEmail, addDataToCurrentUser, findStepGoalAverage, getHydrationFor7Days, calculateTotalHydration, findDistanceTraveled, ouncesPerDay, calculateAverageHoursSlept, calculateAverageSleepQuality, hoursSleptGivenDate, sleepQualityGivenDate, getSleepFor7Days, getSleepQualityFor7Days, checkStepGoal, minutesActiveGivenDate, checkStepGoal7Days, numberOfStepsGivenDate } = require('../src/scriptDefinitions');
const { users, hydrationData, activityData, sleepData } = require('../src/data/testData');

describe('userObject creation', function () {
  it('should generate a random userId that falls within the array of users', function () {
    const randomUserID = generateRandomUserID(users);

    expect(randomUserID).to.be.at.least(1);
    expect(randomUserID).to.be.below(4);
  });

  it('should add hydration, activity, and sleep data to the currentUser', function () {
    const currentUser = users[0];

    expect(addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData)).to.deep.equal(
      {
        id: 1,
        name: 'Trystan Gorczany',
        address: '9484 Lucas Flat, West Kittymouth WA 67504',
        email: 'Taurean_Pollich31@gmail.com',
        strideLength: 4,
        dailyStepGoal: 7000,
        friends: [5, 43, 46, 11],
        hydrationData: [{
          userID: 1, date: '2023/03/24', numOunces: 28
        }],
        activityData: [{
          userID: 1,
          date: "2023/03/24",
          numSteps: 7362,
          minutesActive: 261,
          flightsOfStairs: 26
        }],
        sleepData: [{
          userID: 1,
          date: "2023/03/24",
          hoursSlept: 9.6,
          sleepQuality: 4.3
        }]
      }
    );
  });

  it('should add empty arrays for current users who have no hydration, activity, and/or sleep data to the currentUser', function () {
    const currentUser = users[2];

    expect(addDataToCurrentUser(currentUser, hydrationData, activityData, sleepData)).to.deep.equal(
      {
        id: 3,
        name: 'Colt Rohan',
        address: '48010 Balistreri Harbor, Cleobury IN 43317',
        email: 'Wilford.Barton@gmail.com',
        strideLength: 2.7,
        dailyStepGoal: 3000,
        friends: [31, 16, 15, 7],
        hydrationData: [],
        activityData: [],
        sleepData: []
      }
    );
  });
});

describe('get user info for admin', function () {
  it('returns user for a given email', function () {
    expect(findUserByEmail('Taurean_Pollich31@gmail.com', users)).to.deep.equal({
      id: 1,
      name: 'Trystan Gorczany',
      address: '9484 Lucas Flat, West Kittymouth WA 67504',
      email: 'Taurean_Pollich31@gmail.com',
      strideLength: 4,
      dailyStepGoal: 7000,
      friends: [5, 43, 46, 11]
    });
  });

  it('returns "User not found" if user does not exist', function () {
    expect(findUserByEmail('email@email.com', users)).to.deep.equal('User not found');
  });
});

describe('global average step goal', function () {
  it('should find the average step goal amongst all users', function () {
    expect(findStepGoalAverage(users)).to.deep.equal('6333.33');
  });
});

describe('tests that require complete current users with varying data', function () {
  const currentUser1 = addDataToCurrentUser(users[0], hydrationData, activityData, sleepData);
  const currentUser2 = addDataToCurrentUser(users[1], hydrationData, activityData, sleepData);
  const currentUser3 = addDataToCurrentUser(users[2], hydrationData, activityData, sleepData);

  describe('ouncesPerDay', function () {
    it('should return numOunces when the date is found', function () {
      expect(ouncesPerDay(currentUser2, '2023/03/24')).to.deep.equal(35);
    });

    it('should return undefined when the date is not found', function () {
      expect(ouncesPerDay(currentUser2, '2023/03/31')).to.be.undefined;
    });

    it('should return undefined when the hydrationData array is empty', function () {
      expect(ouncesPerDay(currentUser3, '2023/03/24')).to.be.undefined;
    });
  });

  describe('getHydrationFor7Days', function () {
    it('should return hydration data for 7 days when data for all 7 days is available', function () {
      const sevenDayHydration = getHydrationFor7Days(currentUser2, '2023/03/30');

      expect(sevenDayHydration.length).to.deep.equal(7);
      expect(sevenDayHydration).to.deep.equal([
        { date: '2023/03/24', numOunces: 35 },
        { date: '2023/03/25', numOunces: 92 },
        { date: '2023/03/26', numOunces: 88 },
        { date: '2023/03/27', numOunces: 88 },
        { date: '2023/03/28', numOunces: 68 },
        { date: '2023/03/29', numOunces: 50 },
        { date: '2023/03/30', numOunces: 57 }
      ]);
    });

    it('should return an empty array when no matching hydration data is found', function () {
      const sevenDayHydration = getHydrationFor7Days(currentUser3, '2023/03/30');

      expect(sevenDayHydration.length).to.deep.equal(0);
      expect(sevenDayHydration).to.deep.equal([]);
    });

    it('should return partial data when only some of the 7 days have hydration data', function () {
      const sevenDayHydration = getHydrationFor7Days(currentUser1, '2023/03/30');

      expect(sevenDayHydration.length).to.deep.equal(1);
      expect(sevenDayHydration).to.deep.equal([{ date: '2023/03/24', numOunces: 28 }]);
    });
  });

  describe('calculateTotalHydration', function () {
    it('should return 0 when there is no hydration data', function () {
      expect(calculateTotalHydration(currentUser3)).to.deep.equal('0.00');
    });

    it('should return the average hydration when there is one hydration data entry', function () {
      expect(calculateTotalHydration(currentUser1)).to.deep.equal('28.00');
    });

    it('should return the average hydration when there are multiple hydration data entries', function () {
      expect(calculateTotalHydration(currentUser2)).to.deep.equal('68.29');
    });
  });

  describe('distance traveled', function () {
    it('should return the distance traveled by a user on the most recent day', function () {
      expect(findDistanceTraveled(currentUser1)).to.deep.equal('5.58');
      expect(findDistanceTraveled(currentUser2)).to.deep.equal('3.99');
    });
  });

  describe('calculateAverageHoursSlept', function () {
    it('should return 0 when there is no sleep data', function () {
      expect(calculateTotalHydration(currentUser3)).to.deep.equal('0.00');
    });

    it('should return the average hours slept when there is one sleep data entry', function () {
      expect(calculateAverageHoursSlept(currentUser1)).to.deep.equal('9.60');
    });

    it('should return the average hours slept when there are multiple sleep data entries', function () {
      expect(calculateAverageHoursSlept(currentUser2)).to.deep.equal('8.07');
    });
  });

  describe('calculateAverageSleepQuality', function () {
    it('should return 0 when there is no sleep data', function () {
      expect(calculateAverageSleepQuality(currentUser3)).to.deep.equal('0.00');
    });

    it('should return the average sleep quality when there is one sleep data entry', function () {
      expect(calculateAverageSleepQuality(currentUser1)).to.deep.equal('4.30');
    });

    it('should return the average sleep quality when there are multiple sleep data entries', function () {
      expect(calculateAverageSleepQuality(currentUser2)).to.deep.equal('3.33');
    });
  });

  describe('hoursSleptGivenDate', function () {
    it('should return hoursSlept when the date is found', function () {
      expect(hoursSleptGivenDate(currentUser1, '2023/03/24')).to.deep.equal(9.60);
    });

    it('should return undefined when the date is not found', function () {
      expect(hoursSleptGivenDate(currentUser1, '2023/03/25')).to.be.undefined;
    });

    it('should return undefined when the sleepData array is empty', function () {
      expect(hoursSleptGivenDate(currentUser3, '2023/03/25')).to.be.undefined;
    });
  });

  describe('sleepQualityGivenDate', function () {
    it('should return sleepQuality when the date is found', function () {
      expect(sleepQualityGivenDate(currentUser1, '2023/03/24')).to.deep.equal(4.30);
    });

    it('should return undefined when the date is not found', function () {
      expect(sleepQualityGivenDate(currentUser1, '2023/03/25')).to.be.undefined;
    });

    it('should return undefined when the sleepData array is empty', function () {
      expect(sleepQualityGivenDate(currentUser3, '2023/03/25')).to.be.undefined;
    });
  });

  describe('getSleepQualityFor7Days', function () {
    it('should return sleep quality data for 7 days when data is available', function () {
      const sevenDaySleepQuality = getSleepQualityFor7Days(currentUser2, '2023/03/30');

      expect(sevenDaySleepQuality.length).to.deep.equal(7);
      expect(sevenDaySleepQuality).to.deep.equal([
        { date: '2023/03/24', sleepQuality: 3.5 },
        { date: '2023/03/25', sleepQuality: 4.7 },
        { date: '2023/03/26', sleepQuality: 4.8 },
        { date: '2023/03/27', sleepQuality: 2.8 },
        { date: '2023/03/28', sleepQuality: 2.1 },
        { date: '2023/03/29', sleepQuality: 2.2 },
        { date: '2023/03/30', sleepQuality: 3.2 }
      ]);
    });

    it('should return an empty array when no matching data is found', function () {
      const sevenDaySleepQuality = getSleepQualityFor7Days(currentUser3, '2023/03/30');

      expect(sevenDaySleepQuality.length).to.deep.equal(0);
      expect(sevenDaySleepQuality).to.deep.equal([]);
    });

    it('should return partial data when only some days have sleep data', function () {
      const sevenDaySleepQuality = getSleepQualityFor7Days(currentUser1, '2023/03/30');

      expect(sevenDaySleepQuality.length).to.deep.equal(1);
      expect(sevenDaySleepQuality).to.deep.equal([{ date: '2023/03/24', sleepQuality: 4.3 }]);
    });
  });

  describe('getSleepFor7Days', function () {
    it('should return sleep hours data for 7 days when data is available', function () {
      const sevenDaySleep = getSleepFor7Days(currentUser2, '2023/03/30');

      expect(sevenDaySleep).to.be.an('array');
      expect(sevenDaySleep.length).to.deep.equal(7);
      expect(sevenDaySleep).to.deep.equal([
        { date: '2023/03/24', hoursSlept: 8.4 },
        { date: '2023/03/25', hoursSlept: 8.1 },
        { date: '2023/03/26', hoursSlept: 9.8 },
        { date: '2023/03/27', hoursSlept: 10.7 },
        { date: '2023/03/28', hoursSlept: 5.1 },
        { date: '2023/03/29', hoursSlept: 4.3 },
        { date: '2023/03/30', hoursSlept: 10.1 }
      ]);
    });

    it('should return an empty array when no matching data is found', function () {
      const sevenDaySleep = getSleepFor7Days(currentUser3, '2023/03/30');

      expect(sevenDaySleep.length).to.deep.equal(0);
      expect(sevenDaySleep).to.deep.equal([]);
    });

    it('should return partial data when only some days have sleep data', function () {
      const sevenDaySleep = getSleepFor7Days(currentUser1, '2023/03/30');

      expect(sevenDaySleep.length).to.deep.equal(1);
      expect(sevenDaySleep).to.deep.equal([{ date: '2023/03/24', hoursSlept: 9.6 }]);
    });
  });

  describe('checkStepGoal', function () {
    it('should return "Success!" when the latest numSteps is greater than or equal to dailyStepGoal', function () {
      expect(checkStepGoal(currentUser1)).to.deep.equal('Success!');
    });

    it('should return "No!" when the latest numSteps is less than dailyStepGoal', function () {
      expect(checkStepGoal(currentUser2)).to.deep.equal('No!');
    });

    it('should handle cases where activityData is empty, returning "No!"', function () {
      expect(checkStepGoal(currentUser3)).to.deep.equal('No!');
    });
  });

  describe('minutesActiveGivenDate', function () {
    it('should return minutes active when the date is found', function () {
      expect(minutesActiveGivenDate(currentUser1, '2023/03/24')).to.deep.equal(261);
    });

    it('should return undefined when the date is not found', function () {
      expect(minutesActiveGivenDate(currentUser1, '2023/03/25')).to.be.undefined;
    });

    it('should return undefined when the activityData array is empty', function () {
      expect(minutesActiveGivenDate(currentUser3, '2023/03/25')).to.be.undefined;
    });
  });

  describe('numberOfStepsGivenDate', function () {
    it('should return the number of steps when the date is found', function () {
      expect(numberOfStepsGivenDate(currentUser2, '2023/03/28')).to.equal(5494);
      expect(numberOfStepsGivenDate(currentUser2, '2023/03/29')).to.equal(6959);
      expect(numberOfStepsGivenDate(currentUser2, '2023/03/30')).to.equal(4676);
    });

    it('should return undefined when the date is not found', function () {
      expect(numberOfStepsGivenDate(currentUser1, '2023/03/28')).to.be.undefined;
      expect(numberOfStepsGivenDate(currentUser1, '2023/03/29')).to.be.undefined;
      expect(numberOfStepsGivenDate(currentUser1, '2023/03/30')).to.be.undefined;
    });

    it('should return undefined when the activityData array is empty', function () {
      expect(numberOfStepsGivenDate(currentUser3, '2023/03/28')).to.be.undefined;
      expect(numberOfStepsGivenDate(currentUser3, '2023/03/29')).to.be.undefined;
      expect(numberOfStepsGivenDate(currentUser3, '2023/03/30')).to.be.undefined;
    });
  });

  describe('checkStepGoal7Days', function () {

    it('should return an array of objects containing date, numSteps, and metGoal properties', function () {
      expect(checkStepGoal7Days(currentUser2)[0]).to.have.all.keys('date', 'numSteps', 'metGoal');
    });

    it('should return the correct metGoal values based on numSteps and dailyStepGoal for all 7 days', function () {
      expect(checkStepGoal7Days(currentUser2)).to.deep.equal([
        { date: '2023/03/30', numSteps: 4676, metGoal: 'Keep trying!' },
        { date: '2023/03/29', numSteps: 6959, metGoal: 'Keep trying!' },
        { date: '2023/03/28', numSteps: 5494, metGoal: 'Keep trying!' },
        { date: '2023/03/27', numSteps: 12127, metGoal: 'You did it!' },
        { date: '2023/03/26', numSteps: 9543, metGoal: 'You did it!' },
        { date: '2023/03/25', numSteps: 14719, metGoal: 'You did it!' },
        { date: '2023/03/24', numSteps: 3049, metGoal: 'Keep trying!' },
      ]);
    });

    it('should handle users with no activityData, returning "No activity data available!"', function () {
      expect(checkStepGoal7Days(currentUser3)).to.equal('No activity data available!');
    });
  });
})  