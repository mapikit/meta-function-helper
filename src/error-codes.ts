/**
 * Error codes for validation failures
 */
export enum ValidationErrorCodes {
  failedToGetFile = "Could not read requested file",
  mentionedAuthorNotValidString = "Mentioned Author must be a non empty String",
  versionNotSemVerString = "Function Version is not a valid SemVer",
  missingDescription = "No Description for the function has been provided",
  missingEntrypoint = "No entrypoint for the function was given",
  missingMainFunction = "No Main Function has been provided",
  functionDefinitionCustomTypesNotArray = "\"customTypes\" must be an Array",
  customTypeNameNotString = "Custom Type \"name\" must be a string",
  missingCustomType = "Given type does not exist, or was not provided",
  loopCustomType = "Configuration includes a custom type reference loop",
  failedNameUniquenessCheck = "Duplicated entity name detected - All entities must have unique names",
  packageFileNotAnObject = "Package file content is not an object",
  packageNameNotString = "Package name must be a string",
  packageVersionNotSemVer = "Package Version must be a SemVer string",
  packageDescriptionNotValidString = "Package Description must be a non empty string",
  packageFunctionDefinitionItemNotExpectedType = "Package Function Definition item is not of the expected type",
  failedToReadFunctionDefinitionFile = "Could not find declared function definition from package file",
  packagedFunctionsNotAnArray = "Package Functions Definitions must be an array",
  functionDefinitionMissingFunctionName = "\"functionName must\" be present in the function configuration in a package",
  packageEntrypointNotValidString = "Package Entrypoint must be a string",
  functionDefinitionNotAnObject = "Function Definition must be an object",
  metaFunctionNotAnObject = "Meta-Function declaration must be an object",
  functionInputNotValidObjectDefinition = "Given function input is not a valid Object Definition",
  functionOutputNotValidObjectDefinition = "Given function output is not a valid Object Definition",
};
