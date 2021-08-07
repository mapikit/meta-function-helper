#!/usr/bin/env node

import { findMetaDescriptionFile } from "../find-function-declaration-file";
import { processing } from "../chalk-formatting";
import { validatePackageStringConfiguration } from "../validate-package-string-configuration";
const packageFile = require("../../../package.json");

const main = async () : Promise<void> => {
  if (process.argv.includes("-v")) {
    console.log("Meta-Function-Helper Version " + packageFile.version);
    return;
  }

  console.log(processing("Starting validation of the \"meta-package.json\" file...\n"))
  await findMetaDescriptionFile("meta-package.json")
    .then(async (fileData) => {
      await validatePackageStringConfiguration(fileData)
    })
    .catch((error) => {
      console.log("Could not pass package file validation due to error below:");
      console.log(error.message);
      console.error(error)

      process.exit(1);
    });
}

main();
