import { isMetaFunction } from "./src/is-meta-function";
import { findMetaFunctionFile } from "./src/find-function-declaration-file";
import { ValidationErrorCodes } from "./src/error-codes";
import { CustomTypesValidation } from "./src/custom-types-validation";
import { error, processing, success } from "./src/chalk-formatting";

const main = () : void => {
  console.log(processing("Starting validation of the \"meta-function.json\" file...\n"))
  findMetaFunctionFile()
    .then((result) => {
      let objectResult;
      try {
        objectResult = JSON.parse(result);
      } catch (e) {
        throw Error(error(ValidationErrorCodes.V00 + " - File content is not a valid JSON"))
      }

      isMetaFunction(objectResult);
      new CustomTypesValidation(objectResult).execute();

      console.log(success("File passed validation."));
    })
    .catch((error) => {
      console.log("Could not pass file validation due to error below:");
      console.log(error.message);

      process.exit(1);
    });
}

main();
