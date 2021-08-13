import { isMetaFunction } from "./src/is-meta-function";
import { ValidationErrorCodes } from "./src/error-codes";
import { MetaCustomTypesValidation } from "./src/custom-types-validation";
import { validateStringConfiguration } from "./src/validate-string-configuration";
import { MetaFunction, CustomType } from "./src/meta-function-type";
import { BuiltMetaPackage, MetaPackage } from "./src/meta-package-type";
import { AcceptedTypes, ObjectDefinition } from "./src/object-definition/object-definition-type";
import { isObjectDefinition } from "./src/object-definition/is-object-definition";
import { validatePackageStringConfiguration } from "./src/validate-package-string-configuration";
import { isMetaPackage } from "./src/is-meta-package";
import { FunctionManager } from "./src/function-manager";
import { buildFullPackageDescription } from "./src/build-full-package-description";

export {
  AcceptedTypes,
  MetaFunction,
  MetaPackage,
  CustomType,
  ObjectDefinition,
  FunctionManager,
  BuiltMetaPackage
}

export default {
  validateStringConfiguration,
  validatePackageStringConfiguration,
  MetaCustomTypesValidation,
  isMetaFunction,
  isMetaPackage,
  ValidationErrorCodes,
  isObjectDefinition,
  buildFullPackageDescription
}

