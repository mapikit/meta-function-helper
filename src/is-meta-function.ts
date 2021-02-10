import SemVer from "semver";
import { ValidationErrorCodes } from "./error-codes";
import { MetaFunction } from "./meta-function-type";

export function isMetaFunction (input : object) : asserts input is MetaFunction {
  const metaFunctionLikeInput = input as MetaFunction;

  if (metaFunctionLikeInput.author !== undefined && typeof metaFunctionLikeInput.author !== "string") {
    throw Error(ValidationErrorCodes.V01);
  }

  if (SemVer.valid(metaFunctionLikeInput.version) === null) {
    throw Error(ValidationErrorCodes.V02);
  }

  if (typeof metaFunctionLikeInput.description !== "string") {
    throw Error(ValidationErrorCodes.V03);
  }

  if (typeof metaFunctionLikeInput.entrypoint !== "string") {
    throw Error(ValidationErrorCodes.V04);
  }

  if (typeof metaFunctionLikeInput.mainFunction !== "string") {
    throw Error(ValidationErrorCodes.V05);
  }

  if (metaFunctionLikeInput.customTypes !== undefined && !Array.isArray(metaFunctionLikeInput.customTypes)) {
    throw Error(ValidationErrorCodes.V06);
  }

  if (!Array.isArray(metaFunctionLikeInput.outputData)) {
    throw Error(ValidationErrorCodes.V07);
  }

  if (!Array.isArray(metaFunctionLikeInput.outputBranches)) {
    throw Error(ValidationErrorCodes.V08);
  }

  if (!Array.isArray(metaFunctionLikeInput.inputParameters)) {
    throw Error(ValidationErrorCodes.V09);
  }
}

