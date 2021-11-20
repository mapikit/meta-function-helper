import { success } from "./chalk-formatting";
import { isMetaPackage } from "./is-meta-package";
import { ValidateMetaPackageFunctionDefinition } from "./validate-meta-package-function-definition";
import { buildAllFunctionDefinitions } from "./build-all-functions-definitions";

/** Validates the content of a `meta-package.json` file */
export const validatePackageConfiguration = async (configurationData : unknown, workingDir = "./")
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
