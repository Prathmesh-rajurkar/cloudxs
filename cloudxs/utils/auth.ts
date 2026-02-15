import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  user_id: string;
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  return {
    email: localStorage.getItem("cloudxs_email") ?? undefined,
    username: localStorage.getItem("cloudxs_username") ?? undefined,
  };
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
  localStorage.removeItem("cloudxs_email");
  localStorage.removeItem("cloudxs_username");
};


export const saveAuth = (token: string, user_id: string,username:string,email:string) => {
  localStorage.setItem("cloudxs_token", token);
  localStorage.setItem("cloudxs_user_id", user_id);
  localStorage.setItem("cloudxs_email", email);
  localStorage.setItem("cloudxs_username", username);
};