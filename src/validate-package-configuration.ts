import { success } from "./chalk-formatting.js";
import { isMetaPackage } from "./is-meta-package.js";
import { ValidateMetaPackageFunctionDefinition } from "./validate-meta-package-function-definition.js";
import { buildAllFunctionDefinitions } from "./build-all-functions-definitions.js";

/** Validates the content of a `meta-package.json` file */
export const validatePackageConfiguration = async (configurationData : unknown, workingDir = "")
: Promise<void> => {
  isMetaPackage(configurationData);

  const builtPackage = {
    ...configurationData,
    functionsDefinitions: await buildAllFunctionDefinitions(configurationData.functionsDefinitions, workingDir),
  };

  await new ValidateMetaPackageFunctionDefinition(builtPackage)
    .execute();

  console.log(success("Final Package file passed validation."));
};
