import { error, success } from "./chalk-formatting";
import { isMetaPackage } from "./is-meta-package";
import { ValidateMetaPackageFunctionDefinition } from "./validate-meta-package-function-definition";
import { buildAllFunctionDefinitions } from "./build-all-functions-definitions";
import { readFileSync } from "fs";
import { resolve } from "path"
import { ValidationErrorCodes } from "./error-codes";

/** Validates the content of a `meta-package.json` file */
export const validatePackageConfiguration = async (configurationData : unknown, workingDir = "")
: Promise<void> => {
  isMetaPackage(configurationData);

  const packageText = readFileSync(`${resolve(workingDir, "package.json")}`).toString();
  const packageJson = JSON.parse(packageText);

  const builtPackage = {
    ...configurationData,
    version : configurationData.version ?? packageJson["version"],
    functionsDefinitions: await buildAllFunctionDefinitions(configurationData.functionsDefinitions, workingDir),
  };

  if(builtPackage.version !== packageJson["version"]) throw Error(error(ValidationErrorCodes.versionMismatch));

  await new ValidateMetaPackageFunctionDefinition(builtPackage)
    .execute();

  console.log(success("Final Package file passed validation."));
};
