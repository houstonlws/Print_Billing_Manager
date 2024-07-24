import React from 'react';
import { useDispatch } from 'react-redux';

const withDispatch = (Component: any) => {
  const ComponentWithDispatchProp = (props: any) => {
    const dispatch = useDispatch();
    return <Component {...props} dispatch={dispatch} />;
  };
  return ComponentWithDispatchProp;
};

export default withDispatch;
