import SemVer from "semver";
import { error } from "./chalk-formatting.js";
import { ValidationErrorCodes } from "./error-codes.js";
import { isFunctionDefinition } from "./is-function-definition.js";
import { MetaPackage } from "./meta-package-type.js";
import { isValidString } from "./validation-helpers/is-valid-string.js";

// eslint-disable-next-line max-lines-per-function
export function isMetaPackage (input : unknown) : asserts input is MetaPackage {
  if (typeof input !== "object" || Array.isArray(input)) {
    throw Error(error(ValidationErrorCodes.packageFileNotAnObject));
  }

  const packageLikeInput = input as MetaPackage;

  isValidString(packageLikeInput.name, ValidationErrorCodes.packageNameNotString);
  isValidString(packageLikeInput.description, ValidationErrorCodes.packageDescriptionNotValidString);
  isValidString(packageLikeInput.entrypoint, ValidationErrorCodes.packageEntrypointNotValidString);

  if (packageLikeInput.version !== undefined && SemVer.valid(packageLikeInput.version) === null) {
    throw Error(error(ValidationErrorCodes.packageVersionNotSemVer));
  }

  if (!Array.isArray(packageLikeInput.functionsDefinitions)) {
    throw Error(error(ValidationErrorCodes.packagedFunctionsNotAnArray));
  }

  packageLikeInput.functionsDefinitions.forEach((functionDefinition) => {
    const functionDefinitionType = typeof functionDefinition;
    const isNotArrayObject = functionDefinitionType === "object" && !Array.isArray(functionDefinitionType);

    if (functionDefinitionType !== "string" && !isNotArrayObject) {
      throw Error(error(ValidationErrorCodes.packageFunctionDefinitionItemNotExpectedType));
    }

    if (typeof functionDefinition !== "string") {
      isFunctionDefinition(functionDefinition);
    }
  });
};
