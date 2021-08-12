import SemVer from "semver";
import { error } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { MetaPackage } from "./meta-package-type";

export function isMetaPackage (input : unknown) : asserts input is MetaPackage {
  if (typeof input !== "object" || Array.isArray(input)) {
    throw Error(error(ValidationErrorCodes.V34));
  }

  const packageLikeInput = input as MetaPackage;

  if (typeof packageLikeInput.name !== "string") {
    throw Error(error(ValidationErrorCodes.V35));
  }

  if (SemVer.valid(packageLikeInput.version) === null) {
    throw Error(error(ValidationErrorCodes.V36));
  }

  if (typeof packageLikeInput.description !== "string") {
    throw Error(error(ValidationErrorCodes.V37));
  }

  if (!Array.isArray(packageLikeInput.functionsDefinitions)) {
    throw Error(error(ValidationErrorCodes.V40))
  }

  if (typeof packageLikeInput.entrypoint !== "string") {
    throw Error(error(ValidationErrorCodes.V42));
  }

  packageLikeInput.functionsDefinitions.forEach((functionDefinition) => {
    const functionDefinitionType = typeof functionDefinition;
    const isNotArrayObject = functionDefinitionType === "object" && !Array.isArray(functionDefinitionType)

    if (functionDefinitionType !== "string" && !isNotArrayObject) {
      throw Error(error(ValidationErrorCodes.V38))
    }
  });
}