#!/usr/bin/env node

import { findMetaDescriptionFile } from "../find-function-declaration-file";
import { processing } from "../chalk-formatting";
import { validateStringConfiguration } from "../validate-string-configuration";
const packageFile = require("../../../package.json");

const main = () : void => {
  if (process.argv.includes("-v")) {
    console.log("Meta-Function-Helper Version " + packageFile.version);
    return;
  }

  console.log(processing("Starting validation of the \"meta-function.json\" file...\n"))
  findMetaDescriptionFile()
    .then(validateStringConfiguration)
    .catch((error) => {
      console.log("Could not pass file validation due to error below:");
      console.log(error.message);
      console.error(error)

      process.exit(1);
    });
}

main();
