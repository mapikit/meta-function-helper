#!/usr/bin/env node

import { getDescriptorFileContent } from "../get-file";
import { processing } from "../chalk-formatting";
import { validatePackageConfiguration } from "../validate-package-configuration";
import { logVersion } from "./log-version";
import { errorExit } from "./error-exit";

const main = async () : Promise<void> => {
  await logVersion();
  console.log(processing("Starting validation of the \"meta-package.json\" file...\n"));

  const fileContent = await getDescriptorFileContent("./", "meta-package.json")
    .catch(errorExit);

  await validatePackageConfiguration(fileContent)
    .catch(errorExit);
};

main().catch(errorExit);
