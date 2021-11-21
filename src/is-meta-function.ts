import SemVer from "semver";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { MetaFunction } from "./meta-function-type";
import { isFunctionDefinition } from "./is-function-definition";
import { isValidString } from "./validation-helpers/is-valid-string";

/**
 * Validates if the unknown input is a valid Meta-Function declaration object
 */
// eslint-disable-next-line max-lines-per-function
export function isMetaFunction (input : unknown) : asserts input is MetaFunction {
  if (typeof input !== "object") {
    throw Error(error(ValidationErrorCodes.metaFunctionNotAnObject));
  }

  const metaFunctionLikeInput = input as MetaFunction;

  if (metaFunctionLikeInput.author !== undefined) {
    isValidString(metaFunctionLikeInput.author, ValidationErrorCodes.mentionedAuthorNotValidString);
  }

  if (SemVer.valid(metaFunctionLikeInput.version) === null) {
    throw Error(error(ValidationErrorCodes.versionNotSemVerString));
  }

  isValidString(metaFunctionLikeInput.entrypoint, ValidationErrorCodes.missingEntrypoint);
  isValidString(metaFunctionLikeInput.mainFunction, ValidationErrorCodes.missingMainFunction);

  isValidString(metaFunctionLikeInput.description, ValidationErrorCodes.missingDescription);

  // MetaFunction extends Function definition
  isFunctionDefinition(input);
}
