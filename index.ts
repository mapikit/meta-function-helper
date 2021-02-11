// Find configuration File
// -- Throw if not found at the root of the project

// Check configuration file types
// -- Throw if the type is not valid

import { isMetaFunction } from "./src/is-meta-function";
import { findMetaFunctionFile } from "./src/find-function-declaration-file";
import { ValidationErrorCodes } from "./src/error-codes";

const main = () : void => {
  findMetaFunctionFile()
    .then((result) => {
      try {
        const objectResult = JSON.parse(result);
        isMetaFunction(objectResult);
      } catch (e) {
        throw Error(ValidationErrorCodes.V00 + " - File content is not a valid JSON")
      }
    });
}

main();