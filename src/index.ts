import { isMetaFunction } from "./is-meta-function.js";
import { ValidationErrorCodes } from "./error-codes.js";
import { MetaCustomTypesValidation } from "./custom-types-validation.js";
import {
  validateMetaFunctionConfiguration,
  validateFunctionDefinitionConfiguration,
} from "./validate-configuration.js";
import { MetaFunction, CustomType, FunctionDefinition } from "./meta-function-type.js";
import { BuiltMetaPackage, MetaPackage } from "./meta-package-type.js";
import { validatePackageConfiguration } from "./validate-package-configuration.js";
import { isMetaPackage } from "./is-meta-package.js";
import { FunctionManager } from "./function-manager.js";
import { buildAllFunctionDefinitions } from "./build-all-functions-definitions.js";
import { getDescriptorFileContent, getClassConstructor } from "./get-file.js";
import { isFunctionDefinition } from "./is-function-definition.js";

export {
  validateMetaFunctionConfiguration,
  validateFunctionDefinitionConfiguration,
  validatePackageConfiguration,
  MetaCustomTypesValidation,
  isMetaFunction,
  isFunctionDefinition,
  isMetaPackage,
  ValidationErrorCodes,
  buildAllFunctionDefinitions,
  getDescriptorFileContent,
  getClassConstructor,
};

export type {
  MetaFunction,
  FunctionDefinition,
  CustomType,
  FunctionManager,
  MetaPackage,
  BuiltMetaPackage,
};

export default {
  validateMetaFunctionConfiguration,
  validateFunctionDefinitionConfiguration,
  validatePackageConfiguration,
  MetaCustomTypesValidation,
  isMetaFunction,
  isFunctionDefinition,
  isMetaPackage,
  ValidationErrorCodes,
  buildAllFunctionDefinitions,
  getDescriptorFileContent,
  getClassConstructor,
};
