import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { OutputBranches, OutputData } from "./meta-function-type";

export const validateOutputConfiguration =
  (outputBranches : OutputBranches[], outputData : OutputData[]) => {
  const availableBranches = outputBranches.map((branch) => branch.branchName);

  const isValid = availableBranches.every((branchName) => {
    return outputData
      .findIndex((outputElement) => outputElement.branch === branchName) !== -1;
  });

  if (!isValid) {
    throw Error(error(ValidationErrorCodes.V28));
  }
}