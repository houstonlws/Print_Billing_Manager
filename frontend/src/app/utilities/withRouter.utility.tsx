import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export const withRouter = (Component: any) => {
  const ComponentWithRouterProp = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    return <Component {...props} router={{ navigate, location, params }} />;
  };

  return ComponentWithRouterProp;
};

export const withDispatch = (Component: any) => {
  const ComponentWithDispatchProp = (props: any) => {
    const dispatch = useDispatch();
    return <Component {...props} dispatch={dispatch} />;
  };
  return ComponentWithDispatchProp;
};
