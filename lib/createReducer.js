'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = undefined;

var _immutable = require('immutable');

var _ramda = require('ramda');

var _reduxActions = require('redux-actions');

var _generateReducer = function _generateReducer(generatedReducer, transformation) {
  var formattedConstant = transformation.formattedConstant;
  var reducer = transformation.reducer;


  generatedReducer[formattedConstant] = reducer;
  return generatedReducer;
};

var createReducer = exports.createReducer = function createReducer() {
  var initialState = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.Map)() : arguments[0];
  var transformations = arguments[1];

  var reducer = transformations.reduce(_generateReducer, {});
  return (0, _reduxActions.handleActions)(reducer, initialState);
};

exports.default = createReducer;