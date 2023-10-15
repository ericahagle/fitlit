import { expect } from 'chai';
const { generateRandomUserID } = require('../src/scripts');

describe('userObject creation', () => {
  it('should generate a random userId', function () {
    const randomUserID = generateRandomUserID();
    expect(randomUserID).to.be.a('number');
  });
});