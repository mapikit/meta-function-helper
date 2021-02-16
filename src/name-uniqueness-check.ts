import { error, highlight } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { CustomType, InputParameters, OutputBranches, OutputData } from "./meta-function-type";

type NamedElement = OutputData | CustomType | InputParameters

/**
 * Checks if all provided Elements have a unique name
 */
export const nameUniquenessCheck = (namedElementList : NamedElement[], entityName : string) => {
  const nameList = [];

  namedElementList.forEach((namedElement) => {
    if (nameList.includes(namedElement.name)) {
      throw Error(error(ValidationErrorCodes.V27) +
        `- "${entityName}" - ${highlight(`"${namedElement.name}"`)}`);
    }

    nameList.push(namedElement.name);
  })
}

/**
 * Checks if all provided outputBranches have a unique name
 */
export const branchesNameUniquenessCheck = (namedElementList : OutputBranches[]) => {
  const nameList = [];

  namedElementList.forEach((namedElement) => {
    if (nameList.includes(namedElement.branchName)) {
      throw Error(error(ValidationErrorCodes.V27) +
        `- "outputBranches" - ${highlight(`"${namedElement.branchName}"`)}`);
    }

    nameList.push(namedElement.branchName);
  })
}

