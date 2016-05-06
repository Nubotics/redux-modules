import { expect, should } from 'chai';
import { Map } from 'immutable';
import formatConstants from '../../src/createModule/formatConstants';
should();

const modulePrefix = 'mock';
const mockTransforms = [
  { action: 'MOCK_ONE' },
  { action: 'MOCK_TWO' },
];

describe('formatConstants', () => {
  const generatedModule = formatConstants(modulePrefix, mockTransforms);

  it('should add "formattedConstant" key to every array element', () => {
    generatedModule.forEach(module => {
      module.hasOwnProperty('formattedConstant').should.equal(true);
    });
  });

  it('should append modulePrefix to every formatted constant', () => {
    generatedModule.forEach(module => {
      (module.formattedConstant.indexOf(modulePrefix) > -1).should.equal(true);
    });
  });
});
