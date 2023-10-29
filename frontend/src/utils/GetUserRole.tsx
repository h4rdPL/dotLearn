import jwt_decode from "jwt-decode";

export const getUserRole = (authToken: string) => {
  const userRole = (jwt_decode(authToken) as { role: string } | undefined)
    ?.role;
  return userRole;
};
