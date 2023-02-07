import { isMetaFunction } from "./is-meta-function";
import { MetaCustomTypesValidation } from "./custom-types-validation";
import { error, success } from "./chalk-formatting";
import { propertyUniquenessCheck } from "./name-uniqueness-check";
import { isFunctionDefinition } from "./is-function-definition";
import { FunctionDefinition } from "./meta-function-type";
import { readFileSync } from "fs";
import { resolve } from "path";
import { ValidationErrorCodes } from "./error-codes";

export const validateFunctionDefinitionConfiguration = (configurationData : unknown) : void => {
  isFunctionDefinition(configurationData);
  validateTypes(configurationData);
};

/** Validates the content of a `meta-function.json` file */
export const validateMetaFunctionConfiguration = (configurationData : unknown, workingDir = "") : void => {
  isMetaFunction(configurationData);

  const packageText = readFileSync(`${resolve(workingDir, "package.json")}`).toString();
  const packageJson = JSON.parse(packageText);
  if(configurationData.version && configurationData.version !== packageJson["version"]) throw Error(error(ValidationErrorCodes.versionMismatch))

  validateTypes(configurationData);
};

export const validateTypes = (definition : FunctionDefinition) : void => {
  if (definition.customTypes !== undefined) {
    propertyUniquenessCheck(definition.customTypes, "name", "customTypes");
  }

  new MetaCustomTypesValidation(definition).execute();

  console.log(success(`"${definition.functionName}"` + " Function File passed validation."));
};
