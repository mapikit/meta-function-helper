import { ValidationErrorCodes } from "../error-codes.js";
import { error } from "../chalk-formatting.js";

/**
 * Validates if input is a string with length > 0
 */
export const isValidString = (input : unknown, errorCode : ValidationErrorCodes) : void => {
  if (typeof input !== "string") {
    throw Error(error(errorCode));
  }

  if (input.length <= 0) {
    throw Error(error(errorCode));
  }
};
