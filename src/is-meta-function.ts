import SemVer from "semver";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { CustomType, InputParameters, MetaFunction, OutputBranches, OutputData } from "./meta-function-type";

/**
 * Validates if input is a string with length > 0
 */
const isValidString = (input : unknown, errorCode : ValidationErrorCodes) => {
  if (typeof input !== "string") {
    throw Error(error(errorCode));
  }

  if (input.length <= 0) {
    throw Error(error(errorCode));
  }
};

/**
 * Validates if the object input is a valid Meta-Function declaration object
 * 
 * This does not validates the rules of the object data, such as the validity of all types
 */
export function isMetaFunction (input : object) : asserts input is MetaFunction {
  const metaFunctionLikeInput = input as MetaFunction;

  if (metaFunctionLikeInput.author !== undefined) {
    isValidString(metaFunctionLikeInput.author, ValidationErrorCodes.V01);
  }

  if (SemVer.valid(metaFunctionLikeInput.version) === null) {
    throw Error(error(ValidationErrorCodes.V02));
  }

  isValidString(metaFunctionLikeInput.description, ValidationErrorCodes.V03);
  isValidString(metaFunctionLikeInput.entrypoint, ValidationErrorCodes.V04);
  isValidString(metaFunctionLikeInput.mainFunction, ValidationErrorCodes.V05);

  if (metaFunctionLikeInput.customTypes !== undefined && !Array.isArray(metaFunctionLikeInput.customTypes)) {
    throw Error(error(ValidationErrorCodes.V06));
  }

  if (!Array.isArray(metaFunctionLikeInput.outputData)) {
    throw Error(error(ValidationErrorCodes.V07));
  }

  if (!Array.isArray(metaFunctionLikeInput.outputBranches)) {
    throw Error(error(ValidationErrorCodes.V08));
  }

  if (!Array.isArray(metaFunctionLikeInput.inputParameters)) {
    throw Error(error(ValidationErrorCodes.V09));
  }

  isCustomType(metaFunctionLikeInput.customTypes);
  isOutputData(metaFunctionLikeInput.outputData);
  isOutputBranches(metaFunctionLikeInput.outputBranches);
  isInputParameters(metaFunctionLikeInput.inputParameters);
}

function isCustomType (input : unknown[]) : asserts input is CustomType[] {
  input.forEach((inputElement) => {
    const customTypeInput = inputElement as CustomType;

    isValidString(customTypeInput.name, ValidationErrorCodes.V10);

    if (!Array.isArray(customTypeInput.properties)) {
      throw Error(error(ValidationErrorCodes.V11));
    }

    customTypeInput.properties.forEach((propertyData) => {
      isValidString(propertyData.name, ValidationErrorCodes.V12);
      isValidString(propertyData.type, ValidationErrorCodes.V13);
    });
  })
}

function isOutputData (input : unknown[]) : asserts input is OutputData[] {
  input.forEach((inputElement) => {
    const outputDataInput = inputElement as OutputData;

    isValidString(outputDataInput.name, ValidationErrorCodes.V14);
    isValidString(outputDataInput.type, ValidationErrorCodes.V15);

    if (outputDataInput.branch !== undefined) {
      isValidString(outputDataInput.branch, ValidationErrorCodes.V16);
    }
  })
}

function isOutputBranches (input : unknown[]) : asserts input is OutputBranches[] {
  if (input.length <= 0) {
    throw Error(error(ValidationErrorCodes.V08));
  }

  input.forEach((inputElement) => {
    const outputBranchInput = inputElement as OutputBranches;

    isValidString(outputBranchInput.branchName, ValidationErrorCodes.V17);

    if (outputBranchInput.description !== undefined) {
      isValidString(outputBranchInput.description, ValidationErrorCodes.V18);
    }
  })
}

function isInputParameters (input : unknown[]) : asserts input is InputParameters[] {
  input.forEach((inputElement) => {
    const inputParameterInput = inputElement as InputParameters;

    isValidString(inputParameterInput.name, ValidationErrorCodes.V19);
    isValidString(inputParameterInput.type, ValidationErrorCodes.V20);

    if (inputParameterInput.description !== undefined) {
      isValidString(inputParameterInput.description, ValidationErrorCodes.V21);
    }

    if (inputParameterInput.group !== undefined) {
      isValidString(inputParameterInput.group, ValidationErrorCodes.V22);
    }

    if (inputParameterInput.required !== undefined && typeof inputParameterInput.required !== "boolean") {
      throw Error(error(ValidationErrorCodes.V23));
    }
  })
}