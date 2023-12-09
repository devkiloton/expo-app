export const applyGlobalPolyfills = () => {
  global.TextEncoder = require("text-encoding").TextEncoder;
};
