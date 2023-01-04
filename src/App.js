import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import RoutesList from "./router";
import AuthLayout from "./layout/AuthLayout";
import PrivateLayout from "./layout/PrivateLayout";
import "./styles/index.scss";
import PublicLayout from "./layout/PublicLayout";
import "./App.css";
import { useSelector } from "react-redux";
import { logoutSuccessSelector } from "./redux/Auth/AuthSelector";
import { isLoggedIn } from "./utils/helper";

const App = () => {
  const user = true;

  const renderRoutes = () => {
    const isLogin = isLoggedIn();
    const renderRoute = (Component, layout, isPrivate) => {
      if (Component) {
        switch (layout) {
          case "private":
            return isLogin && isPrivate ? (
              <PrivateLayout>
                <Component />
              </PrivateLayout>
            ) : (
              <Navigate to="/login" />
            );
          case "auth":
            return isLogin ? (
              <Navigate to="/" />
            ) : (
              <AuthLayout>
                <Component />
              </AuthLayout>
            );
          case "public":
          default:
            return (
              <PublicLayout>
                <Component />
              </PublicLayout>
            );
        }
      }
      return null;
    };

    return RoutesList.map((route) => (
      <Route
        key={route.name}
        path={route.path}
        element={renderRoute(route.component, route.layout, route.isPrivate)}
      />
    ));
  };

  const logoutSuccess = useSelector(logoutSuccessSelector);
  useEffect(() => {
    if (logoutSuccess) {
      window.location = "/login";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutSuccess]);

  return <Routes>{renderRoutes()}</Routes>;
};

export default App;
