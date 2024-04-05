import { env } from "process";

export const getCurrentEnv = () => {
  return env.NODE_ENV;
};
