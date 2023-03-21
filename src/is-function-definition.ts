import { error } from "./chalk-formatting.js";
import { ValidationErrorCodes } from "./error-codes.js";
import { CustomType, FunctionDefinition } from "./meta-function-type.js";
import { isObjectDefinition, ObjectDefinition } from "@meta-system/object-definition";
import { isValidString } from "./validation-helpers/is-valid-string.js";

/**
 * Validates if the unknown input is a valid Function Definition object
 *
 * This does not validates the rules of the object data, such as the validity of all types
 */
// eslint-disable-next-line max-lines-per-function
export function isFunctionDefinition (input : unknown) : asserts input is FunctionDefinition {
  if (typeof input !== "object") {
    throw Error(error(ValidationErrorCodes.functionDefinitionNotAnObject));
  }

  const metaFunctionLikeInput = input as FunctionDefinition;

  isValidString(metaFunctionLikeInput.functionName, ValidationErrorCodes.functionDefinitionMissingFunctionName);

  if (metaFunctionLikeInput.customTypes !== undefined && !Array.isArray(metaFunctionLikeInput.customTypes)) {
    throw Error(error(ValidationErrorCodes.functionDefinitionCustomTypesNotArray));
  }


  isCustomType(metaFunctionLikeInput.customTypes);

  validateObjectDefinition(metaFunctionLikeInput.input, ValidationErrorCodes.functionInputNotValidObjectDefinition);
  validateObjectDefinition(metaFunctionLikeInput.output, ValidationErrorCodes.functionOutputNotValidObjectDefinition);
}

function validateObjectDefinition (input : object, validationErr : ValidationErrorCodes)
  : asserts input is ObjectDefinition {
  try {
    isObjectDefinition(input);
  } catch (err) {
    throw Error(`${error(validationErr)} || ${err}`);
  };
}

function isCustomType (input ?: unknown[]) : asserts input is CustomType[] {
  if (input === undefined) return;

  input.forEach((inputElement) => {
    const customTypeInput = inputElement as CustomType;

    isValidString(customTypeInput.name, ValidationErrorCodes.customTypeNameNotString);
    isObjectDefinition(customTypeInput.type);
  });
}
