import * as crypto from "expo-crypto";

export const generateUUID = () => {
  return crypto.randomUUID();
};
