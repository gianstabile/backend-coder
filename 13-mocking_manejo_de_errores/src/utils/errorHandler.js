import { errorDictionary } from "./errorDictionary.js";

const generateError = (errorCode, additionalMessage = "") => {
  const errorMessage = errorDictionary[errorCode];

  if (!errorMessage) {
    throw new Error(`Error code '${errorCode}' not found in the error dictionary`);
  }

  const customError = new Error(`${errorMessage}. ${additionalMessage}`);
  customError.code = errorCode;

  return customError;
};

export default generateError;
