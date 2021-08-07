import { ValidationErrorCodes } from "./error-codes";
import { error, success } from "./chalk-formatting";
import { isMetaPackage } from "./is-meta-package";
import { ValidateMetaPackageFunctionDefinition } from "./validate-meta-package-function-definition";

/** Validates the string content of a `meta-package.json` file */
export const validatePackageStringConfiguration = async (configurationData : string) => {
  let objectResult;

  try {
    objectResult = JSON.parse(configurationData);
  } catch (e) {
    throw Error(error(ValidationErrorCodes.V00 + " - Package file content is not a valid JSON"))
  }

  isMetaPackage(objectResult);
  await new ValidateMetaPackageFunctionDefinition(objectResult)
    .execute();

  console.log(success("Final Package file passed validation."));
}
