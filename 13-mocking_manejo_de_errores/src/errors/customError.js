import { errorDictionary } from "./errorDictionary.js";

export default class CustomError {
  static createCustomError({ name, message, cause }) {
    const customError = new Error(message, { cause });
    customError.name = name;
    throw customError;
  }
}
