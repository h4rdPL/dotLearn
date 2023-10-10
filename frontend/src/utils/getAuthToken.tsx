import Cookies from "js-cookie";

export const getAuthTokenFromCookies = () => {
  const token = Cookies.get("jwt");
  return token;
};
