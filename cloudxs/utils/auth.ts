import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  user_id: string;
};

export const getToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("cloudxs_token")
    : null;

export const getUserId = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("cloudxs_user_id")
    : null;

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("cloudxs_token");
  localStorage.removeItem("cloudxs_user_id");
};


export const saveAuth = (token: string, user_id: string) => {
  localStorage.setItem("cloudxs_token", token);
  localStorage.setItem("cloudxs_user_id", user_id);
};