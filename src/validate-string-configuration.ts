import { isMetaFunction } from "./is-meta-function";
import { ValidationErrorCodes } from "./error-codes";
import { MetaCustomTypesValidation } from "./custom-types-validation";
import { error, success } from "./chalk-formatting";
import { propertyUniquenessCheck } from "./name-uniqueness-check";
import { validateOutputConfiguration } from "./validate-output-configuration";

/** Validates the string content of a `meta-function.json` file */
export const validateStringConfiguration = (configurationData : string) => {
  let objectResult;

  try {
    objectResult = JSON.parse(configurationData);
  } catch (e) {
    throw Error(error(ValidationErrorCodes.V00 + " - File content is not a valid JSON"))
  }

  isMetaFunction(objectResult);
  propertyUniquenessCheck(objectResult.inputParameters, "name", "inputParameters");
  propertyUniquenessCheck(objectResult.outputData, "name", "outputData");
  propertyUniquenessCheck(objectResult.customTypes, "name", "customTypes");
  propertyUniquenessCheck(objectResult.outputBranches, "branchName", "outputBranches");

  objectResult.customTypes.forEach((customType) => 
    propertyUniquenessCheck(customType.properties, "name", "customType.properties"))

  new MetaCustomTypesValidation(objectResult).execute();

  validateOutputConfiguration(objectResult.outputBranches, objectResult.outputData);

  console.log(success("File passed validation."));
}
