import { getDescriptorFileContent } from "../get-file";
import { processing } from "../chalk-formatting";
import { validatePackageConfiguration } from "../validate-package-configuration";
import { logVersion } from "./log-version";
import { validateMetaFunctionConfiguration } from "../validate-configuration";

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

  validateMetaFunctionConfiguration(fileContent, initialPath);
};
