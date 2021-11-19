import { isMetaFunction } from "./is-meta-function";
import { MetaCustomTypesValidation } from "./custom-types-validation";
import { success } from "./chalk-formatting";
import { propertyUniquenessCheck } from "./name-uniqueness-check";
import { isFunctionDefinition } from "./is-function-definition";
import { FunctionDefinition } from "./meta-function-type";

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
