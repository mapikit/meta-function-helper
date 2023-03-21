import { isMetaFunction } from "./is-meta-function.js";
import { MetaCustomTypesValidation } from "./custom-types-validation.js";
import { success } from "./chalk-formatting.js";
import { propertyUniquenessCheck } from "./name-uniqueness-check.js";
import { isFunctionDefinition } from "./is-function-definition.js";
import { FunctionDefinition } from "./meta-function-type.js";

export const validateFunctionDefinitionConfiguration = (configurationData : unknown) : void => {
  isFunctionDefinition(configurationData);
  validateTypes(configurationData);
};

/** Validates the content of a `meta-function.json` file */
export const validateMetaFunctionConfiguration = (configurationData : unknown) : void => {
  isMetaFunction(configurationData);
  validateTypes(configurationData);
};

export const validateTypes = (definition : FunctionDefinition) : void => {
  if (definition.customTypes !== undefined) {
    propertyUniquenessCheck(definition.customTypes, "name", "customTypes");
  }

  new MetaCustomTypesValidation(definition).execute();

  console.log(success(`"${definition.functionName}"` + " Function File passed validation."));
};
