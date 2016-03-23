'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propCheckedPayloadCreator = undefined;

var _ramda = require('ramda');

var defaultPropCheck = function defaultPropCheck() {
  return {};
};

var propCheckedPayloadCreator = exports.propCheckedPayloadCreator = (0, _ramda.curry)(function (name, payloadTypes, payload) {

  var _propCheck = function _propCheck(type) {
    var propChecker = payloadTypes[type] || defaultPropCheck;
    var typeError = propChecker(payload, type, name, 'prop') || {};
    var message = typeError.message;


    message && console.error('Warning: Failed payloadType:', message);
  };

  (0, _ramda.compose)((0, _ramda.forEach)(_propCheck), _ramda.keys)(payloadTypes);

  return payload;
});

exports.default = propCheckedPayloadCreator;