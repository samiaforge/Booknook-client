
import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    console.error("Token Error:", error.message);
    return null;
  }

  const token = data?.token;
  return token;
};
