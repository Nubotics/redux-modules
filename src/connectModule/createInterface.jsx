import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { curry } from 'ramda';

import combineNamespacedProps from './combineNamespacedProps';

function createInterface({namespace = '', actions, selector}, Component) {
  const Interface = props => {
    return (
      <Component {...props} />
    );
  };

  const curriedBind = curry(bindActionCreators);

  return connect(
    selector,
    curriedBind(actions),
    combineNamespacedProps(namespace)
  )(Interface);
}

export default curry(createInterface);
