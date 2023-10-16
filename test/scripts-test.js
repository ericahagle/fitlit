import { expect } from 'chai';
const { generateRandomUserID } = require('../src/scriptDefinitions');

describe('userObject creation', () => {
  it('should generate a random userId', function () {
    console.log(generateRandomUserID);
    const randomUserID = generateRandomUserID();
    expect(randomUserID).to.be.a('number');
  });
});