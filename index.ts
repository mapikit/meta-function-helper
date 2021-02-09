// Find configuration File
// -- Throw if not found at the root of the project

// Check configuration file types
// -- Throw if the type is not valid

import { findMetaFunctionFile } from "./src/find-function-declaration-file";

const main = () : void => {
  findMetaFunctionFile()
    .then((result) => {
      // Validate file content  
    });
}

main();