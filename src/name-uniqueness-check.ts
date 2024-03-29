import { error, highlight } from "./chalk-formatting.js";
import { ValidationErrorCodes } from "./error-codes.js";

/**
 * Checks if all provided Elements have a unique property
 */
export const propertyUniquenessCheck = <T extends object>(
  namedElementList : T[],
  propertyName : keyof T,
  entityName : string,
) : void => {
  const nameList = [];

  namedElementList.forEach((namedElement) => {
    if (nameList.includes(namedElement[propertyName])) {
      throw Error(error(ValidationErrorCodes.failedNameUniquenessCheck) +
        `- "${entityName}" - ${highlight(`"${namedElement[propertyName]}"`)}`);
    }

    nameList.push(namedElement[propertyName]);
  });
};
