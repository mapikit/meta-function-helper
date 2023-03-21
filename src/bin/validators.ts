import { getDescriptorFileContent } from "../get-file.js";
import { processing } from "../chalk-formatting.js";
import { validatePackageConfiguration } from "../validate-package-configuration.js";
import { logVersion } from "./log-version.js";
import { validateMetaFunctionConfiguration } from "../validate-configuration.js";

export const validatePackage = async (initialPath = "") : Promise<void> => {
  await logVersion();
  console.log(processing("Starting validation of the \"meta-package.json\" file...\n"));

  const fileContent = await getDescriptorFileContent(initialPath, "meta-package.json");

  await validatePackageConfiguration(fileContent, initialPath);
};

export const validateFunction = async (initialPath = "") : Promise<void> => {
  await logVersion();

  console.log(processing("Starting validation of the \"meta-function.json\" file...\n"));

  const fileContent = await getDescriptorFileContent(initialPath, "meta-function.json");

  validateMetaFunctionConfiguration(fileContent);
};
