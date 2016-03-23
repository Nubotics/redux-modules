'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatConstants = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require('ramda');

var _formatConstant = function _formatConstant(modulePrefix, actionName) {
  return modulePrefix + '/' + actionName;
};

var _appendFormattedConstant = (0, _ramda.curry)(function (modulePrefix, transform) {
  return _extends({}, transform, {
    formattedConstant: _formatConstant(modulePrefix, transform.action)
  });
});

var formatConstants = exports.formatConstants = (0, _ramda.curry)(function (modulePrefix, transformations) {
  return transformations.map(_appendFormattedConstant(modulePrefix));
});

exports.default = formatConstants;