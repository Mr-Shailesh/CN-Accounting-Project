import Cookies from "js-cookie";

export const isLoggedIn = () => {
  const token = Cookies.get("token");
  return !!token;
  // return val;
};
