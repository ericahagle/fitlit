import { expect } from 'chai';
const { generateRandomUserID, addDataToCurrentUser, findStepGoalAverage, getHydrationFor7Days, calculateTotalHydration, findDistanceTraveled, ouncesPerDay, calculateAverageHoursSlept, calculateAverageSleepQuality, hoursSleptGivenDate, sleepQualityGivenDate, getSleepFor7Days, getSleepQualityFor7Days, checkStepGoal, minutesActiveGivenDate, numberOfStepsGivenDate } = require('../src/scriptDefinitions');
const { users, hydrationData, activityData, sleepData } = require('../src/data/testData');

describe('userObject creation', function() {
  it('should generate a random userId that falls within the array of users', function() {
    const randomUserID = generateRandomUserID(users);

    expect(randomUserID).to.be.at.least(1);
    expect(randomUserID).to.be.below(4);
  });

  it('should add hydration, activity, and sleep data to the currentUser', function() {
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
});

describe('global average step goal', function() {
  it('should find the average step goal amongst all users', function() {
    expect(findStepGoalAverage(users)).to.deep.equal('6333.33');
  });
});

describe('tests that require complete current users with varying data', function() {
  const currentUser1 = addDataToCurrentUser(users[0], hydrationData, activityData, sleepData);
  const currentUser2 = addDataToCurrentUser(users[1], hydrationData, activityData, sleepData);
  const currentUser3 = addDataToCurrentUser(users[2], hydrationData, activityData, sleepData);

  describe('ouncesPerDay', function() {
    it('should return numOunces when the date is found', function() {
      expect(ouncesPerDay(currentUser2, '2023/03/24')).to.deep.equal(35);
    });

    it('should return undefined when the date is not found', function() {
      expect(ouncesPerDay(currentUser2, '2023/03/31')).to.be.undefined;
    });

    it('should return undefined when the hydrationData array is empty', function() {
      expect(ouncesPerDay(currentUser3, '2023/03/24')).to.be.undefined;
    });
  });

  describe('getHydrationFor7Days', function() {
    it('should return hydration data for 7 days when data for all 7 days is available', function() {
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

    it('should return an empty array when no matching hydration data is found', function() {
      const sevenDayHydration = getHydrationFor7Days(currentUser3, '2023/03/30');

      expect(sevenDayHydration.length).to.deep.equal(0);
      expect(sevenDayHydration).to.deep.equal([]);
    });

    it('should return partial data when only some of the 7 days have hydration data', function() {
      const sevenDayHydration = getHydrationFor7Days(currentUser1, '2023/03/30');

      expect(sevenDayHydration.length).to.deep.equal(1);
      expect(sevenDayHydration).to.deep.equal([{ date: '2023/03/24', numOunces: 28 }]);
    });
  });

  describe('calculateTotalHydration', function() {
    it('should return 0 when there is no hydration data', function() {
      const totalHydration = calculateTotalHydration(currentUser3);

      expect(totalHydration).to.deep.equal('0.00');
    });

    it('should return the average hydration when there is one hydration data entry', function() {
      const totalHydration = calculateTotalHydration(currentUser1);

      expect(totalHydration).to.deep.equal('28.00');
    });

    it('should return the average hydration when there are multiple hydration data entries', function() {
      const totalHydration = calculateTotalHydration(currentUser2);

      expect(totalHydration).to.deep.equal('68.29');
    });
  });

  describe('distance traveled', function() {
    it('should return the distance traveled by a user on the most recent day', function() {
      expect(findDistanceTraveled(currentUser1)).to.deep.equal('5.58');
      expect(findDistanceTraveled(currentUser2)).to.deep.equal('3.99');
    });
  });

  describe('calculateAverageHoursSlept', function() {
    it('should return 0 when there is no sleep data', function() {
      const averageHoursSlept = calculateTotalHydration(currentUser3);

      expect(averageHoursSlept).to.deep.equal('0.00');
    });

    it('should return the average hours slept when there is one sleep data entry', function() {
      const averageHoursSlept = calculateAverageHoursSlept(currentUser1);

      expect(averageHoursSlept).to.deep.equal('9.60');
    });

    it('should return the average hours slept when there are multiple sleep data entries', function() {
      const averageHoursSlept = calculateAverageHoursSlept(currentUser2);

      expect(averageHoursSlept).to.deep.equal('8.07');
    });
  });

  describe('calculateAverageSleepQuality', function() {
    it('should return 0 when there is no sleep data', function() {
      const averageSleepQuality = calculateAverageSleepQuality(currentUser3);

      expect(averageSleepQuality).to.deep.equal('0.00');
    });

    it('should return the average sleep quality when there is one sleep data entry', function() {
      const averageSleepQuality = calculateAverageSleepQuality(currentUser1);

      expect(averageSleepQuality).to.deep.equal('4.30');
    });

    it('should return the average sleep quality when there are multiple sleep data entries', function() {
      const averageSleepQuality = calculateAverageSleepQuality(currentUser2);

      expect(averageSleepQuality).to.deep.equal('3.33');
    });
  });

  describe('hoursSleptGivenDate', function() {
    it('should return hoursSlept when the date is found', function() {
      const hoursSlept = hoursSleptGivenDate(currentUser1, '2023/03/24');

      expect(hoursSlept).to.deep.equal(9.60);
    });

    it('should return undefined when the date is not found', function() {
      const hoursSlept = hoursSleptGivenDate(currentUser1, '2023/03/25');

      expect(hoursSlept).to.be.undefined;
    });

    it('should return undefined when the sleepData array is empty', function() {
      const hoursSlept = hoursSleptGivenDate(currentUser3, '2023/03/25');

      expect(hoursSlept).to.be.undefined;
    });
  });

  describe('sleepQualityGivenDate', function() {
    it('should return sleepQuality when the date is found', function() {
      const sleepQuality = sleepQualityGivenDate(currentUser1, '2023/03/24');

      expect(sleepQuality).to.deep.equal(4.30);
    });

    it('should return undefined when the date is not found', function() {
      const sleepQuality = sleepQualityGivenDate(currentUser1, '2023/03/25');

      expect(sleepQuality).to.be.undefined;
    });

    it('should return undefined when the sleepData array is empty', function() {
      const sleepQuality = sleepQualityGivenDate(currentUser3, '2023/03/25');

      expect(sleepQuality).to.be.undefined;
    });
  });

  describe('getSleepQualityFor7Days', function() {
    it('should return sleep quality data for 7 days when data is available', function() {
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

    it('should return an empty array when no matching data is found', function() {
      const sevenDaySleepQuality = getSleepQualityFor7Days(currentUser3, '2023/03/30');

      expect(sevenDaySleepQuality.length).to.deep.equal(0);
      expect(sevenDaySleepQuality).to.deep.equal([]);
    });

    it('should return partial data when only some days have sleep data', function() {
      const sevenDaySleepQuality = getSleepQualityFor7Days(currentUser1, '2023/03/30');

      expect(sevenDaySleepQuality.length).to.deep.equal(1);
      expect(sevenDaySleepQuality).to.deep.equal([{ date: '2023/03/24', sleepQuality: 4.3 }]);
    });
  });

  describe('getSleepFor7Days', function() {
    it('should return sleep hours data for 7 days when data is available', function() {
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

    it('should return an empty array when no matching data is found', function() {
      const sevenDaySleep = getSleepFor7Days(currentUser3, '2023/03/30');

      expect(sevenDaySleep.length).to.deep.equal(0);
      expect(sevenDaySleep).to.deep.equal([]);
    });

    it('should return partial data when only some days have sleep data', function() {
      const sevenDaySleep = getSleepFor7Days(currentUser1, '2023/03/30');

      expect(sevenDaySleep.length).to.deep.equal(1);
      expect(sevenDaySleep).to.deep.equal([{ date: '2023/03/24', hoursSlept: 9.6 }]);
    });
  });

  describe('checkStepGoal', function() {
    it('should return "Success!" when the latest numSteps is greater than or equal to dailyStepGoal', function() {
      const isSuccess = checkStepGoal(currentUser1);

      expect(isSuccess).to.deep.equal('Success!');
    });

    it('should return "No!" when the latest numSteps is less than dailyStepGoal', function() {
      const isNotSuccess = checkStepGoal(currentUser2);

      expect(isNotSuccess).to.deep.equal('No!');
    });
    it('should handle cases where activityData is empty, returning "No!"', function() {
      const isNotSuccess = checkStepGoal(currentUser3);

      expect(isNotSuccess).to.deep.equal('No!');
    });
  });

  describe('minutesActiveGivenDate', function() {
    it('should return minutes active when the date is found', function() {
      const minutesActive = minutesActiveGivenDate(currentUser1, '2023/03/24');

      expect(minutesActive).to.deep.equal(261);
    });

    it('should return undefined when the date is not found', function() {
      const minutesActive = minutesActiveGivenDate(currentUser1, '2023/03/25');

      expect(minutesActive).to.be.undefined;
    });

    it('should return undefined when the activityData array is empty', function() {
      const minutesActive = minutesActiveGivenDate(currentUser3, '2023/03/25');

      expect(minutesActive).to.be.undefined;
    });
  });
});

describe('numberOfStepsGivenDate', () => {

  it('should be a function', function () {
    expect(numberOfStepsGivenDate).to.be.a('function');
  });
  
  it('should return the number of steps when the date is found', function () {
    const user = {
      activityData: [
        { date: '2023/03/24', numSteps: 4000 },
        { date: '2023/03/25', numSteps: 5000 }
      ]
    };
    const result = numberOfStepsGivenDate(user, '2023/03/24');
    expect(result).to.equal(4000);
  });

  it('should return undefined when the date is not found', function () {
    const user = {
      activityData: [
        { date: '2023/03/24', numSteps: 4000 }
      ]
    };
    const result = numberOfStepsGivenDate(user, '2023/03/25');
    expect(result).to.be.undefined;
  });

  it('should return undefined when the activityData array is empty', function () {
    const user = { activityData: [] };
    const result = numberOfStepsGivenDate(user, '2023/03/24');
    expect(result).to.be.undefined;
  });

  it('should return undefined when activityData is not provided', function () {
    const user = {};
    const result = numberOfStepsGivenDate(user, '2023/03/24');
    expect(result).to.be.undefined;
  });
});