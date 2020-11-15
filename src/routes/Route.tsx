import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReatRouteProps,
  Redirect,
} from 'react-router-dom';

interface RouteProps extends ReatRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {

  const token = localStorage.getItem('@ChatApp:token');

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!token ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
