import { expect, should } from 'chai';
import createConstants from '../../src/createModule/createConstants';
should();

const mockTransforms = [
  { action: 'MOCK_ONE', formattedConstant: 'mock/MOCK_ONE' },
  { action: 'MOCK_TWO', formattedConstant: 'mock/MOCK_ONE' },
];

describe('createConstants', () => {
  describe('generated hash', () => {
    const generatedConstants = createConstants(mockTransforms);
    const firstKey = Object.keys(generatedConstants)[0];

    it('should return a hash', () => {
      (typeof generatedConstants === 'object').should.equal(true);
    });
    it('contains keys that are camelcased', () => {
      firstKey.should.equal('mockOne');
    });
    it('should map formatted constant to action name', () => {
      generatedConstants[firstKey].should.equal('mock/MOCK_ONE');
    });
  });
});
