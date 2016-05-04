import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { Map, fromJS } from 'immutable';
import createReducer from '../../src/createModule/createReducer';

chai.use(chaiImmutable);
chai.should();

const mockTransforms = [
  {
    action: 'MOCK_ONE',
    formattedConstant: 'mock/MOCK_ONE',
    reducer: state => state,
  },
  {
    action: 'MOCK_TWO',
    formattedConstant: 'mock/MOCK_TWO',
    reducer: (state, {payload}) =>
      state.set('payload', fromJS(payload)),
  },
];

describe('createReducer', () => {
  const generatedReducer = createReducer(Map(), mockTransforms);

  it('should generate a function', () => {
    (typeof generatedReducer).should.equal('function');
  });

  describe('reducer function', () => {
    it('takes a state and an action', () => {
      generatedReducer.length.should.equal(2);
    });

    it('given a state and action, transforms the state', () => {
      const mockAction1 = {
        type: 'mock/MOCK_ONE',
        payload: {}
      };

      generatedReducer(Map(), mockAction1)
        .should
        .equal(Map());

      const mockAction2 = {
        type: 'mock/MOCK_TWO',
        payload: { foo: 'bar' },
      };

      generatedReducer(Map(), mockAction2)
        .should
        .equal(fromJS({payload: {foo: 'bar'}}));
    });

    it('should not respond to actions not stated in transformations', () => {
      const mockAction = {
        type: 'mock/MOCK_THREE',
        payload: {}
      };

      generatedReducer(Map(), mockAction).should.equal(Map());
    });
  });
});
