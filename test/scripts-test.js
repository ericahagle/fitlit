import { expect } from 'chai';
const { generateRandomUserID, addDataToCurrentUser, findStepGoalAverage, getHydrationFor7Days, calculateTotalHydration, findDistanceTraveled, ouncesPerDay, calculateAverageHoursSlept, calculateAverageSleepQuality, hoursSleptGivenDate, sleepQualityGivenDate, getSleepFor7Days, getSleepQualityFor7Days, checkStepGoal, minutesActiveGivenDate } = require('../src/scriptDefinitions');
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
        activity: [{
          userID: 1,
          date: "2023/03/24",
          numSteps: 7362,
          minutesActive: 261,
          flightsOfStairs: 26
        }],
        sleep: [{
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

describe('ouncesPerDay', function() {
  it('should return numOunces when the date is found', function() {
    const currentUser = addDataToCurrentUser(users[1], hydrationData, activityData, sleepData);

    expect(ouncesPerDay(currentUser, '2023/03/24')).to.equal(35);
  });

  it('should return undefined when the date is not found', function() {
    const currentUser = addDataToCurrentUser(users[1], hydrationData, activityData, sleepData);

    expect(ouncesPerDay(currentUser, '2023/03/30')).to.be.undefined;
  });

  it('should return undefined when the hydrationData array is empty', function() {
    const currentUser = addDataToCurrentUser(users[2], hydrationData, activityData, sleepData);

    expect(ouncesPerDay(currentUser, '2023/03/24')).to.be.undefined;
  });
});

describe('getHydrationFor7Days', function() {
  it('should return hydration data for 7 days when data for all 7 days is available', function() {
    const currentUser = addDataToCurrentUser(users[1], hydrationData, activityData, sleepData);
    const sevenDayHydration = getHydrationFor7Days(currentUser, '2023/03/29');

    expect(sevenDayHydration.length).to.deep.equal(7);
    expect(sevenDayHydration).to.deep.equal([
      { date: '2023/03/24', numOunces: 35 },
      { date: '2023/03/25', numOunces: 92 },
      { date: '2023/03/26', numOunces: 88 },
      { date: '2023/03/26', numOunces: 88 },
      { date: '2023/03/27', numOunces: 68 },
      { date: '2023/03/28', numOunces: 50 },
      { date: '2023/03/29', numOunces: 57 }
    ]);
  });

  it('should return an empty array when no matching hydration data is found', function() {
    const currentUser = addDataToCurrentUser(users[2], hydrationData, activityData, sleepData);
    const sevenDayHydration = getHydrationFor7Days(currentUser, '2023/03/29');

    expect(sevenDayHydration.length).to.equal(0);
    expect(sevenDayHydration).to.deep.equal([]);
  });

  it('should return partial data when only some of the 7 days have hydration data', function() {
    const currentUser = addDataToCurrentUser(users[0], hydrationData, activityData, sleepData);
    const sevenDayHydration = getHydrationFor7Days(currentUser, '2023/03/29');

    expect(sevenDayHydration.length).to.equal(1);
    expect(sevenDayHydration).to.deep.equal([{ date: '2023/03/24', numOunces: 28 }]);
  });
});

describe('calculateTotalHydration', function() {
  it('should return 0 when there is no hydration data', function() {
    const currentUser = addDataToCurrentUser(users[2], hydrationData, activityData, sleepData);
    const totalHydration = calculateTotalHydration(currentUser);

    expect(totalHydration).to.deep.equal('0.00');
  });

  it('should return the average hydration when there is one hydration data entry', function() {
    const currentUser = addDataToCurrentUser(users[0], hydrationData, activityData, sleepData);
    const totalHydration = calculateTotalHydration(currentUser);

    expect(totalHydration).to.deep.equal('28.00');
  });

  it('should return the average hydration when there are multiple hydration data entries', function() {
    const currentUser = addDataToCurrentUser(users[1], hydrationData, activityData, sleepData);
    const totalHydration = calculateTotalHydration(currentUser);

    expect(totalHydration).to.deep.equal('68.29');
  });
});

describe('distance traveled', function() {
  it('should return the distance traveled by a user on the most recent day', function() {
    const currentUser = addDataToCurrentUser(users[0], hydrationData, activityData, sleepData);

    expect(findDistanceTraveled(currentUser)).to.deep.equal('5.58');
  });
});

describe('calculateAverageHoursSlept', function() {
  it('should return 0 when there is no sleep data', function() {
    const user = { sleepData: [] };
    const result = calculateAverageHoursSlept(user);
    expect(result).to.equal('0.00');
  });

  it('should return the average hours slept when there is one sleep data entry', function() {
    const user = {
      sleepData: [{ hoursSlept: 7 }]
    };
    const result = calculateAverageHoursSlept(user);
    expect(result).to.equal('7.00');
  });

  it('should return the average hours slept when there are multiple sleep data entries', function() {
    const user = {
      sleepData: [{ hoursSlept: 7 }, { hoursSlept: 8 }, { hoursSlept: 6 }]
    };
    const result = calculateAverageHoursSlept(user);
    expect(result).to.equal('7.00');
  });

  it('should correctly calculate the average hours slept with diferent sleep data entries', function() {
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

describe('getSleepQualityFor7Days', () => {

  it('should return sleep quality data for 7 days when data is available', function () {
    const user = {
      sleepData: [
        { date: '2023-03-20', sleepQuality: 4 },
        { date: '2023-03-21', sleepQuality: 3 },
        { date: '2023-03-22', sleepQuality: 2 },
        { date: '2023-03-23', sleepQuality: 1 },
        { date: '2023-03-24', sleepQuality: 3 },
        { date: '2023-03-25', sleepQuality: 4 },
        { date: '2023-03-26', sleepQuality: 2 },
      ]
    };
    const result = getSleepQualityFor7Days(user, '2023-03-26');
    expect(result.length).to.equal(7);
  });

  it('should return an empty array when no matching data is found', function () {
    const user = {
      sleepData: []
    };
    const result = getSleepQualityFor7Days(user, '2023-03-20');
    expect(result).to.deep.equal([]);
  });

  it('should return partial data when only some days have sleep data', function () {
    const user = {
      sleepData: [
        { date: '2023-03-20', sleepQuality: 4 },
        { date: '2023-03-22', sleepQuality: 2 },
      ]
    };
    const result = getSleepQualityFor7Days(user, '2023-03-22');
    expect(result.length).to.equal(2);
  });
});

      describe('getSleepFor7Days', () => {

        it('should return an array', () => {
          setUserSleepData([{ date: '2023/03/24', hoursSlept: 7 }]);
          const result = getSleepFor7Days(user, '2023/03/24');
          expect(result).to.be.an('array');
       });

        it('should return sleep hours data for 7 days when data is available', function () {
          const user = {
            sleepData: [
              { date: '2023-03-20', hoursSlept: 7 },
              { date: '2023-03-21', hoursSlept: 6 },
              { date: '2023-03-22', hoursSlept: 7 },
              { date: '2023-03-23', hoursSlept: 8 },
              { date: '2023-03-24', hoursSlept: 5 },
              { date: '2023-03-25', hoursSlept: 7 },
              { date: '2023-03-26', hoursSlept: 6 },
            ]
          };
          const result = getSleepFor7Days(user, '2023-03-26');
          expect(result.length).to.equal(7);
        });

        it('should return an empty array when no matching data is found', function () {
          const user = {
            sleepData: []
          };
          const result = getSleepFor7Days(user, '2023-03-20');
          expect(result).to.deep.equal([]);
        });

        it('should return partial data when only some days have sleep data', function () {
          const user = {
            sleepData: [
              { date: '2023-03-20', hoursSlept: 7 },
              { date: '2023-03-22', hoursSlept: 7 },
            ]
          };
          const result = getSleepFor7Days(user, '2023-03-22');
          expect(result.length).to.equal(2);
        });

      });

      describe('checkStepGoal', () => {

        it('should be a function', function () {
          expect(checkStepGoal).to.be.a('function');
        });

        it('should return "Success!" when the latest numSteps is greater than or equal to dailyStepGoal', function () {
          const user = {
            dailyStepGoal: 10000,
            activityData: [
              { date: '2023/10/12', numSteps: 10500 },
              { date: '2023/10/11', numSteps: 9500 }
            ]
          };
          const result = checkStepGoal(user);
          expect(result).to.equal('Success!');
        });

        it('should return "No!" when the latest numSteps is less than dailyStepGoal', function () {
          const user = {
            dailyStepGoal: 10000,
            activityData: [
              { date: '2023/10/12', numSteps: 8500 },
              { date: '2023/10/11', numSteps: 9500 }
            ]
          };
          const result = checkStepGoal(user);
          expect(result).to.equal('No!');
        });
        it('should handle cases where activityData is empty, returning "No!"', function () {
          const user = {
            dailyStepGoal: 10000,
            activityData: []
          };
          const result = checkStepGoal(user);
          expect(result).to.equal('No!');
        });
      });

describe('minutesActiveGivenDate', () => {

  it('should be a function', function () {
    expect(minutesActiveGivenDate).to.be.a('function');
  });

  it('should return minutes active when the date is found', function () {
    const user = {
      activityData: [
        { date: '2023/03/24', minutesActive: 40 },
        { date: '2023/03/25', minutesActive: 50 }
      ]
    };
    const result = minutesActiveGivenDate(user, '2023/03/24');
    expect(result).to.equal(40);
  });

  it('should return undefined when the date is not found', function () {
    const user = {
      activityData: [
        { date: '2023/03/24', minutesActive: 40 }
      ]
    };
    const result = minutesActiveGivenDate(user, '2023/03/25');
    expect(result).to.be.undefined;
  });

  it('should return undefined when the activityData array is empty', function () {
    const user = { activityData: [] };
    const result = minutesActiveGivenDate(user, '2023/03/24');
    expect(result).to.be.undefined;
  });
});
