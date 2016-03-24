import { expect, should } from 'chai';
import createActions from '../src/createActions';
should();
const mockTransforms = [
  { action: 'MOCK_ONE' },
  { action: 'MOCK_TWO' },
];

describe('createActions', () => {
  describe('generated hash', () => {
    const generatedActions = createActions(mockTransforms);
    const firstKey = Object.keys(generatedActions)[0];

    it('should return a hash', () => {
      (typeof generatedActions === 'object').should.equal(true);
    });
    it('contain keys that are camelcased', () => {
      firstKey.should.equal('mockOne');
    });
    it('generates the same number of actions as transformations', () => {
      const numberOfActions = Object.keys(generatedActions).length;
      numberOfActions.should.equal(mockTransforms.length);
    });
  });
});
