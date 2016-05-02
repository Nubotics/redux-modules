import { expect, should } from 'chai';
import createActions from '../src/createActions';
should();
const mockTransforms = [
  { formattedConstant: 'mock/MOCK_ONE', action: 'MOCK_ONE' },
  { formattedConstant: 'mock/MOCK_ONE', action: 'MOCK_TWO' },
];

describe('createActions', () => {
  const generatedActions = createActions(mockTransforms);
  const firstKey = Object.keys(generatedActions)[0];

  describe('generated hash', () => {
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

  describe('generated action', () => {
    const actionToTest = generatedActions[firstKey];
    const result = actionToTest({foo: 'bar'});

    it('should contain a type key whose value is a well formatted action constant', () => {
      result.type.should.equal('mock/MOCK_ONE');
    });

    it('should handle object payloads', () => {
      result.payload.should.deep.equal({foo: 'bar'});
    });

    it('should handle null payloads', () => {
      const nullTest = actionToTest(null);
      expect(nullTest.payload).to.equal(null);
    });

    it('should handle empty payloads', () => {
      const nullTest = actionToTest(null);
      expect(nullTest.payload).to.not.exist;
    });

    it('should handle numeric payloads', () => {
      const numberTest = actionToTest(5);
      expect(numberTest.payload).to.equal(5);
    });
  });
});
